/* ==========================================================================
   Player dashboard — sidebar layout, character story, application status
   ========================================================================== */

const ROLE_LABELS = { owner: "Owner", admin: "Admin", helper: "Helper RP" };

const state = {
  user: null,
  application: null,
  stats: null,
  view: "characters",
  saving: false
};

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

function prettyDate(value, withTime = false) {
  if (!value) return "—";
  const date = new Date(String(value).replace(" ", "T") + "Z");
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString("en-GB", withTime
    ? { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }
    : { day: "2-digit", month: "short", year: "numeric" });
}

function citizenId(user) {
  return `BRP-${String(user.id).slice(-5).toUpperCase()}`;
}

function money(value) {
  if (value === null || value === undefined || value === "") return "—";
  return `$${Number(value).toLocaleString("en-US")}`;
}

function needsSyncLabel() {
  return "Waiting for the game server — online citizens sync every minute.";
}

function showLock() {
  document.getElementById("dash-lock").hidden = false;
  document.getElementById("dash-app").hidden = true;
}

function showApp() {
  document.getElementById("dash-lock").hidden = true;
  document.getElementById("dash-app").hidden = false;
}

function statusLabel() {
  if (!state.application) return "Not applied";
  return {
    pending: "Pending review",
    accepted: "RP whitelisted",
    declined: "Not whitelisted",
    pc_failed: "PC check failed"
  }[state.application.status] || "Pending review";
}

/* ------------------------------------------------------------------ identity */

