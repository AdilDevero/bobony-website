/* ==========================================================================
   Staff panel — overview, applications, Damana, streamers, staff
   The server decides the role; this file only draws what it is allowed to see.
   ========================================================================== */

const ROLE_LABELS = { owner: "Owner", admin: "Admin", helper: "Helper RP" };

const PLATFORMS = [
  { key: "twitch", name: "Twitch" },
  { key: "youtube", name: "YouTube" },
  { key: "kick", name: "Kick" }
];

const STAGE_NAMES = ["Submitted", "Story Accepted (W1)", "PC Check (W2)", "Vocal Interview", "Whitelisted (W3)"];

const STATUS_LABELS = {
  pending: "Pending",
  accepted: "Accepted",
  declined: "Declined",
  pc_failed: "PC check failed"
};

const state = {
  role: null,
  user: null,
  applications: [],
  staff: [],
  activity: [],
  sponsorships: [],
  streamers: [],
  autoStreamers: {},
  filter: "all",
  sponsorFilter: "all",
  search: "",
  tab: "overview"
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

const isOwner = () => state.role === "owner";
const canDelete = () => state.role === "admin" || state.role === "owner";

function money(value) {
  if (value === null || value === undefined || value === "") return "—";
  return `$${Number(value).toLocaleString("en-US")}`;
}

function prettyDate(value) {
  if (!value) return "—";
  const date = new Date(String(value).replace(" ", "T") + "Z");
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function daysSince(value) {
  if (!value) return null;
  const date = new Date(String(value).replace(" ", "T") + "Z");
  if (Number.isNaN(date.getTime())) return null;
  return Math.max(0, Math.floor((Date.now() - date.getTime()) / 86400000));
}

function flash(text, ok = true) {
  const node = document.getElementById("admin-flash");
  if (!node) return;
  node.textContent = text;
  node.style.borderColor = ok ? "rgba(89, 217, 139, 0.35)" : "rgba(239, 91, 76, 0.4)";
  node.style.background = ok ? "rgba(89, 217, 139, 0.09)" : "rgba(239, 91, 76, 0.09)";
  node.style.color = ok ? "#9df0bd" : "#ffb4ab";
  node.classList.add("is-visible");
  window.setTimeout(() => node.classList.remove("is-visible"), 4200);
}

function showLock(title, text) {
  const lock = document.getElementById("admin-lock");
  const app = document.getElementById("admin-app");
  if (lock) {
    lock.hidden = false;
    if (title) document.getElementById("admin-lock-title").textContent = title;
    if (text) document.getElementById("admin-lock-text").textContent = text;
  }
  if (app) app.hidden = true;
}

function showApp() {
  const lock = document.getElementById("admin-lock");
  const app = document.getElementById("admin-app");
  if (lock) lock.hidden = true;
  if (app) app.hidden = false;
}

function emptyState(title, text) {
  return `<div class="card admin-empty"><h3>${esc(title)}</h3><p>${esc(text)}</p></div>`;
}

/* --------------------------------------------------------------- sections */

function setTab(tab) {
  state.tab = tab;

  document.querySelectorAll(".admin-nav button[data-tab]").forEach((button) => {
    const active = button.dataset.tab === tab;
    button.classList.toggle("is-active", active);
    if (active) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });

  document.querySelectorAll(".admin-panel[data-panel]").forEach((panel) => {
    panel.hidden = panel.dataset.panel !== tab;
  });

  if (tab === "overview") loadActivity();
  if (tab === "applications") loadApplications();
  if (tab === "sponsors") loadSponsorships();
  if (tab === "streamers") loadStreamers();
  if (tab === "staff") loadStaff();
}

function refreshAll() {
  loadApplications();
  loadStaff();
  loadSponsorships();
  loadStreamers();
  loadActivity();
}

/* --------------------------------------------------------- applications */

function applicationCounts() {
  const counts = { total: state.applications.length, pending: 0, accepted: 0, declined: 0, pc_failed: 0 };
  state.applications.forEach((application) => {
    if (counts[application.status] !== undefined) counts[application.status] += 1;
  });
  return counts;
}

function paintApplicationStats() {
  const node = document.getElementById("admin-stats");
  if (!node) return;
  const counts = applicationCounts();

  node.innerHTML = [
    ["Pending review", counts.pending],
    ["Accepted", counts.accepted],
    ["Declined", counts.declined],
    ["PC check failed", counts.pc_failed]
  ]
    .map(
      ([label, value]) => `
      <div class="admin-stat">
        <span class="admin-stat__value">${value}</span>
        <span class="admin-stat__label">${esc(label)}</span>
      </div>`
    )
    .join("");
}

function paintChipCounts() {
  const counts = applicationCounts();
  document.querySelectorAll("[data-chip-count]").forEach((node) => {
    const key = node.dataset.chipCount;
    node.textContent = String(counts[key] ?? 0);
  });

  const sponsorCounts = { all: state.sponsorships.length, pending: 0, approved: 0, denied: 0 };
  state.sponsorships.forEach((entry) => {
    if (sponsorCounts[entry.status] !== undefined) sponsorCounts[entry.status] += 1;
  });
  document.querySelectorAll("[data-sponsor-count]").forEach((node) => {
    node.textContent = String(sponsorCounts[node.dataset.sponsorCount] ?? 0);
  });
}

function paintNavCounts() {
  const counts = applicationCounts();
  const pendingSponsors = state.sponsorships.filter((entry) => entry.status === "pending").length;
  const live = state.streamers.filter((streamer) => streamer.live).length;

  const write = (key, value) => {
    const node = document.querySelector(`[data-nav-count="${key}"]`);
    if (!node) return;
    node.textContent = String(value);
    node.hidden = !value;
  };

  write("apps", counts.pending);
  write("sponsors", pendingSponsors);
  write("live", live);
}

async function loadApplications() {
  const list = document.getElementById("admin-list");
  if (list && !state.applications.length) list.innerHTML = `<p class="admin-loading">Loading applications…</p>`;

  try {
    const response = await fetch("/api/applications", { headers: { accept: "application/json" } });

    if (response.status === 401) return showLock("Session expired", "Please sign in with Discord again.");
    if (response.status === 403) return showLock("No access", "Your Discord role does not allow access to applications.");
    if (!response.ok) {
      if (list) list.innerHTML = `<p class="admin-loading is-error">The server could not load applications. Try again.</p>`;
      return;
    }

    const data = await response.json();
    state.applications = Array.isArray(data.applications) ? data.applications : [];
    paintApplicationStats();
    paintChipCounts();
    paintList();
    paintNavCounts();
    paintOverview();
  } catch {
    if (list) list.innerHTML = `<p class="admin-loading is-error">Could not reach the server.</p>`;
  }
}

function matchesSearch(application, needle) {
  if (!needle) return true;
  return [application.character_name, application.discord_username, application.discord_id]
    .some((value) => String(value ?? "").toLowerCase().includes(needle));
}

function paintList() {
  const list = document.getElementById("admin-list");
  if (!list) return;

  const needle = state.search.trim().toLowerCase();
  const visible = state.applications.filter(
    (application) =>
      (state.filter === "all" || application.status === state.filter) && matchesSearch(application, needle)
  );

  if (!visible.length) {
    if (needle) {
      list.innerHTML = emptyState("No matches", `Nothing matches “${needle}”. Clear the search to see the whole queue.`);
      return;
    }
    list.innerHTML = emptyState(
      "Nothing here yet",
      state.filter === "all" ? "No applications have been submitted yet." : `No ${STATUS_LABELS[state.filter] || state.filter} applications.`
    );
    return;
  }

  list.innerHTML = visible.map(applicationCard).join("");
}

function economy(application) {
  if (!application.stats_updated_at) {
    return `<p class="admin-meta" style="margin:12px 0 0">No economy sync yet — this citizen has not been online since the game server was connected.</p>`;
  }

  return `<div class="admin-econ">
      <div><span>Job</span><b>${esc(application.game_job || "—")}</b></div>
      <div><span>Cash</span><b>${esc(money(application.cash))}</b></div>
      <div><span>Bank</span><b>${esc(money(application.bank))}</b></div>
      <div><span>Synced</span><b>${esc(prettyDate(application.stats_updated_at))}</b></div>
    </div>`;
}

function appStage(application) {
  if (application.status === "accepted") return STAGE_NAMES.length;
  const stage = Number.parseInt(application.stage, 10);
  return Number.isInteger(stage) ? Math.min(Math.max(stage, 1), STAGE_NAMES.length) : 1;
}

function stageButtons(application, stage) {
  const buttons = [];

  if (stage < STAGE_NAMES.length) {
    buttons.push(
      `<button class="btn btn--sm btn--ghost" type="button" data-action="stage" data-id="${esc(application.id)}" data-stage="${stage + 1}">Move to ${esc(STAGE_NAMES[stage])}</button>`
    );
  }

  if (stage > 1) {
    buttons.push(
      `<button class="btn btn--sm btn--ghost" type="button" data-action="stage" data-id="${esc(application.id)}" data-stage="${stage - 1}">Step back</button>`
    );
  }

  if (!buttons.length) buttons.push(`<span class="admin-hint">Whitelisted — no further steps.</span>`);

  return buttons.join("");
}

function applicationCard(application) {
  const statusLabel = STATUS_LABELS[application.status] || application.status;
  const stage = appStage(application);
  const id = esc(application.id);

  return `
    <article class="card admin-card" data-status="${esc(application.status)}" data-id="${id}">
      <div class="admin-card__head">
        <div class="admin-card__who">
          <h3>${esc(application.character_name)}</h3>
          <p class="admin-meta">
            @${esc(application.discord_username)} · ID ${esc(application.discord_id)} ·
            ${esc(application.age)} y/o · ${esc(application.language || "—")} · ${esc(prettyDate(application.created_at))}
          </p>
          ${application.desired_role ? `<p class="admin-role">${esc(application.desired_role)}</p>` : ""}
        </div>
        <div class="admin-card__marks">
          <span class="badge" data-status="${esc(application.status)}">${esc(statusLabel)}</span>
          <span class="admin-card__stage">Step ${stage} of ${STAGE_NAMES.length}</span>
        </div>
      </div>

      ${economy(application)}

      <details class="admin-details">
        <summary>Background &amp; goals</summary>
        <p>${esc(application.background)}</p>
        ${application.goals ? `<p><strong>Goals:</strong> ${esc(application.goals)}</p>` : ""}
      </details>

      <div class="admin-group">
        <span class="admin-group__label">Progress</span>
        <span class="admin-stage">${esc(STAGE_NAMES[stage - 1])}</span>
        ${stageButtons(application, stage)}
      </div>

      <div class="admin-group">
        <span class="admin-group__label">Decision</span>
        <button class="btn btn--sm ${application.status === "accepted" ? "btn--primary" : "btn--ghost"}" type="button" data-action="accepted" data-id="${id}">Accept</button>
        <button class="btn btn--sm ${application.status === "declined" ? "btn--primary" : "btn--ghost"}" type="button" data-action="declined" data-id="${id}">Decline</button>
        <button class="btn btn--sm ${application.status === "pc_failed" ? "btn--primary" : "btn--ghost"}" type="button" data-action="pc_failed" data-id="${id}">PC check failed</button>
        <button class="btn btn--sm btn--ghost" type="button" data-action="pending" data-id="${id}">Reset</button>
        ${canDelete() ? `<button class="btn btn--sm btn--ghost admin-danger" type="button" data-action="delete" data-id="${id}">Delete</button>` : ""}
      </div>
    </article>`;
}

function notifyMessage(notify, action) {
  if (!notify) return "";
  if (notify.sent) {
    if (notify.roleAssigned === false) {
      return action === "accepted"
        ? "Discord DM sent, but the whitelist role was not assigned — check that the bot's role sits above the whitelist role in Server Settings → Roles."
        : "Discord DM sent, but the W1 role was not assigned — check that the bot's role sits above W1 in Server Settings → Roles.";
    }
    return action === "stage" ? "Discord DM sent and the W1 role was assigned." : "Discord DM sent to the applicant.";
  }
  if (notify.reason === "unchanged") return "";
  if (notify.reason === "message_disabled") {
    return notify.roleAssigned
      ? "W3 role assigned on Discord — no message was sent."
      : "The W3 role was not assigned — check that the bot's role sits above W3 in Server Settings → Roles.";
  }
  if (notify.reason === "bot_not_configured") {
    return "No Discord DM was sent: add DISCORD_BOT_TOKEN in the site secrets to message applicants.";
  }
  return "The Discord DM could not be delivered.";
}

async function act(action, id, stage) {
  if (action === "stage") {
    const response = await fetch("/api/applications/stage", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: Number(id), stage: Number(stage) })
    }).catch(() => null);

    if (response && response.ok) {
      const data = await response.json().catch(() => ({}));
      flash(`Moved to ${STAGE_NAMES[Number(stage) - 1]}. ${notifyMessage(data.notify, "stage")}`.trim());
      await loadApplications();
      loadActivity();
    } else {
      flash("Could not move that application.", false);
    }
    return;
  }

  if (action === "delete") {
    if (!window.confirm("Delete this application permanently?")) return;

    const response = await fetch("/api/applications/delete", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: Number(id) })
    }).catch(() => null);

    if (response && response.ok) {
      flash("Application deleted.");
      await loadApplications();
      loadActivity();
    } else {
      flash("Could not delete that application.", false);
    }
    return;
  }

  const response = await fetch("/api/applications/status", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id: Number(id), status: action })
  }).catch(() => null);

  if (response && response.ok) {
    const target = state.applications.find((application) => String(application.id) === String(id));
    if (target) target.status = action;
    paintApplicationStats();
    paintChipCounts();
    paintList();
    paintNavCounts();
    paintOverview();
    const data = await response.json().catch(() => ({}));
    flash(`Application marked ${STATUS_LABELS[action] || action}. ${notifyMessage(data.notify, action)}`.trim());
    loadActivity();
  } else {
    flash("Could not update that application.", false);
  }
}

