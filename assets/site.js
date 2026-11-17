/* ==========================================================================
   BOBONY ROLEPLAY — shared chrome + interactions
   The header and footer live here so every page stays in sync.
   ========================================================================== */

const SITE = {
  name: "Bobony",
  suffix: "Roleplay",
  discord: "https://discord.gg/bobonyrp",
  email: "bcsd@contact.com",
  connecting: "cfx.re/join/6jzpl6",
  servers: [
    { id: "6jzpl6", name: "Bobony RP Main City", sub: "Whitelist · serious RP", connect: "cfx.re/join/6jzpl6", max: 200, online: 0 },
    { id: "r7kyq8", name: "Bobony RP PvP", sub: "Open · no whitelist", connect: "cfx.re/join/r7kyq8", max: 160, online: 0 }
  ]
};

const NAV = [
  { href: "home.html", label: "Home" },
  { href: "about.html", label: "About" },
  { href: "rules.html", label: "Rules" },
  { href: "news.html", label: "News" },
  { href: "faq.html", label: "FAQ" },
  { href: "store.html", label: "Store" },
  { href: "status.html", label: "Status" },
  { href: "dashboard.html", label: "Dashboard" }
];

const SOCIAL_ICONS = {
  discord:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.3 4.4A19 19 0 0 0 15.6 3l-.3.6a14 14 0 0 1 3.5 1.3 13.7 13.7 0 0 0-9.6 0A14 14 0 0 1 12.7 3.6L12.4 3a19 19 0 0 0-4.7 1.4C4.4 9.1 3.3 13.7 3.9 18.2a19 19 0 0 0 5.7 2.9l.7-1.2a12 12 0 0 1-2-1l.5-.4a13.6 13.6 0 0 0 10.4 0l.5.4a12 12 0 0 1-2 1l.7 1.2a19 19 0 0 0 5.7-2.9c.7-5.2-.9-9.8-3.8-13.8ZM9.3 15.4c-1 0-1.9-1-1.9-2.2s.8-2.2 1.9-2.2 1.9 1 1.9 2.2-.9 2.2-1.9 2.2Zm5.4 0c-1 0-1.9-1-1.9-2.2s.8-2.2 1.9-2.2 1.9 1 1.9 2.2-.8 2.2-1.9 2.2Z"/></svg>',
  instagram:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.1-.9 0-1.4.2-1.7.3-.4.2-.7.4-1 .7-.3.3-.5.6-.7 1-.1.3-.3.8-.3 1.7-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c0 .9.2 1.4.3 1.7.2.4.4.7.7 1 .3.3.6.5 1 .7.3.1.8.3 1.7.3 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c.9 0 1.4-.2 1.7-.3.4-.2.7-.4 1-.7.3-.3.5-.6.7-1 .1-.3.3-.8.3-1.7.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c0-.9-.2-1.4-.3-1.7-.2-.4-.4-.7-.7-1-.3-.3-.6-.5-1-.7-.3-.1-.8-.3-1.7-.3-1.2-.1-1.6-.1-4.7-.1Zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 8a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2Zm6.3-8.2a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z"/></svg>',
  twitch:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.3 2 2.5 6.1v14.2h4.4V23h2.9l2.7-2.7h3.5L20 16.4V2H4.3Zm14 13.6-2.5 2.5h-4.4l-2.3 2.3v-2.3H5.7V3.8h12.6v11.8ZM9.9 7.2h1.8v6h-1.8v-6Zm4.9 0H16v6h-1.8v-6Z"/></svg>',
  youtube:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.8 4.8 12 4.8 12 4.8s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2C1.1 8.9 1.1 12 1.1 12s0 3.1.4 4.8a2.8 2.8 0 0 0 2 2c1.7.4 8.5.4 8.5.4s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2c.4-1.7.4-4.8.4-4.8s0-3.1-.4-4.8ZM9.8 15.5v-7l6 3.5-6 3.5Z"/></svg>'
};

