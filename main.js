const lines = [
  "Bubble up!",
  "The tide is in!",
  "Pineapple power!",
  "Ready the nets!",
  "To the reef!"
];

const tips = [
  "Lights on. The treasury lives here.",
  "Door's open. Come in, the water's fine.",
  "Pineapple Pad, est. bubble o'clock."
];

let lineIndex = 0;
let tipIndex = 0;
let audioOn = false;
let audioCtx;

const $ = (sel) => document.querySelector(sel);

function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("on");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("on"), 2400);
}

function blip(freq) {
  if (!audioOn) return;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return;
  audioCtx = audioCtx || new Ctx();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const now = audioCtx.currentTime;
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, now);
  osc.frequency.exponentialRampToValueAtTime(freq * 1.7, now + 0.08);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.07, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(now + 0.2);
}

function spawnBubble() {
  const layer = $("#bubbles");
  const bubble = document.createElement("span");
  bubble.className = "bubble";
  const size = 8 + Math.random() * 28;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${Math.random() * 100}%`;
  bubble.style.animationDuration = `${7 + Math.random() * 9}s`;
  bubble.style.animationDelay = `${-Math.random() * 12}s`;
  bubble.addEventListener("click", () => {
    bubble.classList.add("popped");
    blip(520 + Math.random() * 240);
    setTimeout(() => {
      bubble.remove();
      spawnBubble();
    }, 260);
  });
  layer.appendChild(bubble);
}

function fishSVG(color) {
  return `<svg class="fish-svg" viewBox="0 0 140 70" aria-hidden="true">
    <g class="tail">
      <polygon points="28,35 2,10 6,35 2,60" fill="${color}" stroke="#14324a" stroke-width="3" stroke-linejoin="round"/>
    </g>
    <ellipse cx="82" cy="36" rx="40" ry="20" fill="${color}" stroke="#14324a" stroke-width="3"/>
    <path d="M70 22 Q82 8 96 20" fill="${color}" stroke="#14324a" stroke-width="3"/>
    <ellipse cx="96" cy="30" rx="10" ry="5" fill="rgba(255,255,255,.35)"/>
    <circle cx="104" cy="33" r="5.5" fill="#fff" stroke="#14324a" stroke-width="2"/>
    <circle cx="106" cy="33" r="2.4" fill="#14324a"/>
    <path d="M92 42 Q104 50 116 42" fill="none" stroke="#14324a" stroke-width="2" stroke-linecap="round"/>
  </svg>`;
}

function spawnFish() {
  const layer = $("#fish-layer");
  const colors = ["#ff8a3d", "#ffd23f", "#5ec8ff", "#ff6b9a", "#7dffb3", "#c9a6ff"];
  const fish = document.createElement("div");
  const goLeft = Math.random() > 0.5;
  fish.className = `fish ${goLeft ? "go-left" : "go-right"}`;
  fish.style.top = `${8 + Math.random() * 78}%`;
  fish.style.width = `${64 + Math.random() * 70}px`;
  fish.style.animationDuration = `${14 + Math.random() * 18}s`;
  fish.style.animationDelay = `${-Math.random() * 20}s`;
  fish.innerHTML = fishSVG(colors[Math.floor(Math.random() * colors.length)]);
  layer.appendChild(fish);
}

function jellySVG() {
  return `<svg class="jelly-svg" viewBox="0 0 100 150" aria-hidden="true">
    <path class="tentacle" d="M30 68 C 22 100, 38 110, 26 142" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" opacity=".8"/>
    <path class="tentacle" d="M42 70 C 40 108, 52 112, 44 146" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" style="animation-delay:-.4s"/>
    <path class="tentacle" d="M58 70 C 64 104, 50 116, 60 144" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" style="animation-delay:-.8s"/>
    <path class="tentacle" d="M70 68 C 82 98, 66 118, 78 140" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" style="animation-delay:-1.1s"/>
    <path d="M12 62 Q 12 14 50 12 Q 88 14 88 62 Q 70 48 50 64 Q 30 48 12 62 Z" fill="currentColor" stroke="#14324a" stroke-width="3"/>
    <ellipse cx="34" cy="40" rx="6" ry="8" fill="rgba(255,255,255,.45)"/>
    <ellipse cx="62" cy="46" rx="5" ry="7" fill="rgba(255,255,255,.28)"/>
    <circle cx="40" cy="50" r="3" fill="#14324a"/>
    <circle cx="60" cy="50" r="3" fill="#14324a"/>
    <path d="M44 58 Q50 63 56 58" fill="none" stroke="#14324a" stroke-width="2" stroke-linecap="round"/>
  </svg>`;
}

function spawnJelly() {
  const layer = $("#jelly-layer");
  const colors = ["#ff7ad9", "#c9a6ff", "#7dfff0", "#ffd23f", "#9fd4ff"];
  const jelly = document.createElement("div");
  const far = Math.random() > 0.55;
  jelly.className = `jelly${far ? " far" : ""}`;
  jelly.style.color = colors[Math.floor(Math.random() * colors.length)];
  jelly.style.left = `${Math.random() * 86}%`;
  jelly.style.top = `${6 + Math.random() * 68}%`;
  jelly.style.width = `${far ? 54 : 74 + Math.random() * 48}px`;
  jelly.style.animationDuration = `${5 + Math.random() * 4}s`;
  jelly.style.animationDelay = `${-Math.random() * 5}s`;
  jelly.innerHTML = jellySVG();
  jelly.addEventListener("click", () => {
    jelly.classList.remove("dart");
    void jelly.offsetWidth;
    jelly.classList.add("dart");
    blip(340);
    setTimeout(() => jelly.classList.remove("dart"), 700);
  });
  layer.appendChild(jelly);
}

function spawnPlankton() {
  const layer = $("#plankton");
  for (let i = 0; i < 26; i += 1) {
    const dot = document.createElement("i");
    dot.className = "plank";
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;
    dot.style.animationDuration = `${3 + Math.random() * 5}s`;
    dot.style.animationDelay = `${-Math.random() * 5}s`;
    layer.appendChild(dot);
  }
}

function showSpeech(text) {
  const speech = $("#speech");
  speech.textContent = text;
  speech.classList.remove("show");
  void speech.offsetWidth;
  speech.classList.add("show");
  $("#sponge").setAttribute("aria-label", text);
}

function initScene() {
  const sponge = $("#sponge");
  sponge.addEventListener("click", () => {
    const line = lines[lineIndex % lines.length];
    lineIndex += 1;
    showSpeech(line);
    blip(660);
  });

  const house = $("#pineapple");
  const tip = $("#house-tip");
  house.addEventListener("click", () => {
    const open = house.classList.toggle("open");
    house.setAttribute("aria-pressed", open ? "true" : "false");
    tip.textContent = tips[tipIndex % tips.length];
    tipIndex += 1;
    tip.classList.remove("show");
    void tip.offsetWidth;
    tip.classList.add("show");
    blip(480);
  });

  $("#chest").addEventListener("click", () => {
    const chest = $("#chest");
    chest.classList.remove("burst");
    void chest.offsetWidth;
    chest.classList.add("burst");
    blip(760);
  });
}

function initNav() {
  const header = $(".nav");
  const burger = $(".burger");
  burger.addEventListener("click", () => {
    const open = header.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  header.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  const links = [...document.querySelectorAll(".nav-links a[href^='#']")];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        const on = link.getAttribute("href") === `#${entry.target.id}`;
        if (on) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 });
  sections.forEach((section) => spy.observe(section));
}