/* ------------------------------------------------------------- overview */

function paintOverview() {
  const stats = document.getElementById("ov-stats");
  const attention = document.getElementById("ov-attention");
  if (!stats || !attention) return;

  const counts = applicationCounts();
  const pendingSponsors = state.sponsorships.filter((entry) => entry.status === "pending").length;
  const live = state.streamers.filter((streamer) => streamer.live).length;

  stats.innerHTML = [
    ["Waiting for review", counts.pending],
    ["Damana waiting", pendingSponsors],
    ["Staff members", state.staff.length],
    ["Streamers live", live]
  ]
    .map(
      ([label, value]) => `
      <div class="admin-stat">
        <span class="admin-stat__value">${value}</span>
        <span class="admin-stat__label">${esc(label)}</span>
      </div>`
    )
    .join("");

  const rows = [];

  const waiting = state.applications.filter((application) => application.status === "pending");
  if (waiting.length) {
    const oldest = waiting.reduce((current, application) => {
      const reached = daysSince(application.created_at);
      if (reached === null) return current;
      return current === null ? reached : Math.max(current, reached);
    }, null);
    rows.push(`
      <div class="attention__item">
        <span class="attention__dot" data-tone="warn"></span>
        <div class="attention__text">
          <b>${waiting.length} application${waiting.length === 1 ? "" : "s"} waiting</b>
          <span>${oldest === null ? "Newest submissions first in the queue." : `Oldest waiting ${oldest === 0 ? "since today" : `${oldest} day${oldest === 1 ? "" : "s"}`}.`}</span>
        </div>
        <button class="btn btn--ghost btn--sm" type="button" data-goto="applications" data-goto-filter="pending">Open queue</button>
      </div>`);
  }

  if (pendingSponsors) {
    rows.push(`
      <div class="attention__item">
        <span class="attention__dot" data-tone="warn"></span>
        <div class="attention__text">
          <b>${pendingSponsors} Damana request${pendingSponsors === 1 ? "" : "s"} waiting</b>
          <span>Sponsorships need an approve or deny.</span>
        </div>
        <button class="btn btn--ghost btn--sm" type="button" data-goto="sponsors">Open Damana</button>
      </div>`);
  }

  const automatic = PLATFORMS.filter((platform) => state.autoStreamers[platform.key]);
  if (automatic.length < PLATFORMS.length) {
    const missing = PLATFORMS.filter((platform) => !state.autoStreamers[platform.key]).map((platform) => platform.name);
    rows.push(`
      <div class="attention__item">
        <span class="attention__dot" data-tone="info"></span>
        <div class="attention__text">
          <b>${missing.join(" and ")} still manual</b>
          <span>Add credentials in the site secrets so live status updates itself.</span>
        </div>
        <button class="btn btn--ghost btn--sm" type="button" data-goto="streamers">Open streamers</button>
      </div>`);
  }

  if (!rows.length) {
    rows.push(`
      <div class="attention__item attention__item--clear">
        <span class="attention__dot" data-tone="ok"></span>
        <div class="attention__text">
          <b>All caught up</b>
          <span>Nothing is waiting on the team right now.</span>
        </div>
      </div>`);
  }

  attention.innerHTML = rows.join("");
}