/* ------------------------------------------------------------------ ticker */

function tickerItem(label, value, live) {
  return `<span class="ticker__item"><span class="dot${live ? "" : " dot--warn"}"></span>${label}: <b>${value}</b></span>`;
}

function renderTicker() {
  const group = `
    <div class="ticker__group">
      ${tickerItem("Allowlist", "Open", true)}
      ${tickerItem("Server", "Online", true)}
      ${tickerItem("Players", `<span data-live-players>--</span>/200`, true)}
      ${tickerItem("Framework", "Custom", false)}
      ${tickerItem("Region", "EU / MENA", false)}
      ${tickerItem("Discord", "12,400+", true)}
      ${tickerItem("Season 4", "Live now", true)}
    </div>`;
  return `
    <div class="ticker" aria-label="Server status">
      <div class="ticker__track">${group}${group}</div>
    </div>`;
}

/* ------------------------------------------------------------------ header */

function renderHeader() {
  const page = document.body.dataset.page || "";
  const links = NAV.map(
    (item) =>
      `<a href="${item.href}"${item.href === page ? ' class="is-active" aria-current="page"' : ""}>${item.label}</a>`
  ).join("");

  const mobile = NAV.map(
    (item) => `<a href="${item.href}"${item.href === page ? ' class="is-active"' : ""}>${item.label}</a>`
  ).join("");

  return `
    <div class="site-header">
      <div class="container">
        <div class="site-header__inner">
          <a class="brand" href="home.html" aria-label="${SITE.name} ${SITE.suffix} home">
            <img class="brand__logo" src="assets/logo.png" alt="${SITE.name} ${SITE.suffix}" width="452" height="275">
          </a>
          <nav class="nav" aria-label="Main navigation">${links}</nav>
          <div class="header__actions">
            <label class="lang-switch">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.6"/><path d="M3.4 12h17.2M12 3.4c2.3 2.4 3.5 5.4 3.5 8.6s-1.2 6.2-3.5 8.6c-2.3-2.4-3.5-5.4-3.5-8.6S9.7 5.8 12 3.4Z"/></svg>
              <select class="lang-select" aria-label="Language">
                <option value="en">EN</option>
                <option value="fr">FR</option>
                <option value="ar">AR</option>
              </select>
            </label>
            <a class="btn btn--ghost btn--sm" href="${SITE.discord}" target="_blank" rel="noopener">Discord</a>
            <a class="btn btn--primary btn--sm" href="join.html">Apply</a>
            <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu"><span></span></button>
          </div>
        </div>
        <div class="mobile-menu" id="mobile-menu">
          ${mobile}
          <label class="lang-switch lang-switch--mobile">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.6"/><path d="M3.4 12h17.2M12 3.4c2.3 2.4 3.5 5.4 3.5 8.6s-1.2 6.2-3.5 8.6c-2.3-2.4-3.5-5.4-3.5-8.6S9.7 5.8 12 3.4Z"/></svg>
            <select class="lang-select" aria-label="Language">
              <option value="en">EN</option>
              <option value="fr">FR</option>
              <option value="ar">AR</option>
            </select>
          </label>
          <a href="join.html" class="btn btn--primary">Apply for allowlist</a>
        </div>
      </div>
    </div>`;
}

/* ------------------------------------------------------------------ footer */

