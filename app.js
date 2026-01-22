// StoryBook — ¡Es varón!
// App 100% front-end. Ideal para GitHub Pages.

const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

const state = {
  idx: 0,
  muted: true,
  settings: {
    finalTitle: "ES VARON",
    finalSubtitle: "Felipe Fidel se esta preparando para empaparse de amor.\nGracias por acopañarnos en esta aventura.",
    finalDate: ""
  }
};

const STORE_KEY = "storybook-bebe-varon:v1";

function loadSettings(){
  try{
    const raw = localStorage.getItem(STORE_KEY);
    if(!raw) return;
    const s = JSON.parse(raw);
    if(s && s.settings){
      state.settings = { ...state.settings, ...s.settings };
    }
    if(typeof s.muted === "boolean") state.muted = s.muted;
  }catch(e){}
}
function saveSettings(){
  try{
    localStorage.setItem(STORE_KEY, JSON.stringify({
      settings: state.settings,
      muted: state.muted
    }));
  }catch(e){}
}

function playTone(freq=660, dur=0.09, type="sine", vol=0.05){
  if(state.muted) return;
  const ctx = playTone._ctx ?? (playTone._ctx = new (window.AudioContext || window.webkitAudioContext)());
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.value = vol;
  o.connect(g);
  g.connect(ctx.destination);
  o.start();
  o.stop(ctx.currentTime + dur);
}

function softClick(){
  playTone(520, 0.06, "triangle", 0.045);
  setTimeout(() => playTone(760, 0.05, "triangle", 0.035), 55);
}

