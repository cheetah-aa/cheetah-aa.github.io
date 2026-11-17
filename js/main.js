/* ============================================================
   cheetahh1 portfolio — interactions
   Edit the CONFIG block to personalise without touching the rest.
   ============================================================ */

const CONFIG = {
  name: "Socheata",                  // display name in the hero (full name is in the <title> and footer)
  email: "you@example.com",          // shown in the Contact section
  linkedin: "https://linkedin.com/in/your-handle",
  terminalLines: [
    { type: "cmd", text: "whoami" },
    { type: "out", html: '<span class="g">socheata</span> (cheetahh1) — web dev · SOC lab lead · aspiring <span class="y">DevSecOps</span>' },
    { type: "cmd", text: "cat stack.txt" },
    { type: "out", html: 'TypeScript · Next.js · Python · Solidity · Supabase · Wazuh · Docker' },
    { type: "cmd", text: "wazuh-control status" },
    { type: "out", html: '<span class="g">●</span> wazuh-manager running · 4 SOAR playbooks armed · 0 critical' },
    { type: "cmd", text: "./deploy.sh --env=prod" },
    { type: "out", html: '<span class="g">✔</span> build   <span class="g">✔</span> test   <span class="g">✔</span> security‑scan   <span class="g">✔</span> deploy  <span class="c">🚀</span>' },
    { type: "cmd", text: "echo $NEXT_GOAL" },
    { type: "out", html: '<span class="y">"ship it, secure it, automate it ✨"</span>' },
  ],
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- personalisation ---------- */
document.querySelectorAll("[data-name]").forEach((el) => (el.textContent = CONFIG.name));
// Contact buttons stay hidden until the placeholders above are replaced with real values.
const emailLink = document.querySelector("[data-email]");
if (emailLink) {
  if (CONFIG.email && !CONFIG.email.includes("example.com")) emailLink.href = `mailto:${CONFIG.email}`;
  else emailLink.remove();
}
const liLink = document.querySelector("[data-linkedin]");
if (liLink) {
  if (CONFIG.linkedin && !CONFIG.linkedin.includes("your-handle")) liLink.href = CONFIG.linkedin;
  else liLink.remove();
}
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- theme toggle (barbie <-> hacker) ---------- */
const root = document.documentElement;
const toggle = document.getElementById("themeToggle");
const label = toggle.querySelector(".toggle-label");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  label.textContent = theme === "barbie" ? "barbie mode" : "hacker mode";
  localStorage.setItem("theme", theme);
}
applyTheme(localStorage.getItem("theme") || "barbie");
toggle.addEventListener("click", () => applyTheme(root.dataset.theme === "barbie" ? "hacker" : "barbie"));
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "t" && !e.metaKey && !e.ctrlKey && e.target.tagName !== "INPUT") toggle.click();
});

/* ---------- typed terminal ---------- */
const term = document.getElementById("terminal");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function runTerminal() {
  if (prefersReducedMotion) {
    term.innerHTML = CONFIG.terminalLines
      .map((l) => (l.type === "cmd" ? `<span class="p">$</span> ${l.text}` : l.html))
      .join("\n") + '\n<span class="p">$</span> <span class="cursor"></span>';
    return;
  }
  let buffer = "";
  for (const line of CONFIG.terminalLines) {
    if (line.type === "cmd") {
      buffer += '<span class="p">$</span> ';
      for (const ch of line.text) {
        buffer += ch;
        term.innerHTML = buffer + '<span class="cursor"></span>';
        await sleep(40 + Math.random() * 50);
      }
      await sleep(350);
      buffer += "\n";
    } else {
      buffer += line.html + "\n";
      term.innerHTML = buffer + '<span class="cursor"></span>';
      await sleep(260);
    }
  }
  term.innerHTML = buffer + '<span class="p">$</span> <span class="cursor"></span>';
}
runTerminal();

/* ---------- reveal on scroll ---------- */
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => en.isIntersecting && en.target.classList.add("in-view")),
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in-view"));
}

/* ---------- count-up stats ---------- */
const counters = document.querySelectorAll("[data-count]");
const countIO = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    const el = en.target;
    const target = +el.dataset.count;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / 900, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countIO.unobserve(el);
  });
});
counters.forEach((c) => countIO.observe(c));

/* ---------- background sparkle field ---------- */
const canvas = document.getElementById("sparkles");
const ctx = canvas.getContext("2d");
let W, H, stars = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  const n = Math.min(140, Math.floor((W * H) / 14000));
  stars = Array.from({ length: n }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.8 + .4,
    s: Math.random() * .4 + .1,
    t: Math.random() * Math.PI * 2,
    alt: Math.random() > .7,
  }));
}
function cssVar(name) { return getComputedStyle(root).getPropertyValue(name).trim(); }

function drawStar(x, y, r, a, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = a;
  ctx.fillStyle = `rgb(${color})`;
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const rad = i % 2 ? r * .35 : r * 1.6;
    const ang = (i * Math.PI) / 4;
    ctx.lineTo(Math.cos(ang) * rad, Math.sin(ang) * rad);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function frame() {
  ctx.clearRect(0, 0, W, H);
  const c1 = cssVar("--sparkle"), c2 = cssVar("--sparkle-2");
  for (const st of stars) {
    st.t += .02;
    st.y -= st.s;
    if (st.y < -10) { st.y = H + 10; st.x = Math.random() * W; }
    const a = (Math.sin(st.t) + 1) / 2 * .8 + .1;
    drawStar(st.x, st.y, st.r, a, st.alt ? c2 : c1);
  }
  requestAnimationFrame(frame);
}
resize();
window.addEventListener("resize", resize);
if (!prefersReducedMotion) frame(); else { ctx.clearRect(0, 0, W, H); }

/* ---------- cursor sparkle trail ---------- */
if (!prefersReducedMotion && matchMedia("(pointer: fine)").matches) {
  let last = 0;
  window.addEventListener("pointermove", (e) => {
    const now = performance.now();
    if (now - last < 45) return;
    last = now;
    const s = document.createElement("span");
    s.className = "spark";
    s.style.left = e.clientX - 5 + "px";
    s.style.top = e.clientY - 5 + "px";
    s.style.setProperty("--dx", (Math.random() - .5) * 60 + "px");
    s.style.setProperty("--dy", (Math.random() - .5) * 60 + "px");
    s.style.background = Math.random() > .5 ? "var(--gold)" : "var(--pink)";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 700);
  });
}

/* ---------- card tilt ---------- */
if (!prefersReducedMotion && matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });
    card.addEventListener("pointerleave", () => (card.style.transform = ""));
  });
}