function renderFooter() {
  const navCol = [
    ["About us", "about.html"],
    ["Rules", "rules.html"],
    ["Apply", "join.html"],
    ["Connect", "connect.html"],
    ["Careers", "careers.html"]
  ]
    .map(([label, href]) => `<li><a href="${href}">${label}</a></li>`)
    .join("");

  const communityCol = [
    ["News", "news.html"],
    ["FAQ", "faq.html"],
    ["Server status", "status.html"],
    ["Store", "store.html"],
    ["Dashboard", "dashboard.html"],
    ["Discord", SITE.discord, true]
  ]
    .map(([label, href, ext]) => `<li><a href="${href}"${ext ? ' target="_blank" rel="noopener"' : ""}>${label}</a></li>`)
    .join("");

  const legalCol = [
    ["Terms of service", "terms.html"],
    ["Privacy policy", "privacy.html"],
    ["Refund policy", "refunds.html"]
  ]
    .map(([label, href]) => `<li><a href="${href}">${label}</a></li>`)
    .join("");

  const servers = SITE.servers
    .map(
      (s) => `
      <div class="footer__server">
        <span>${s.name}</span>
        <b data-server-count="${s.id}">0 / ${s.max}</b>
      </div>`
    )
    .join("");

  return `
    <div class="site-footer">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__brand">
            <a class="brand" href="home.html">
              <img class="brand__logo" src="assets/logo.png" alt="${SITE.name} ${SITE.suffix}" width="452" height="275">
            </a>
            <p>Built by the ${SITE.name} community, for the ${SITE.name} community. A serious roleplay city with custom systems, a player-driven economy and a staff team that listens.</p>
            <p style="margin-bottom:0">Business inquiries: <a href="mailto:${SITE.email}" style="color:var(--accent)">${SITE.email}</a></p>
            <div class="socials">
              <a href="${SITE.discord}" target="_blank" rel="noopener" aria-label="Discord">${SOCIAL_ICONS.discord}</a>
              <a href="https://instagram.com/" target="_blank" rel="noopener" aria-label="Instagram">${SOCIAL_ICONS.instagram}</a>
              <a href="https://twitch.tv/" target="_blank" rel="noopener" aria-label="Twitch">${SOCIAL_ICONS.twitch}</a>
              <a href="https://youtube.com/" target="_blank" rel="noopener" aria-label="YouTube">${SOCIAL_ICONS.youtube}</a>
            </div>
          </div>

          <div class="footer__col">
            <h4>Navigate</h4>
            <ul>${navCol}</ul>
          </div>

          <div class="footer__col">
            <h4>Community</h4>
            <ul>${communityCol}</ul>
          </div>

          <div class="footer__col">
            <h4>Legal</h4>
            <ul>${legalCol}</ul>
          </div>

          <div class="footer__col">
            <h4>Server status</h4>
            <div class="footer__status">${servers}</div>
            <p style="font-size:0.78rem;margin:14px 0 0"><a href="status.html" style="color:var(--accent)">View full status page →</a></p>
          </div>
        </div>

        <div class="footer__bottom">
          <span>© <span data-year>2026</span> ${SITE.name} ${SITE.suffix}. Not affiliated with Rockstar Games or Take-Two Interactive.</span>
          <span>Powered by <b style="color:#c9cdd9">Bobony Studios</b></span>
        </div>
      </div>
    </div>`;
}

/* --------------------------------------------------------------- behaviour */