// Discord serves avatars from its CDN: animated ones are gifs, the rest png.
function avatarUrl(user) {
  if (!user || !user.avatar) return null;
  const extension = String(user.avatar).startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${extension}?size=128`;
}

function renderProfile() {
  const user = state.user;
  const name = user.displayName || user.username;

  const avatar = document.getElementById("dash-avatar");
  const url = avatarUrl(user);

  if (avatar) {
    if (url) {
      avatar.innerHTML = `<img src="${esc(url)}" alt="" loading="lazy" referrerpolicy="no-referrer">`;
    } else {
      avatar.textContent = name.slice(0, 1).toUpperCase();
    }
  }

  document.getElementById("dash-name").textContent = name;

  const handle = document.getElementById("dash-handle");
  if (handle) handle.textContent = `@${user.username}`;

  const badge = document.getElementById("dash-badge");
  const staff = user.role ? ` · ${ROLE_LABELS[user.role] || user.role}` : "";
  badge.textContent = statusLabel() + staff;
  badge.dataset.state = state.application ? state.application.status : "none";

  const discord = document.getElementById("tx-discord");
  if (discord) discord.textContent = user.id;
}

/* ------------------------------------------------------------------ characters */

function renderCharacters() {
  const storySlot = document.getElementById("story-slot");
  const characterSlot = document.getElementById("character-slot");
  const application = state.application;

  if (!application) {
    storySlot.innerHTML = "";
    characterSlot.innerHTML = `
      <div class="dash-card">
        <h3 style="font-size:1.1rem;margin-bottom:8px">No character yet</h3>
        <p style="font-size:0.9rem">Once your allowlist application is submitted, your character appears here with an editable story.</p>
        <a class="btn btn--primary btn--sm" href="join.html">Start your application</a>
      </div>`;
    return;
  }

  storySlot.innerHTML = `
    <div class="dash-card">
      <div class="dash-card__head">
        <div>
          <h3>My story</h3>
          <p>Your character's backstory, shown here so you can keep it current. It starts with what you wrote in your application — edit it any time.</p>
        </div>
        <span class="dash-saved" id="story-saved" hidden>Saved</span>
      </div>
      <textarea class="dash-textarea" id="story-input" maxlength="1500" spellcheck="true">${esc(application.background)}</textarea>
      <div class="dash-card__actions">
        <span class="dash-count" id="story-count">${application.background.length} / 1500</span>
        <button class="btn btn--primary btn--sm" type="button" id="story-save">Save story</button>
      </div>
    </div>`;

  const stats = state.stats;
  const inGameName = (stats && stats.character_name) || application.character_name;
  const job = (stats && stats.job) || (application.status === "accepted" ? "Civilian" : "—");

  characterSlot.innerHTML = `
    <div class="dash-card">
      <div class="dash-character__head">
        <span class="dash-avatar dash-avatar--sm">${esc(inGameName.slice(0, 1).toUpperCase())}</span>
        <div>
          <b>${esc(inGameName)}</b>
          <span>Citizen ID: ${esc(citizenId(state.user))}</span>
        </div>
      </div>
      <dl class="dash-rows">
        <div><dt>Job</dt><dd>${esc(job)}</dd></div>
        <div><dt>Cash</dt><dd>${esc(money(stats ? stats.cash : null))}</dd></div>
        <div><dt>Bank</dt><dd>${esc(money(stats ? stats.bank : null))}</dd></div>
        <div><dt>Status</dt><dd>${esc(statusLabel())}</dd></div>
        <div><dt>Applied</dt><dd>${esc(prettyDate(application.created_at))}</dd></div>
        <div><dt>Language</dt><dd>${esc(application.language || "—")}</dd></div>
      </dl>
      <p class="dash-note" style="margin:14px 0 0">${stats ? `Synced ${esc(prettyDate(stats.updated_at, true))}` : needsSyncLabel()}</p>
    </div>`;

  const input = document.getElementById("story-input");
  const counter = document.getElementById("story-count");
  const saveButton = document.getElementById("story-save");

  input.addEventListener("input", () => {
    counter.textContent = `${input.value.length} / 1500`;
    counter.style.color = input.value.trim().length < 80 ? "var(--danger)" : "var(--muted-soft)";
  });

  saveButton.addEventListener("click", saveStory);
}

async function saveStory() {
  if (state.saving) return;

  const input = document.getElementById("story-input");
  const saveButton = document.getElementById("story-save");
  const saved = document.getElementById("story-saved");
  const background = input.value.trim();

  if (background.length < 80) {
    counterFlash("At least 80 characters, please.", true);
    return;
  }

  state.saving = true;
  saveButton.disabled = true;
  saveButton.textContent = "Saving…";

  try {
    const response = await fetch("/api/my-application/story", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ background })
    });

    if (response.ok) {
      state.application.background = background;
      if (saved) {
        saved.hidden = false;
        window.setTimeout(() => { saved.hidden = true; }, 2600);
      }
      counterFlash(`${background.length} / 1500`, false);
    } else {
      const data = await response.json().catch(() => ({}));
      counterFlash(data.error === "not_signed_in" ? "Session expired — sign in again." : "Could not save. Try again.", true);
    }
  } catch {
    counterFlash("Could not reach the server.", true);
  } finally {
    state.saving = false;
    saveButton.disabled = false;
    saveButton.textContent = "Save story";
  }
}

function counterFlash(text, isError) {
  const counter = document.getElementById("story-count");
  if (!counter) return;
  counter.textContent = text;
  counter.style.color = isError ? "var(--danger)" : "var(--muted-soft)";
}

/* --------------------------------------------------------------- other views */

function renderCard() {
  const application = state.application;
  const name = application ? application.character_name : state.user.displayName || state.user.username;

  document.getElementById("card-name").textContent = name;
  document.getElementById("card-citizen").textContent = citizenId(state.user);
  document.getElementById("card-discord").textContent = `@${state.user.username}`;
  document.getElementById("card-registered").textContent = application ? prettyDate(application.created_at) : "—";

  const badge = document.getElementById("card-status");
  badge.textContent = statusLabel();
  if (application) badge.dataset.status = application.status;

  const stats = state.stats;
  document.getElementById("card-job").textContent = stats && stats.job ? stats.job : "—";
  document.getElementById("card-cash").textContent = money(stats ? stats.cash : null);
  document.getElementById("card-bank").textContent = money(stats ? stats.bank : null);

  const sync = document.getElementById("card-sync");
  if (sync) sync.textContent = stats ? `Last synced from the game server ${prettyDate(stats.updated_at, true)}.` : needsSyncLabel();
}

const STAGES = [
  { label: "Submitted", icon: "user" },
  { label: "Story Accepted (W1)", icon: "doc" },
  { label: "PC Check (W2)", icon: "pc" },
  { label: "Vocal Interview", icon: "mic" },
  { label: "Whitelisted (W3)", icon: "check" }
];

const STAGE_ICONS = {
  user: '<circle cx="12" cy="8" r="3.4"/><path d="M5 20c.6-3.6 3.5-5.6 7-5.6s6.4 2 7 5.6"/>',
  doc: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>',
  pc: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M9 20h6M12 16v4"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  check: '<path d="M20 6 9.5 17 4 11.5"/>'
};

function applicationStage(application) {
  if (application.status === "accepted") return STAGES.length;
  if (application.status === "pc_failed") return 3;
  const stage = Number.parseInt(application.stage, 10);
  return Number.isInteger(stage) ? Math.min(Math.max(stage, 1), STAGES.length) : 1;
}

function trackerNote(application, stage) {
  if (application.status === "pc_failed") {
    return "Your PC check did not pass. Because of that, a new application cannot be submitted with this account. If you believe this was a mistake, open a ticket in Discord and a reviewer will look at it again.";
  }

  if (application.status === "declined") {
    return "Your application was declined. You can reapply after seven days with a longer story and a clearer reason for your character to be in the city. If you believe this was a mistake, open a ticket in Discord.";
  }

  if (stage >= STAGES.length) {
    return "Congratulations, you're whitelisted! Head to the Connect page to join the server.";
  }

  const next = STAGES[stage];
  const notes = {
    "Story Accepted (W1)": "A reviewer is reading your character story. Keep an eye on Discord — this is usually the quickest step.",
    "PC Check (W2)": "Your story passed. Next is a quick PC check: a reviewer makes sure your game runs smoothly in the city.",
    "Vocal Interview": "Almost there. Your PC check passed — a short voice chat with a reviewer is next, arranged in Discord.",
    "Whitelisted (W3)": "Your interview is done. The final step is the whitelist itself, which staff apply on your account."
  };

  return notes[next.label] || "Keep an eye on Discord for the next step.";
}

function trackerCta(application, stage) {
  if (application.status === "declined" || application.status === "pc_failed") {
    return `<a class="btn btn--ghost btn--block" href="https://discord.gg/bobonyrp" target="_blank" rel="noopener">Open a Discord ticket</a>`;
  }

  if (stage >= STAGES.length) {
    return `<a class="btn btn--primary btn--block" href="connect.html">Go to Connect page</a>`;
  }

  return `<a class="btn btn--primary btn--block" href="rules.html">Read the city rules while you wait</a>`;
}

function renderApplications() {
  const slot = document.getElementById("applications-slot");
  const application = state.application;

  if (!application) {
    slot.innerHTML = `
      <div class="dash-card">
        <h3 style="font-size:1.1rem;margin-bottom:8px">No application yet</h3>
        <p style="font-size:0.9rem">The allowlist takes about ten minutes: your character, a short background and a reason to be in the city.</p>
        <a class="btn btn--primary btn--sm" href="join.html">Start your application</a>
      </div>`;
    return;
  }

  const stage = applicationStage(application);

  const steps = STAGES.map((entry, index) => {
    const number = index + 1;
    const done = number <= stage;
    const next = number === stage + 1;
    const state = done ? "is-done" : next ? "is-next" : "is-todo";

    return `<li class="track__step ${state}">
        <span class="track__dot"><svg viewBox="0 0 24 24" aria-hidden="true">${STAGE_ICONS[entry.icon]}</svg></span>
        <span class="track__label">${esc(entry.label)}</span>
      </li>`;
  }).join("");

  slot.innerHTML = `
    <div class="dash-card app-track" data-status="${esc(application.status)}">
      <div class="app-track__head">
        <div class="app-track__tags">
          <span class="tag tag--rp">RP</span>
          <span class="badge" data-status="${esc(application.status)}">${esc(statusLabel())}</span>
        </div>
        <span class="app-track__date">Submitted ${esc(prettyDate(application.created_at))}</span>
      </div>

      <ol class="track">${steps}</ol>

      <div class="next-box">
        <span class="next-box__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.4.9 1 .9 1.7V17h5.2v-1.4c0-.7.3-1.3.9-1.7A6 6 0 0 0 12 3Z"/></svg></span>
        <div>
          <b>What's next</b>
          <p>${esc(trackerNote(application, stage))}</p>
        </div>
      </div>

      ${trackerCta(application, stage)}

      <details class="admin-details" style="margin-top:22px">
        <summary>Your submission</summary>
        <dl class="dash-rows" style="margin-top:12px">
          <div><dt>Character</dt><dd>${esc(application.character_name)}</dd></div>
          <div><dt>Age</dt><dd>${esc(application.age)}</dd></div>
          <div><dt>Language</dt><dd>${esc(application.language || "—")}</dd></div>
        </dl>
        <p>${esc(application.background)}</p>
        ${application.goals ? `<p><strong>Goals:</strong> ${esc(application.goals)}</p>` : ""}
      </details>
    </div>`;
}

/* --------------------------------------------------------------- navigation */

function setView(view) {
  state.view = view;

  document.querySelectorAll(".dash-nav button[data-view]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === view);
  });

  document.querySelectorAll(".dash-view[data-view]").forEach((section) => {
    section.hidden = section.dataset.view !== view;
  });
}

/* ------------------------------------------------------------------- boot */

async function boot() {
  let me = null;
  try {
    const response = await fetch("/api/me", { headers: { accept: "application/json" } });
    if (response.ok) me = await response.json();
  } catch {
    me = null;
  }

  if (!me || !me.user) {
    showLock();
    return;
  }

  state.user = me.user;

  // The staff panel link only exists for people the site recognises as staff.
  const adminLink = document.getElementById("dash-admin-link");
  if (adminLink) adminLink.hidden = !me.user.role;

  showApp();

  try {
    const response = await fetch("/api/my-application", { headers: { accept: "application/json" } });
    if (response.ok) {
      const data = await response.json();
      state.application = data.application || null;
    }
  } catch {
    state.application = null;
  }

  try {
    const response = await fetch("/api/my-stats", { headers: { accept: "application/json" } });
    if (response.ok) {
      const data = await response.json();
      state.stats = data.stats || null;
    }
  } catch {
    state.stats = null;
  }

  renderProfile();
  renderCharacters();
  renderCard();
  renderApplications();
  setView(state.view);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".dash-nav button[data-view]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  document.getElementById("dash-signout")?.addEventListener("click", async () => {
    try {
      await fetch("/auth/logout", { method: "POST" });
    } catch {
      /* ignore */
    }
    window.location.assign("/dashboard.html");
  });

  boot();
});