async function loadActivity() {
  const node = document.getElementById("ov-activity");
  if (!node) return;
  if (!state.activity.length) node.innerHTML = `<p class="admin-loading">Loading activity…</p>`;

  try {
    const response = await fetch("/api/activity", { headers: { accept: "application/json" } });
    if (!response.ok) {
      node.innerHTML = `<p class="admin-loading">Activity is not available for your role.</p>`;
      return;
    }
    const data = await response.json();
    state.activity = Array.isArray(data.activity) ? data.activity : [];

    if (!state.activity.length) {
      node.innerHTML = `<p class="admin-loading">No activity recorded yet.</p>`;
      return;
    }

    node.innerHTML = `<ul class="activity">${state.activity
      .slice(0, 12)
      .map(
        (entry) => `
        <li class="activity__item">
          <span class="activity__actor">${esc(entry.actor_name)}</span>
          <span class="activity__action">${esc(entry.action)}</span>
          ${entry.detail ? `<span class="activity__detail">${esc(entry.detail)}</span>` : ""}
          <span class="activity__time">${esc(prettyDate(entry.created_at))}</span>
        </li>`
      )
      .join("")}</ul>`;
  } catch {
    node.innerHTML = `<p class="admin-loading is-error">Could not load activity.</p>`;
  }
}