function mountChrome() {
  const headerSlot = document.getElementById("site-header");
  const footerSlot = document.getElementById("site-footer");

  if (headerSlot) headerSlot.outerHTML = renderTicker() + renderHeader();
  if (footerSlot) footerSlot.outerHTML = renderFooter();

  // mobile menu
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("mobile-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }

  // year
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // language switcher (the engine lives in i18n.js)
  document.querySelectorAll(".lang-select").forEach((select) => {
    select.addEventListener("change", () => {
      if (window.I18N) window.I18N.setLang(select.value);
    });
  });
}

function animateCounters() {
  const nodes = document.querySelectorAll("[data-count]");
  const run = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals);
    };
    requestAnimationFrame(step);
  };

  if (!("IntersectionObserver" in window)) {
    nodes.forEach(run);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          run(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  nodes.forEach((n) => io.observe(n));
}

function revealOnScroll() {
  const nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    nodes.forEach((n) => n.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px" }
  );
  nodes.forEach((n) => io.observe(n));
}

let realServerStatus = null;

/* --------------------------------------------------------- live streamers */

const PLATFORM_LABELS = { twitch: "Twitch", youtube: "YouTube", kick: "Kick" };

function streamerIcon(platform) {
  if (platform === "youtube") {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="6" width="19" height="12" rx="3"/><path d="M10 9.5l5 2.5-5 2.5Z"/></svg>';
  }
  if (platform === "kick") {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4v16M5 12l7-7M5 12l7 7M13 4h5l-4 8 4 8h-5"/></svg>';
  }
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v11H4z"/><path d="M10 19h4M8 22h8M8 8.5l5 2-5 2Z"/></svg>';
}

function renderLiveStreamers() {
  const strip = document.getElementById("live-strip");
  if (!strip) return;

  const foot = document.getElementById("live-foot");

  fetch("/api/streamers", { headers: { accept: "application/json" } })
    .then((response) => (response.ok ? response.json() : null))
    .then((data) => {
      if (!data || !Array.isArray(data.streamers)) return;

      const live = data.streamers.filter((streamer) => streamer.live);

      if (!live.length) {
        strip.innerHTML = `
          <div class="live-empty">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="6" width="19" height="12" rx="2.5"/><path d="M8 10.5v3l3-1.5-3-1.5ZM4 4l16 16"/></svg>
            <span>No community streamers are currently live.</span>
          </div>`;
        if (foot) {
          foot.textContent = data.streamers.length
            ? `${data.streamers.length} streamer${data.streamers.length === 1 ? "" : "s"} in the community — they go live most evenings.`
            : "";
        }
        return;
      }

      strip.innerHTML = live
        .map(
          (streamer) => `
          <a class="stream-card" href="${streamer.url}" target="_blank" rel="noopener">
            <span class="stream-card__icon">${streamerIcon(streamer.platform)}</span>
            <span class="stream-card__body">
              <b>${streamer.name}</b>
              <small>${PLATFORM_LABELS[streamer.platform] || streamer.platform}</small>
            </span>
            <span class="live-badge"><span class="dot"></span> Live</span>
          </a>`
        )
        .join("");

      if (foot) foot.textContent = `Watching a streamer? Tell them the city says hello.`;
    })
    .catch(() => {});
}

function liveServerNumbers() {
  const base = SITE.servers[0];
  let online = base.online;

  const paint = () => {
    const value = realServerStatus ? realServerStatus.players : online;
    const capacity = realServerStatus ? realServerStatus.maxPlayers : base.max;

    document.querySelectorAll("[data-live-players]").forEach((el) => {
      el.textContent = value;
    });
    document.querySelectorAll("[data-live-value]").forEach((el) => {
      el.textContent = value;
    });
    document.querySelectorAll("[data-live-capacity]").forEach((el) => {
      el.textContent = `/ ${capacity}`;
    });
    document.querySelectorAll("[data-live-meter]").forEach((el) => {
      el.style.width = `${Math.min((value / capacity) * 100, 100)}%`;
    });

    // Per-server rows (status page), keyed by the Cfx.re server code.
    const live = new Map(((realServerStatus && realServerStatus.servers) || []).map((entry) => [entry.id, entry]));

    SITE.servers.forEach((server) => {
      const entry = live.get(server.id);
      if (entry) {
        server.online = entry.players;
        server.max = entry.maxPlayers;
      }

      const players = entry ? entry.players : server.online;
      const max = entry ? entry.maxPlayers : server.max;

      document.querySelectorAll(`[data-server-players="${server.id}"]`).forEach((el) => {
        el.textContent = players;
      });
      document.querySelectorAll(`[data-server-capacity="${server.id}"]`).forEach((el) => {
        el.textContent = ` / ${max}`;
      });
      document.querySelectorAll(`[data-server-meter="${server.id}"]`).forEach((el) => {
        el.style.width = `${Math.min((players / max) * 100, 100)}%`;
      });
      document.querySelectorAll(`[data-server-pill="${server.id}"]`).forEach((el) => {
        el.innerHTML = `<span class="dot"></span> ${entry ? "Live" : "Online"}`;
      });
      document.querySelectorAll(`[data-server-count="${server.id}"]`).forEach((el) => {
        el.textContent = `${players} / ${max}`;
      });
    });
  };

  paint();

  // Ask the site's own API for the live state of the game server
  // (fed by the Cfx.re server list). Refreshed every minute.
  const loadStatus = () => {
    fetch("/api/status", { headers: { accept: "application/json" }, cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!data || !data.configured || !data.online) return;

        realServerStatus = data;
        SITE.servers[0].online = data.players;
        SITE.servers[0].max = data.maxPlayers;
        paint();

        document.querySelectorAll(".live-card .status-pill").forEach((pill) => {
          pill.innerHTML = '<span class="dot"></span> Live';
        });
      })
      .catch(() => {});
  };

  loadStatus();
  setInterval(loadStatus, 60000);
}