function initDepth() {
  const fill = $("#depth-fill");
  const label = $("#depth-label");
  const surface = $("#surface-btn");
  const zones = [
    [0.12, "Surface"],
    [0.3, "Reef"],
    [0.48, "Town"],
    [0.66, "Kelp forest"],
    [0.84, "Jellyfish fields"],
    [1, "The trench"]
  ];

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? window.scrollY / max : 0;
    document.documentElement.style.setProperty("--depth", p.toFixed(3));
    fill.style.height = `${p * 100}%`;
    const zone = zones.find(([edge]) => p <= edge);
    label.textContent = zone ? zone[1] : "The trench";
    surface.classList.toggle("on", p > 0.18);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  surface.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initCa() {
  const button = $("#ca-copy");
  const value = $("#ca-value");
  if (!button || !value) return;
  button.addEventListener("click", async () => {
    const text = value.textContent.trim();
    if (!text || /drops at launch/i.test(text)) {
      toast("The contract address drops at launch.");
      blip(420);
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      toast("Contract copied.");
      blip(660);
    } catch {
      toast("Copy the address from the page.");
    }
  });
}

function initSoon() {
  document.querySelectorAll("[data-soon]").forEach((button) => {
    button.addEventListener("click", () => {
      toast("That reef opens at launch. Bookmark this page.");
      blip(420);
    });
  });
}

function initSound() {
  const button = $("#sound-btn");
  button.addEventListener("click", async () => {
    audioOn = !audioOn;
    button.textContent = audioOn ? "Sound on" : "Sound off";
    button.setAttribute("aria-pressed", audioOn ? "true" : "false");
    if (audioOn && audioCtx && audioCtx.state === "suspended") await audioCtx.resume();
    blip(540);
    toast(audioOn ? "Bubble sounds on." : "Quiet tide.");
  });
}

for (let i = 0; i < 18; i += 1) spawnBubble();
for (let i = 0; i < 7; i += 1) spawnFish();
for (let i = 0; i < 6; i += 1) spawnJelly();
spawnPlankton();
initScene();
initNav();
initDepth();
initCa();
initSoon();
initSound();