/* ---------------------------------------------------------------- staff */

async function loadStaff() {
  const list = document.getElementById("staff-list");
  if (!list) return;

  if (state.role === "helper") {
    list.innerHTML = emptyState("Staff list restricted", "The staff list is visible to admins and owners.");
    return;
  }

  if (!state.staff.length) list.innerHTML = `<p class="admin-loading">Loading staff…</p>`;

  try {
    const response = await fetch("/api/staff", { headers: { accept: "application/json" } });
    if (!response.ok) {
      list.innerHTML = `<p class="admin-loading is-error">Could not load the staff list.</p>`;
      return;
    }

    const data = await response.json();
    state.staff = Array.isArray(data.staff) ? data.staff : [];
    paintStaff();
    paintOverview();
  } catch {
    list.innerHTML = `<p class="admin-loading is-error">Could not load the staff list.</p>`;
  }
}

function paintStaff() {
  const list = document.getElementById("staff-list");
  if (!list) return;

  const card = document.getElementById("staff-form-card");
  const readonly = document.getElementById("staff-readonly");
  if (card) card.hidden = !isOwner();
  if (readonly) readonly.hidden = isOwner();

  if (!state.staff.length) {
    list.innerHTML = emptyState(
      "No staff added from the panel",
      "Members with a staff Discord role already have access. Add someone here to give access without touching roles."
    );
    return;
  }

  const rows = state.staff
    .map(
      (member) => `
      <div class="admin-table__row">
        <div class="admin-table__who">
          <b>${esc(member.display_name || "Unnamed")}</b>
          <span>${esc(member.discord_id)}</span>
        </div>
        <span class="badge" data-role="${esc(member.tier)}">${esc(ROLE_LABELS[member.tier] || member.tier)}</span>
        <span class="admin-meta">${esc(prettyDate(member.created_at))}</span>
        ${
          isOwner()
            ? `<button class="btn btn--ghost btn--sm admin-danger" type="button" data-remove="${esc(member.discord_id)}" ${String(member.discord_id) === String(state.user.id) ? "disabled" : ""}>Remove</button>`
            : `<span></span>`
        }
      </div>`
    )
    .join("");

  list.innerHTML = `<div class="admin-table">
      <div class="admin-table__row admin-table__row--head">
        <span>Member</span><span>Role</span><span>Added</span><span></span>
      </div>
      ${rows}
    </div>`;
}