function buildScreens(){
  // Ilustraciones minimalistas (SVG) en tonos cremitas
  const svgs = {
    moon:
`<svg viewBox="0 0 520 420" role="img" aria-label="Noche suave">
  <defs>
    <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#d7c6a3" stop-opacity="0.95"/>
      <stop offset="1" stop-color="#c9a56a" stop-opacity="0.95"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="520" height="420" rx="26" fill="rgba(255,250,240,0.0)"/>
  <g class="wiggle">
    <circle cx="392" cy="108" r="62" fill="url(#g1)" opacity="0.85"/>
    <circle cx="412" cy="95" r="54" fill="rgba(255,250,240,0.75)"/>
  </g>
  <g opacity="0.55">
    ${Array.from({length:18}).map((_,i)=>{
      const x = 35 + (i*27)%480;
      const y = 44 + ((i*53)%320);
      const r = 2 + (i%3);
      return `<circle cx="${x}" cy="${y}" r="${r}" fill="rgba(44,42,38,0.35)"/>`;
    }).join("")}
  </g>
  <g class="bounce" style="animation-duration:2.1s">
    <path d="M110 305c55-92 125-122 194-126 76-5 132 32 190 110"
      fill="none" stroke="rgba(201,165,106,0.35)" stroke-width="14" stroke-linecap="round"/>
  </g>
  <g opacity="0.9">
    <path d="M78 330c64-44 130-64 202-66 73-2 146 15 221 39 28 9 49 27 61 53 8 17 3 37-10 49-18 15-45 17-65 5-78-44-133-61-200-64-52-2-105 8-160 36-27 14-53 7-63-11-10-19-4-43 14-55z"
      fill="rgba(255,250,240,0.62)" stroke="rgba(227,214,193,0.95)" stroke-width="2"/>
  </g>
</svg>`,

    heart:
`<svg viewBox="0 0 520 420" role="img" aria-label="Corazón minimal">
  <defs>
    <linearGradient id="hb" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#d7c6a3"/>
      <stop offset="1" stop-color="#c9a56a"/>
    </linearGradient>
  </defs>
  <g class="bounce" style="animation-duration:2.0s">
    <path d="M260 346s-134-74-174-162c-28-64 12-126 76-126 41 0 74 22 98 54 24-32 57-54 98-54 64 0 104 62 76 126-40 88-174 162-174 162z"
      fill="url(#hb)" opacity="0.85" stroke="rgba(44,42,38,0.10)" stroke-width="2"/>
  </g>
  <g opacity="0.45">
    ${Array.from({length:8}).map((_,i)=>{
      const x = 70 + i*55;
      const y = 65 + (i%2)*28;
      return `<circle cx="${x}" cy="${y}" r="${3+(i%2)}" fill="rgba(44,42,38,0.25)"/>`;
    }).join("")}
  </g>
</svg>`,

    box:
`<svg viewBox="0 0 520 420" role="img" aria-label="Caja sorpresa minimal">
  <defs>
    <linearGradient id="b1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#c9a56a"/>
      <stop offset="1" stop-color="#d7c6a3"/>
    </linearGradient>
  </defs>
  <g class="pop">
    <rect x="120" y="170" width="280" height="190" rx="28"
      fill="rgba(255,250,240,0.75)" stroke="rgba(227,214,193,0.95)" stroke-width="2"/>
    <rect x="110" y="150" width="300" height="66" rx="22"
      fill="rgba(255,250,240,0.92)" stroke="rgba(227,214,193,0.95)" stroke-width="2"/>
    <rect x="248" y="150" width="26" height="210" rx="13" fill="url(#b1)" opacity="0.75"/>
    <rect x="110" y="178" width="300" height="26" rx="13" fill="url(#b1)" opacity="0.62"/>
    <g class="wiggle" style="transform-origin:260px 150px; animation-duration:2.0s">
      <path d="M260 148c-18-30-50-44-78-35-26 9-38 34-23 56 17 25 58 22 101-21z"
        fill="rgba(201,165,106,0.55)" />
      <path d="M260 148c18-30 50-44 78-35 26 9 38 34 23 56-17 25-58 22-101-21z"
        fill="rgba(215,198,163,0.55)" />
      <circle cx="260" cy="150" r="16" fill="rgba(255,250,240,0.95)" stroke="rgba(44,42,38,0.08)" stroke-width="2"/>
    </g>
  </g>
  <g opacity="0.45">
    ${Array.from({length:10}).map((_,i)=>{
      const x = 70 + (i*41)%380;
      const y = 44 + ((i*67)%120);
      return `<circle cx="${x}" cy="${y}" r="${2+(i%2)}" fill="rgba(44,42,38,0.22)"/>`;
    }).join("")}
  </g>
</svg>`,

    teddy:
`<svg viewBox="0 0 520 420" role="img" aria-label="Osito minimalista">
  <defs>
    <linearGradient id="tb" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#e7dcc8"/>
      <stop offset="1" stop-color="#d7c6a3"/>
    </linearGradient>
    <linearGradient id="tb2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#c9a56a"/>
      <stop offset="1" stop-color="#b88d4a"/>
    </linearGradient>
  </defs>

  <g class="bounce" style="animation-duration:2.2s">
    <!-- ears -->
    <circle cx="190" cy="130" r="42" fill="url(#tb)" stroke="rgba(44,42,38,0.10)" stroke-width="2"/>
    <circle cx="330" cy="130" r="42" fill="url(#tb)" stroke="rgba(44,42,38,0.10)" stroke-width="2"/>
    <circle cx="190" cy="130" r="22" fill="rgba(255,250,240,0.9)"/>
    <circle cx="330" cy="130" r="22" fill="rgba(255,250,240,0.9)"/>

    <!-- head -->
    <circle cx="260" cy="190" r="110" fill="url(#tb)" stroke="rgba(44,42,38,0.10)" stroke-width="2"/>
    <!-- muzzle -->
    <ellipse cx="260" cy="230" rx="78" ry="58" fill="rgba(255,250,240,0.92)" stroke="rgba(44,42,38,0.08)" stroke-width="2"/>
    <!-- nose -->
    <path d="M260 230c-12-10-26-14-40-10 8 18 22 26 40 26s32-8 40-26c-14-4-28 0-40 10z"
      fill="url(#tb2)" opacity="0.9"/>
    <!-- eyes -->
    <circle cx="220" cy="190" r="8" fill="rgba(44,42,38,0.75)"/>
    <circle cx="300" cy="190" r="8" fill="rgba(44,42,38,0.75)"/>
    <!-- smile -->
    <path d="M240 258c10 10 30 10 40 0" fill="none" stroke="rgba(44,42,38,0.45)" stroke-width="5" stroke-linecap="round"/>
  </g>

  <g opacity="0.35">
    ${Array.from({length:12}).map((_,i)=>{
      const a = (i/12) * Math.PI*2;
      const x = 260 + Math.cos(a)*175;
      const y = 210 + Math.sin(a)*130;
      return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${2+(i%2)}" fill="rgba(44,42,38,0.22)"/>`;
    }).join("")}
  </g>