function copyButtons() {
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
        btn.textContent = "Copied";
      } catch {
        btn.textContent = value;
      }
      setTimeout(() => {
        btn.textContent = "Copy";
      }, 1800);
    });
  });
}

/* ------------------------------------------------------- discord sign-in */
/*
   Discord OAuth authentication:
   Matches the dashboard page flow. /api/me returns the authenticated Discord
   account when signed in. /auth/discord initiates the real OAuth2 handshake,
   and /auth/logout ends the session.
*/

const SESSION_KEY = "bcsd_discord_session";
let memorySession = null;
const AUTH = { configured: true, user: null };

function readLocalSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed || memorySession;
  } catch {
    return memorySession;
  }
}

function writeLocalSession(value) {
  memorySession = value;
  try {
    if (value) localStorage.setItem(SESSION_KEY, JSON.stringify(value));
    else localStorage.removeItem(SESSION_KEY);
  } catch {
    /* storage blocked (private mode, embedded preview) — session stays in memory */
  }
}

function avatarUrl(user) {
  if (!user || !user.avatar) return null;
  const extension = String(user.avatar).startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${extension}?size=128`;
}

async function loadAuthState() {
  try {
    const response = await fetch("/api/me", { headers: { accept: "application/json" } });
    if (response.ok) {
      const data = await response.json();
      AUTH.user = data && data.user ? data.user : null;
    } else {
      AUTH.user = null;
    }
  } catch {
    AUTH.user = null;
  }

  // Graceful fallback for local preview if present
  if (!AUTH.user) {
    const local = readLocalSession();
    if (local && local.username) {
      AUTH.user = local;
      AUTH.configured = false;
    } else {
      AUTH.configured = true;
    }
  } else {
    AUTH.configured = true;
  }

  return AUTH;
}

function currentUser() {
  return AUTH.user || readLocalSession();
}

function paintGate() {
  const gate = document.getElementById("auth-gate");
  const wrap = document.getElementById("apply-form-wrap");
  if (!gate || !wrap) return;

  const user = currentUser();
  const signedIn = Boolean(user && user.username);

  gate.hidden = signedIn;
  wrap.hidden = !signedIn;

  if (signedIn) {
    const name = user.displayName || user.username;
    const nameSlot = document.getElementById("auth-username");
    if (nameSlot) nameSlot.textContent = name;

    const handleSlot = document.getElementById("auth-handle");
    if (handleSlot) handleSlot.textContent = user.username ? `@${user.username}` : "";

    const avatarSlot = document.getElementById("auth-avatar");
    if (avatarSlot) {
      const url = avatarUrl(user);
      if (url) {
        avatarSlot.innerHTML = `<img src="${url}" alt="" loading="lazy" referrerpolicy="no-referrer" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
      } else {
        avatarSlot.textContent = (name || "B").slice(0, 1).toUpperCase();
      }
    }

    const discordField = document.getElementById("discord");
    if (discordField) discordField.value = user.username;
  }
}