async function saveStaff(event) {
  event.preventDefault();
  if (!isOwner()) return;

  const discordId = document.getElementById("staff-id").value.trim();
  const displayName = document.getElementById("staff-name").value.trim();
  const tier = document.getElementById("staff-tier").value;

  const response = await fetch("/api/staff", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ discordId, displayName, tier })
  }).catch(() => null);

  if (response && response.ok) {
    flash("Staff member saved.");
    document.getElementById("staff-form").reset();
    await loadStaff();
    loadActivity();
  } else {
    const data = response ? await response.json().catch(() => ({})) : {};
    flash(data.error === "invalid_fields" ? "Check the Discord ID and role." : "Could not save that staff member.", false);
  }
}

async function removeStaff(discordId) {
  if (!isOwner()) return;
  if (!window.confirm("Remove this staff member from the panel list?")) return;

  const response = await fetch("/api/staff/remove", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ discordId })
  }).catch(() => null);

  if (response && response.ok) {
    flash("Staff member removed.");
    await loadStaff();
    loadActivity();
  } else {
    flash("Could not remove that staff member.", false);
  }
}

/* -------------------------------------------------------------- damana */

async function loadSponsorships() {
  const list = document.getElementById("sponsor-list");
  if (!list) return;

  try {
    const response = await fetch("/api/sponsorships", { headers: { accept: "application/json" } });
    if (!response.ok) return;
    const data = await response.json();
    state.sponsorships = data.sponsorships || [];
    paintSponsorships();
    paintChipCounts();
    paintNavCounts();
    paintOverview();
  } catch {
    /* leave the last list on screen */
  }
}

