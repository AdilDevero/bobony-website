/* ==========================================================================
   Damana system — a whitelisted citizen sponsors a friend
   ========================================================================== */

const lockEl = document.getElementById("damana-lock");
const appEl = document.getElementById("damana-app");
const doneEl = document.getElementById("damana-done");
const formEl = document.getElementById("damana-form");
const submitEl = document.getElementById("damana-submit");
const noteEl = document.getElementById("damana-note");
const backstoryEl = document.getElementById("backstory");
const countEl = document.getElementById("backstory-count");
const historyEl = document.getElementById("damana-history");

let signedOut = false;

const esc = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&": return "&amp;";
      case "<": return "&lt;";
      case ">": return "&gt;";
      case '"': return "&quot;";
      default: return "&#39;";
    }
  });

const field = (name) => document.getElementById(name);

function setNote(text, isError = true) {
  noteEl.textContent = text;
  noteEl.style.color = isError ? "var(--danger)" : "var(--accent)";
}

function refreshCounter() {
  const length = backstoryEl.value.trim().length;
  countEl.textContent = `${length} / 300 characters minimum`;
  countEl.style.color = length >= 300 ? "var(--accent)" : "var(--muted-soft)";
}

backstoryEl?.addEventListener("input", refreshCounter);
refreshCounter();

/* --------------------------------------------------------------- history */

function prettyDate(value) {
  if (!value) return "—";
  const date = new Date(String(value).replace(" ", "T") + "Z");
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

async function loadHistory() {
  try {
    const response = await fetch("/api/my-sponsorships", { headers: { accept: "application/json" } });
    if (!response.ok) return;

    const data = await response.json();
    const items = data.sponsorships || [];
    if (!items.length) return;

    const labels = { pending: "In review", approved: "Approved", denied: "Denied" };

    historyEl.hidden = false;
    historyEl.innerHTML = `
      <h2 class="damana__history-title">Your sponsorship requests</h2>
      <div class="damana__history-list">
        ${items
          .map(
            (entry) => `
          <div class="damana__history-row">
            <div>
              <b>${esc(entry.character_name || entry.friend_username)}</b>
              <small>@${esc(entry.friend_username)} · submitted ${esc(prettyDate(entry.created_at))}</small>
            </div>
            <span class="badge" data-status="${entry.status === "approved" ? "accepted" : entry.status === "denied" ? "declined" : "pending"}">${esc(labels[entry.status] || entry.status)}</span>
          </div>`
          )
          .join("")}
      </div>`;
  } catch {
    /* history is a nice-to-have */
  }
}

/* ----------------------------------------------------------------- submit */

formEl?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (signedOut) {
    window.location.assign("/auth/discord");
    return;
  }

  setNote("");
  submitEl.disabled = true;
  submitEl.textContent = "Submitting…";

  const payload = {
    friendDiscordId: field("friend-discord-id").value.trim(),
    friendUsername: field("friend-username").value.trim(),
    serverType: field("server-type").value,
    friendAge: field("friend-age").value,
    experience: field("experience").value.trim(),
    hoursPlayed: field("hours-played").value.trim(),
    availability: field("availability").value.trim(),
    previousServers: field("previous-servers").value.trim(),
    characterName: field("character-name").value.trim(),
    characterAge: field("character-age").value,
    nationality: field("nationality").value.trim(),
    faction: field("faction").value,
    personality: field("personality").value.trim(),
    principles: field("principles").value.trim(),
    backstory: backstoryEl.value.trim(),
    acceptedRules: field("accept-rules").checked,
    acceptedPrivacy: field("accept-privacy").checked
  };

  const messages = {
    friendDiscordId: "Check your friend's Discord ID and make sure it isn't your own.",
    friendUsername: "Enter your friend's Discord username.",
    friendAge: "Your friend must be at least 16.",
    experience: "Describe their RP experience in a sentence or two.",
    characterName: "Enter the character's full name.",
    characterAge: "Character age must be 18 or older.",
    personality: "Add at least a sentence about their personality.",
    principles: "Add at least a sentence about their principles.",
    backstory: "The backstory needs at least 300 characters.",
    acceptedRules: "Confirm your friend has read the rules.",
    acceptedPrivacy: "Confirm your friend accepts the privacy policy."
  };

  try {
    const response = await fetch("/api/sponsorship", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok) {
      appEl.hidden = true;
      doneEl.hidden = false;
      doneEl.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (data.error === "not_whitelisted") {
      setNote("Only whitelisted citizens can sponsor someone. Finish your own whitelist first, then come back.");
    } else if (data.error === "friend_pending") {
      setNote("There is already a pending sponsorship for that Discord account.");
    } else if (data.error === "invalid_fields" && Array.isArray(data.fields)) {
      setNote(messages[data.fields[0]] || "Please check the highlighted details.");
    } else if (response.status === 401) {
      setNote("Your session expired — sign in again and resubmit.");
    } else {
      setNote("Could not submit the request. Try again in a moment.");
    }
  } catch {
    setNote("Network problem — check your connection and try again.");
  } finally {
    submitEl.disabled = false;
    submitEl.textContent = "Submit sponsorship request";
  }
});

/* ------------------------------------------------------------------- boot */

async function boot() {
  let me = null;
  try {
    const response = await fetch("/api/me", { headers: { accept: "application/json" } });
    if (response.ok) me = await response.json();
  } catch {
    me = null;
  }

  appEl.hidden = false;

  if (!me || !me.user) {
    signedOut = true;
    submitEl.textContent = "Sign in with Discord to submit";

    const banner = document.createElement("div");
    banner.className = "callout";
    banner.style.marginBottom = "4px";
    banner.innerHTML =
      "You can read the form below, but you need to <strong>sign in with Discord</strong> before a request can be submitted. Whitelisted citizens only.";
    formEl.prepend(banner);
    return;
  }

  loadHistory();
}

boot();