function showAuthNotice() {
  const code = new URLSearchParams(window.location.search).get("auth");
  if (!code) return;

  const messages = {
    unconfigured: "Discord sign-in is not connected to this site yet.",
    state: "That sign-in link expired or was already used. Please try again.",
    token: "Discord did not accept the sign-in. Please try again.",
    profile: "We could not read your Discord profile. Please try again.",
    denied: "You cancelled the Discord sign-in."
  };

  const text = messages[code];
  if (!text) return;

  const gate = document.getElementById("auth-gate");
  if (!gate) return;

  const notice = document.createElement("p");
  notice.className = "form-note";
  notice.style.color = "var(--danger)";
  notice.style.marginTop = "14px";
  notice.textContent = text;
  gate.appendChild(notice);
}

function wireAuth() {
  document.getElementById("auth-signout")?.addEventListener("click", async () => {
    try {
      await fetch("/auth/logout", { method: "POST" });
    } catch {
      /* ignore */
    }
    writeLocalSession(null);
    AUTH.user = null;
    window.location.assign("/join.html");
  });
}

function allowlistForm() {
  const form = document.getElementById("allowlist-form");
  if (!form) return;

  const flashMessage = (text, ok = true) => {
    const flash = form.querySelector(".form-flash");
    if (!flash) return;
    flash.textContent = text;
    flash.style.borderColor = ok ? "rgba(89, 217, 139, 0.35)" : "rgba(239, 91, 76, 0.4)";
    flash.style.background = ok ? "rgba(89, 217, 139, 0.09)" : "rgba(239, 91, 76, 0.09)";
    flash.style.color = ok ? "#9df0bd" : "#ffb4ab";
    flash.classList.add("is-visible");
    flash.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const user = currentUser();
    if (!user || !user.username) {
      paintGate();
      document.getElementById("discord-login")?.focus();
      return;
    }

    // No Discord app connected: keep the preview honest instead of pretending to save.
    if (!AUTH.configured) {
      flashMessage(`Application received for ${user.username}. This copy of the site is not connected to a database yet, so nothing was saved.`);
      form.reset();
      const field = document.getElementById("discord");
      if (field) field.value = user.username;
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const payload = {
      characterName: form.elements.name.value,
      age: form.elements.age.value,
      language: form.elements.lang.value,
      desiredRole: form.elements.desiredRole ? form.elements.desiredRole.value : "",
      background: form.elements.background.value,
      goals: form.elements.goals.value,
      acceptedRules: Boolean(form.querySelector('input[type="checkbox"]')?.checked)
    };

    const originalLabel = submitButton ? submitButton.textContent : "";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending…";
    }

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        flashMessage(`Application received for ${user.username}. Our staff team reviews every application by hand — expect an answer on Discord within 48 hours.`);
        form.reset();
        const field = document.getElementById("discord");
        if (field) field.value = user.username;
      } else if (response.status === 401) {
        AUTH.user = null;
        paintGate();
        flashMessage("Your Discord session expired. Please sign in again.", false);
      } else if (response.status === 403 && data.error === "pc_failed") {
        flashMessage(
          data.message || "Your PC check did not pass, so a new application cannot be submitted. Open a ticket in Discord if you believe this was a mistake.",
          false
        );
      } else if (response.status === 409) {
        flashMessage("This Discord account has already applied. Check Discord for the decision.", false);
      } else if (response.status === 400) {
        flashMessage("Please check your answers: character name, age (18 or older), a background of at least 80 characters, and the rules checkbox.", false);
      } else {
        flashMessage("Something went wrong on our side. Please try again in a moment.", false);
      }
    } catch {
      flashMessage("We could not reach the server. Check your connection and try again.", false);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalLabel || "Submit application";
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  mountChrome();
  if (window.I18N) window.I18N.init();
  animateCounters();
  revealOnScroll();
  liveServerNumbers();
  renderLiveStreamers();
  copyButtons();

  if (document.getElementById("auth-gate")) {
    await loadAuthState();
    wireAuth();
    paintGate();
    showAuthNotice();
  }

  allowlistForm();
});