function paintSponsorships() {
  const list = document.getElementById("sponsor-list");
  if (!list) return;

  const statusMap = { approved: "accepted", denied: "declined", pending: "pending" };

  const visible = state.sponsorships.filter(
    (entry) => state.sponsorFilter === "all" || entry.status === state.sponsorFilter
  );

  if (!visible.length) {
    list.innerHTML = emptyState(
      "No requests here",
      state.sponsorFilter === "all" ? "No sponsorship requests yet." : `No ${state.sponsorFilter} sponsorship requests.`
    );
    return;
  }

  list.innerHTML = visible
    .map(
      (entry) => `
      <article class="card admin-card" data-status="${esc(statusMap[entry.status] || "pending")}">
        <div class="admin-card__head">
          <div class="admin-card__who">
            <h3>${esc(entry.character_name || entry.friend_username)}</h3>
            <p class="admin-meta">
              @${esc(entry.friend_username)} · ID ${esc(entry.friend_discord_id)} ·
              ${esc(entry.character_age || "—")} y/o · ${esc(entry.nationality || "—")} · ${esc(prettyDate(entry.created_at))}
            </p>
            <p class="admin-meta">Sponsored by @${esc(entry.sponsor_username)}</p>
          </div>
          <div class="admin-card__marks">
            <span class="badge" data-status="${esc(statusMap[entry.status] || "pending")}">${esc(entry.status)}</span>
          </div>
        </div>

        <details class="admin-details">
          <summary>Dossier &amp; experience</summary>
          <p><strong>Experience:</strong> ${esc(entry.experience || "—")}</p>
          <p><strong>Hours / availability:</strong> ${esc(entry.hours_played || "—")} · ${esc(entry.availability || "—")}</p>
          <p><strong>Previous servers:</strong> ${esc(entry.previous_servers || "—")}</p>
          <p><strong>Role wanted:</strong> ${esc(entry.faction || "—")}</p>
          <p><strong>Personality:</strong> ${esc(entry.personality || "—")}</p>
          <p><strong>Principles:</strong> ${esc(entry.principles || "—")}</p>
          <p><strong>Backstory:</strong> ${esc(entry.backstory || "—")}</p>
        </details>

        <div class="admin-group">
          <span class="admin-group__label">Decision</span>
          <button class="btn btn--sm ${entry.status === "approved" ? "btn--primary" : "btn--ghost"}" type="button" data-sponsor-action="approved" data-id="${esc(entry.id)}">Approve</button>
          <button class="btn btn--sm ${entry.status === "denied" ? "btn--primary" : "btn--ghost"}" type="button" data-sponsor-action="denied" data-id="${esc(entry.id)}">Deny</button>
        </div>
      </article>`
    )
    .join("");
}