</svg>`
  };

  const screens = [
    {
      kicker: "Capítulo 1",
      title: "Érase una vez…\nuna noticia chiquita,\npero gigante ✨",
      text: "Hay un nuevo latidito en camino. Y antes de decirte el final, queremos contarte una mini historia.",
      chips: [
        {icon:"sparkles", text:"Avanzá con →"},
        {icon:"moon", text:"Modo cuento"},
      ],
      svg: svgs.moon,
      ribbon: "Pista: hay una sorpresa…"
    },
    {
      kicker: "Capítulo 2",
      title: "Un corazón\ncon ganas de aventura",
      text: "Entre sueños y abrazos, empezamos a imaginar cómo será esta nueva personita.",
      chips: [
        {icon:"heart", text:"Mucho amor"},
        {icon:"steps", text:"Pasitos en camino"},
      ],
      svg: svgs.heart,
      ribbon: "Spoiler: va a haber muchas carcajadas."
    },
    {
      kicker: "Capítulo 3",
      title: "Una cajita\nllena de secretos",
      text: "Guardamos la gran noticia como un tesoro. ¿Listos para abrirla?",
      chips: [
        {icon:"gift", text:"Sorpresa"},
        {icon:"magic", text:"Toque de magia"},
      ],
      svg: svgs.box,
      ribbon: "Cuando digas ‘ya’, abrimos ✨"
    },
    {
      kicker: "Final",
      title: "ES VARON",
      text: "Felipe Fidel se esta preparando para empaparse de amor.\nGracias por acompañarnos en esta aventura.",
      chips: [
        {icon:"party", text:"¡Felicidad total!"},
        {icon:"share", text:"Compartilo"},
      ],
      svg: svgs.teddy,
      ribbon: "Tocá ‘Celebrar’ para tirar confeti ✨"
    },
  ];

  return screens;
}

function iconSvg(name){
  const common = `width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"`;
  switch(name){
    case "sparkles":
      return `<svg ${common}><path d="M12 2l1.2 4.2L17.5 8l-4.3 1.8L12 14l-1.2-4.2L6.5 8l4.3-1.8L12 2z" fill="currentColor"/></svg>`;
    case "moon":
      return `<svg ${common}><path d="M21 14.5A7.5 7.5 0 019.5 3a6.5 6.5 0 108.9 11.5z" fill="currentColor"/></svg>`;
    case "heart":
      return `<svg ${common}><path d="M12 21s-7-4.4-9.3-9.2C1 8.1 3.6 5 7 5c2 0 3.7 1 5 2.6C13.3 6 15 5 17 5c3.4 0 6 3.1 4.3 6.8C19 16.6 12 21 12 21z" fill="currentColor"/></svg>`;
    case "steps":
      return `<svg ${common}><path d="M7 14c2 0 3-2 3-4S9 6 7 6 4 8 4 10s1 4 3 4zm10 8c2 0 3-2 3-4s-1-4-3-4-3 2-3 4 1 4 3 4z" fill="currentColor" opacity=".9"/></svg>`;
    case "gift":
      return `<svg ${common}><path d="M20 8h-2.2A3 3 0 0015 4c-1.1 0-2 .5-3 1.4C11 4.5 10.1 4 9 4a3 3 0 00-2.8 4H4v4h16V8zm-9-1.2C10.2 6 9.6 5.5 9 5.5A1.5 1.5 0 009 8h2V6.8zM15 8a1.5 1.5 0 100-3c-.6 0-1.2.5-2 1.3V8h2zM4 14h9v8H6a2 2 0 01-2-2v-6zm11 0h5v6a2 2 0 01-2 2h-3v-8z" fill="currentColor"/></svg>`;
    case "magic":
      return `<svg ${common}><path d="M3 21l9-9 3 3-9 9H3v-3zM14 5l5 5-2 2-5-5 2-2z" fill="currentColor"/></svg>`;
    case "cloud":
      return `<svg ${common}><path d="M7 18h10a4 4 0 000-8 5 5 0 00-9.7-1.3A3.5 3.5 0 007 18z" fill="currentColor"/></svg>`;
    case "star":
      return `<svg ${common}><path d="M12 2l3 7 7 .6-5.3 4.6 1.7 7L12 18l-6.4 3.2 1.7-7L2 9.6 9 9l3-7z" fill="currentColor"/></svg>`;
    case "party":
      return `<svg ${common}><path d="M4 15l8-11 8 11-8 4-8-4zm2 6h12v2H6v-2z" fill="currentColor"/></svg>`;
    case "share":
      return `<svg ${common}><path d="M18 8a3 3 0 10-2.83-4H15a3 3 0 00.17 1L8.7 9.1a3 3 0 00-1.7-.6 3 3 0 100 6c.62 0 1.2-.2 1.7-.55l6.5 4.02A3 3 0 1016 18a2.98 2.98 0 00.17 1L9.66 15A3.03 3.03 0 0010 13.5a3.03 3.03 0 00-.34-1.4l6.52-4.04A3 3 0 0018 8z" fill="currentColor"/></svg>`;
    default:
      return `<svg ${common}><circle cx="12" cy="12" r="9" fill="currentColor" opacity=".6"/></svg>`;
  }
}

const screens = buildScreens();

function renderDots(){
  const dots = $("#dots");
  dots.innerHTML = "";
  screens.forEach((_,i)=>{
    const d = document.createElement("span");
    d.className = "dot" + (i===state.idx ? " active" : "");
    d.addEventListener("click", () => goto(i));
    dots.appendChild(d);
  });
}

function screenTemplate(s, dir=1){
  const title = (typeof s.title === "function") ? s.title() : s.title;
  const text  = (typeof s.text  === "function") ? s.text()  : s.text;

  const kicker = s.kicker ?? "";
  const chips = (s.chips ?? []).map(c =>
    `<span class="chip">${iconSvg(c.icon)}<span>${escapeHtml(c.text)}</span></span>`
  ).join("");

  return `
    <div class="screen">
      <div class="copy ${dir>0 ? "slideInLeft" : "slideInRight"}">
        <div class="kicker"><span class="spark"></span>${escapeHtml(kicker)}</div>
        <h1 class="fade">${escapeHtml(title).replace(/\n/g,"<br/>")}</h1>
        <p class="big fade" style="animation-delay:80ms">${escapeHtml(text).replace(/\n/g,"<br/>")}</p>
        <div class="chip-row fade" style="animation-delay:120ms">${chips}</div>
      </div>

      <div class="illus ${dir>0 ? "slideInRight" : "slideInLeft"}">
        ${s.svg}
        <div class="ribbon">${escapeHtml(s.ribbon || "")}</div>
      </div>
    </div>
  `;
}

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function setButtons(){
  $("#backBtn").disabled = (state.idx === 0);
  $("#nextBtn").textContent = (state.idx === screens.length-1) ? "Celebrar 🎉" : "Siguiente";
}

function render(dir=1){
  const card = $("#card");
  card.innerHTML = screenTemplate(screens[state.idx], dir);
  renderDots();
  setButtons();
}

function goto(i, dir=1){
  if(i<0 || i>=screens.length) return;
  state.idx = i;
  softClick();
  render(dir);
  if(state.idx === screens.length-1){
    // subtle pre-confetti
    burst(0.12);
  }
}

function next(){
  if(state.idx < screens.length-1){
    goto(state.idx+1, 1);
  }else{
    // end: full celebration
    burst(1);
    playFanfare();
  }
}

function back(){
  if(state.idx > 0) goto(state.idx-1, -1);
}

function playFanfare(){
  if(state.muted) return;
  const notes = [523, 659, 784, 988];
  notes.forEach((f, i)=> setTimeout(()=>playTone(f, 0.09, "sine", 0.05), i*90));
  setTimeout(()=>playTone(784, 0.16, "triangle", 0.05), 420);
}

/* Confetti */
const confetti = {
  canvas: null,
  ctx: null,
  W: 0,
  H: 0,
  pieces: [],
  running: false,
  t0: 0
};

function resizeCanvas(){
  confetti.canvas = confetti.canvas || $("#confetti");
  confetti.ctx = confetti.ctx || confetti.canvas.getContext("2d");
  confetti.W = confetti.canvas.width = window.innerWidth * devicePixelRatio;
  confetti.H = confetti.canvas.height = window.innerHeight * devicePixelRatio;
  confetti.canvas.style.width = window.innerWidth + "px";
  confetti.canvas.style.height = window.innerHeight + "px";
}

function makePiece(power=1){
  const W = confetti.W, H = confetti.H;
  const x = (Math.random() * W);
  const y = (-20 - Math.random()*H*0.1);
  const size = (6 + Math.random()*10) * devicePixelRatio * (0.8 + power*0.45);
  const vx = (-1 + Math.random()*2) * devicePixelRatio * (1.8 + power*3.2);
  const vy = (2 + Math.random()*4) * devicePixelRatio * (2.2 + power*3.2);
  const rot = Math.random()*Math.PI*2;
  const vr = (-0.2 + Math.random()*0.4) * (1.2 + power*2.2);
  // We avoid fixed colors in CSS, but for confetti we need some color variety:
  const palette = ["#fffaf0","#efe6d6","#e7dcc8","#d7c6a3","#c9a56a"];
  const color = palette[(Math.random()*palette.length)|0];
  return {x,y,size,vx,vy,rot,vr,color,life: 0,ttl: 240 + Math.random()*120};
}

function burst(power=1){
  resizeCanvas();
  const amount = Math.floor(36 + power*140);
  for(let i=0;i<amount;i++) confetti.pieces.push(makePiece(power));
  if(!confetti.running){
    confetti.running = true;
    confetti.t0 = performance.now();
    requestAnimationFrame(tick);
  }
}