async function actSponsorship(id, status) {
  const response = await fetch("/api/sponsorships/status", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id: Number(id), status })
  }).catch(() => null);

  if (response && response.ok) {
    flash(status === "approved" ? "Sponsorship approved — the friend is in the application queue." : "Sponsorship denied.");
    await loadSponsorships();
    loadApplications();
    loadActivity();
  } else {
    flash("Could not update that sponsorship.", false);
  }
}

/* ------------------------------------------------------------ streamers */

async function loadStreamers() {
  const list = document.getElementById("streamer-list");
  if (!list) return;

  try {
    const response = await fetch("/api/streamers", { headers: { accept: "application/json" } });
    if (!response.ok) return;
    const data = await response.json();
    state.streamers = data.streamers || [];
    state.autoStreamers = data.auto || {};
    paintPlatforms();
    paintStreamers();
    paintNavCounts();
    paintOverview();
  } catch {
    /* keep whatever is on screen */
  }
}

function paintPlatforms() {
  const node = document.getElementById("platform-list");
  if (!node) return;

  node.innerHTML = PLATFORMS.map((platform) => {
    const automatic = Boolean(state.autoStreamers[platform.key]);
    return `
      <div class="platform" data-on="${automatic ? "1" : "0"}">
        <span class="platform__dot"></span>
        <div class="platform__text">
          <span class="platform__name">${esc(platform.name)}</span>
          <span class="platform__state">${automatic ? "Automatic live checking" : "Manual — use the buttons"}</span>
        </div>
      </div>`;
  }).join("");
}

function paintStreamers() {
  const list = document.getElementById("streamer-list");
  if (!list) return;

  if (!state.streamers.length) {
    list.innerHTML = emptyState("No streamers yet", "Add one above and they show up on the homepage whenever they are live.");
    return;
  }

  list.innerHTML = state.streamers
    .map(
      (streamer) => `
      <div class="streamer-row">
        <span class="streamer-platform" data-platform="${esc(streamer.platform)}">${esc(streamer.platform)}</span>
        <div class="streamer-row__who">
          <b>${esc(streamer.name)}</b>
          <small><a href="${esc(streamer.url)}" target="_blank" rel="noopener">${esc(streamer.url)}</a> · ${
            state.autoStreamers[streamer.platform] ? "auto" : "manual"
          }</small>
        </div>
        <span class="badge" data-status="${streamer.live ? "accepted" : "pending"}">${streamer.live ? "Live" : "Offline"}</span>
        <div class="btn-row">
          <button class="btn btn--sm btn--ghost" type="button" data-streamer-live="1" data-id="${esc(streamer.id)}">Live</button>
          <button class="btn btn--sm btn--ghost" type="button" data-streamer-live="0" data-id="${esc(streamer.id)}">Offline</button>
          <button class="btn btn--sm btn--ghost admin-danger" type="button" data-streamer-remove="${esc(streamer.id)}">Remove</button>
        </div>
      </div>`
    )
    .join("");
}

async function addStreamer(event) {
  event.preventDefault();

  const payload = {
    name: document.getElementById("streamer-name").value.trim(),
    platform: document.getElementById("streamer-platform").value,
    channel: document.getElementById("streamer-channel").value.trim(),
    url: document.getElementById("streamer-url").value.trim()
  };

  const response = await fetch("/api/streamers/save", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload)
  }).catch(() => null);

  if (response && response.ok) {
    flash("Streamer added.");
    document.getElementById("streamer-form").reset();
    await loadStreamers();
  } else if (response && response.status === 403) {
    flash("Only admins and owners can add streamers.", false);
  } else {
    flash("Check the name and channel, then try again.", false);
  }
}

async function actStreamer(id, mode) {
  if (mode === "remove" && !window.confirm("Remove this streamer from the site?")) return;

  const payload = mode === "remove" ? { id: Number(id), remove: true } : { id: Number(id), live: mode === "1" };

  const response = await fetch("/api/streamers/live", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload)
  }).catch(() => null);

  if (response && response.ok) {
    flash(mode === "remove" ? "Streamer removed." : mode === "1" ? "Marked live." : "Marked offline.");
    await loadStreamers();
  } else {
    flash("Could not update that streamer.", false);
  }
}

/* ------------------------------------------------------------------ boot */