function tick(t){
  const dt = Math.min(32, t - confetti.t0);
  confetti.t0 = t;
  const ctx = confetti.ctx;
  ctx.clearRect(0,0,confetti.W, confetti.H);

  confetti.pieces = confetti.pieces.filter(p => p.life < p.ttl && p.y < confetti.H + 60*devicePixelRatio);

  for(const p of confetti.pieces){
    p.life += dt/16;
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.07 * devicePixelRatio; // gravity
    p.vx *= 0.995;
    p.rot += p.vr * 0.03;

    const alpha = Math.max(0, Math.min(1, (p.ttl - p.life) / 60));
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6);
    ctx.restore();
  }

  if(confetti.pieces.length){
    requestAnimationFrame(tick);
  }else{
    confetti.running = false;
    ctx.clearRect(0,0,confetti.W, confetti.H);
  }
}

/* Share */
async function share(){
  softClick();
  const url = location.href;
  const data = {
    title: "StoryBook — ES VARON",
    text: "Mirá el StoryBook (anuncio):",
    url
  };

  try{
    if(navigator.share){
      await navigator.share(data);
    }else{
      await navigator.clipboard.writeText(url);
      toast("Link copiado ✅");
    }
  }catch(e){
    // user canceled; ignore
  }
}

/* Toast (simple) */
let toastEl = null;
let toastTimer = null;
function toast(msg){
  if(!toastEl){
    toastEl = document.createElement("div");
    toastEl.style.position="fixed";
    toastEl.style.left="50%";
    toastEl.style.bottom="84px";
    toastEl.style.transform="translateX(-50%)";
    toastEl.style.padding="12px 14px";
    toastEl.style.borderRadius="16px";
    toastEl.style.border="1px solid rgba(255,255,255,.16)";
    toastEl.style.background="rgba(0,0,0,.28)";
    toastEl.style.backdropFilter="blur(10px)";
    toastEl.style.boxShadow="0 16px 50px rgba(0,0,0,.45)";
    toastEl.style.fontWeight="800";
    toastEl.style.zIndex="60";
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = msg;
  toastEl.style.opacity="0";
  toastEl.style.transition="opacity .18s ease";
  requestAnimationFrame(()=> toastEl.style.opacity="1");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> toastEl.style.opacity="0", 1400);
}

/* Settings modal */
function openSettings(){
  softClick();
  const m = $("#settingsModal");
  $("#finalTitle").value = state.settings.finalTitle;
  $("#finalSubtitle").value = state.settings.finalSubtitle;
  $("#finalDate").value = state.settings.finalDate;
  m.showModal();
}
function hookSettings(){
  $("#saveSettings").addEventListener("click", ()=>{
    state.settings.finalTitle = $("#finalTitle").value.trim() || "¡Es varón! 💙";
    state.settings.finalSubtitle = $("#finalSubtitle").value.trim() || "Gracias por acompañarnos en esta aventura";
    state.settings.finalDate = $("#finalDate").value.trim();
    saveSettings();
    render(1);
    burst(0.25);
  });
}

/* Sound toggle */
function setSoundIcon(){
  const btn = $("#soundBtn");
  btn.style.opacity = state.muted ? ".75" : "1";
  btn.title = state.muted ? "Activar sonido" : "Silenciar";
}
function toggleSound(){
  state.muted = !state.muted;
  saveSettings();
  setSoundIcon();
  toast(state.muted ? "Sonido: OFF" : "Sonido: ON");
  if(!state.muted) softClick();
}

/* Keyboard */
function hookKeys(){
  window.addEventListener("keydown", (e)=>{
    if(e.key === "ArrowRight" || e.key === " "){
      e.preventDefault(); next();
    }
    if(e.key === "ArrowLeft"){
      e.preventDefault(); back();
    }
    if(e.key.toLowerCase() === "s"){
      toggleSound();
    }
  }, {passive:false});
}

function init(){
  loadSettings();
  render(1);
  renderDots();
  setButtons();
  setSoundIcon();
  resizeCanvas();

  $("#nextBtn").addEventListener("click", next);
  $("#backBtn").addEventListener("click", back);
  $("#shareBtn").addEventListener("click", share);
  $("#settingsBtn").addEventListener("click", openSettings);
  $("#soundBtn").addEventListener("click", toggleSound);

  hookSettings();
  hookKeys();

  window.addEventListener("resize", resizeCanvas);

  // little intro sparkle
  setTimeout(()=>burst(0.15), 500);
}

init();