function renderIdentity() {
  const user = state.user;
  const name = user.displayName || user.username;
  const avatar = document.getElementById("admin-avatar");

  if (avatar) {
    if (user.avatar) {
      const extension = String(user.avatar).startsWith("a_") ? "gif" : "png";
      avatar.innerHTML = `<img src="https://cdn.discordapp.com/avatars/${esc(user.id)}/${esc(user.avatar)}.${extension}?size=128" alt="" loading="lazy" referrerpolicy="no-referrer">`;
    } else {
      avatar.textContent = name.slice(0, 1).toUpperCase();
    }
  }

  const userNode = document.getElementById("admin-user");
  if (userNode) userNode.textContent = name;

  const ovName = document.getElementById("ov-name");
  if (ovName) ovName.textContent = name.split(" ")[0];

  const badge = document.getElementById("admin-role");
  if (badge) {
    badge.textContent = ROLE_LABELS[state.role] || state.role;
    badge.dataset.role = state.role;
  }
}

async function boot() {
  let data = null;
  try {
    const response = await fetch("/api/me", { headers: { accept: "application/json" } });
    if (response.ok) data = await response.json();
  } catch {
    data = null;
  }

  if (!data || !data.user) {
    showLock("Sign in first", "Sign in with Discord to open the staff panel.");
    return;
  }

  if (!data.user.role) {
    showLock(
      "No staff role",
      `Your Discord account (${data.user.username}) does not hold a staff role in the server. Ask an owner for the helper, admin or owner role.`
    );
    return;
  }

  state.user = data.user;
  state.role = data.user.role;

  renderIdentity();
  showApp();
  setTab("overview");

  await loadApplications();
  await loadStaff();
  await loadSponsorships();
  await loadStreamers();
  await loadActivity();
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("admin-list")?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    act(button.dataset.action, button.dataset.id, button.dataset.stage);
  });

  document.getElementById("sponsor-list")?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-sponsor-action]");
    if (!button) return;
    actSponsorship(button.dataset.id, button.dataset.sponsorAction);
  });

  document.getElementById("streamer-list")?.addEventListener("click", (event) => {
    const toggle = event.target.closest("button[data-streamer-live]");
    if (toggle) {
      actStreamer(toggle.dataset.id, toggle.dataset.streamerLive);
      return;
    }

    const remove = event.target.closest("button[data-streamer-remove]");
    if (remove) actStreamer(remove.dataset.streamerRemove, "remove");
  });

  document.getElementById("staff-list")?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-remove]");
    if (!button) return;
    removeStaff(button.dataset.remove);
  });

  document.getElementById("ov-attention")?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-goto]");
    if (!button) return;

    if (button.dataset.gotoFilter) {
      state.filter = button.dataset.gotoFilter;
      document.querySelectorAll(".chip[data-filter]").forEach((chip) => {
        chip.classList.toggle("is-active", chip.dataset.filter === state.filter);
      });
      paintList();
    }

    setTab(button.dataset.goto);
  });

  document.querySelectorAll(".chip[data-filter]").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip[data-filter]").forEach((other) => other.classList.remove("is-active"));
      chip.classList.add("is-active");
      state.filter = chip.dataset.filter;
      paintList();
    });
  });

  document.querySelectorAll(".chip[data-sponsor-filter]").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip[data-sponsor-filter]").forEach((other) => other.classList.remove("is-active"));
      chip.classList.add("is-active");
      state.sponsorFilter = chip.dataset.sponsorFilter;
      paintSponsorships();
    });
  });

  document.getElementById("apps-search")?.addEventListener("input", (event) => {
    state.search = event.target.value;
    paintList();
  });

  document.querySelectorAll(".admin-nav button[data-tab]").forEach((tab) => {
    tab.addEventListener("click", () => setTab(tab.dataset.tab));
  });

  document.getElementById("staff-form")?.addEventListener("submit", saveStaff);
  document.getElementById("streamer-form")?.addEventListener("submit", addStreamer);

  document.getElementById("admin-refresh")?.addEventListener("click", refreshAll);
  document.getElementById("ov-refresh")?.addEventListener("click", refreshAll);

  document.getElementById("admin-signout")?.addEventListener("click", async () => {
    try {
      await fetch("/auth/logout", { method: "POST" });
    } catch {
      /* ignore */
    }
    window.location.assign("/admin.html");
  });

  boot();
});
