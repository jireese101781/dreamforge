const STYLE_ID = "dreamforge-story-creator-polish"
const POLISH_ID = "dreamforge-polish-mounted"
const META_KEY = "dreamforge_story_creator_meta_v2"

function readMeta() {
  try { return JSON.parse(localStorage.getItem(META_KEY) || "{}") } catch { return {} }
}

function writeMeta(patch) {
  const current = readMeta()
  localStorage.setItem(META_KEY, JSON.stringify({ ...current, ...patch, savedAt: Date.now() }))
}

function valueOf(labelText) {
  const form = document.querySelector(".story-creator-form")
  if (!form) return ""
  const labels = [...form.querySelectorAll(":scope > label, .dfc-field > label")]
  const label = labels.find(l => l.textContent.replace("★", "").trim() === labelText)
  const control = label?.parentElement?.querySelector("input, textarea, select") || label?.nextElementSibling
  return control && typeof control.value === "string" ? control.value.trim() : ""
}

function currentCover() {
  const input = document.querySelector(".story-creator-form .story-cover-upload input[type=file]")
  const preview = document.querySelector(".story-creator-form .story-cover-preview")
  return preview?.src || input?.files?.[0]?.name || ""
}

function installStyles() {
  if (document.getElementById(STYLE_ID)) return
  const style = document.createElement("style")
  style.id = STYLE_ID
  style.textContent = `
    .dfp-toolbar{display:flex;flex-wrap:wrap;gap:9px;align-items:center;margin:0 0 16px}
    .dfp-action{border:1px solid rgba(139,92,246,.38);background:linear-gradient(135deg,rgba(139,92,246,.16),rgba(79,140,255,.08));color:#f4f1ff;border-radius:11px;padding:10px 14px;font-weight:800;cursor:pointer;transition:.18s ease}
    .dfp-action:hover{transform:translateY(-1px);border-color:rgba(167,139,250,.75);box-shadow:0 8px 25px rgba(139,92,246,.14)}
    .dfp-status{margin-left:auto;color:#85899a;font-size:12px;display:flex;align-items:center;gap:7px}
    .dfp-status-dot{width:7px;height:7px;border-radius:50%;background:#a78bfa;box-shadow:0 0 9px rgba(167,139,250,.75)}
    .dfp-overlay{position:fixed;inset:0;z-index:1000;background:rgba(3,4,8,.78);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;padding:24px}
    .dfp-modal{width:min(1100px,96vw);max-height:92vh;overflow:auto;background:#0d0f16;border:1px solid rgba(139,92,246,.35);border-radius:22px;box-shadow:0 30px 100px rgba(0,0,0,.65),0 0 55px rgba(139,92,246,.1);padding:24px}
    .dfp-modal-head{display:flex;justify-content:space-between;gap:16px;align-items:flex-start;margin-bottom:20px}
    .dfp-modal-head h2{margin:0 0 5px;font-size:25px}.dfp-muted{color:#9295a5;font-size:13px}
    .dfp-close{border:0;background:rgba(255,255,255,.07);color:#fff;border-radius:9px;padding:8px 11px;cursor:pointer;font-size:16px}
    .dfp-preview-grid{display:grid;grid-template-columns:280px 1fr;gap:22px}
    .dfp-preview-cover{width:100%;aspect-ratio:1024/1535;object-fit:cover;border-radius:14px;background:linear-gradient(145deg,#252938,#12141d);border:1px solid rgba(255,255,255,.08)}
    .dfp-preview-cover.empty{display:flex;align-items:center;justify-content:center;color:#707487;font-size:42px}
    .dfp-pill-row{display:flex;flex-wrap:wrap;gap:7px;margin:10px 0 16px}.dfp-pill{padding:5px 9px;border-radius:999px;background:rgba(139,92,246,.12);border:1px solid rgba(139,92,246,.2);color:#cfc7ef;font-size:12px}
    .dfp-preview-section{border-top:1px solid rgba(255,255,255,.07);padding-top:16px;margin-top:16px}.dfp-preview-section h3{margin:0 0 7px}.dfp-preview-section p{white-space:pre-wrap;color:#c5c7d2;line-height:1.65;margin:0}
    .dfp-context{font-family:ui-monospace,SFMono-Regular,Consolas,monospace;background:#08090d;border:1px solid rgba(255,255,255,.07);border-radius:13px;padding:15px;white-space:pre-wrap;color:#bdb6d9;line-height:1.55;font-size:12px;max-height:55vh;overflow:auto}
    .dfp-toast{position:fixed;right:22px;bottom:85px;z-index:1100;background:#151722;border:1px solid rgba(139,92,246,.4);box-shadow:0 15px 45px rgba(0,0,0,.45);padding:11px 14px;border-radius:11px;color:#eee;animation:dfpIn .18s ease}
    @keyframes dfpIn{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}
    @media(max-width:760px){.dfp-preview-grid{grid-template-columns:1fr}.dfp-preview-cover{width:180px}.dfp-status{width:100%;margin-left:0}.dfp-overlay{padding:10px}.dfp-modal{padding:16px}}
  `
  document.head.appendChild(style)
}

function toast(message) {
  document.querySelector(".dfp-toast")?.remove()
  const el = document.createElement("div")
  el.className = "dfp-toast"
  el.textContent = message
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 1800)
}

function getStoryData() {
  const meta = readMeta()
  const title = valueOf("Story Name") || "Untitled Story"
  const description = valueOf("Story Description")
  const genre = valueOf("Genre")
  const oneLine = meta.oneLine || valueOf("One-Line Introduction")
  const prompt = meta.prompt || valueOf("Main Story Prompt")
  const details = meta.details || valueOf("Story Details")
  const prologue = valueOf("Prologue / Opening Scene")
  const rules = valueOf("Core AI Rules")
  const world = valueOf("World / Setting")
  const tone = valueOf("Tone / Style")
  return { title, description, genre, oneLine, prompt, details, prologue, rules, world, tone, cover: currentCover(), meta }
}

function showPreview() {
  const data = getStoryData()
  const overlay = document.createElement("div")
  overlay.className = "dfp-overlay"
  const modal = document.createElement("div")
  modal.className = "dfp-modal"
  const cover = data.cover
    ? `<img class="dfp-preview-cover" src="${data.cover}" alt="Story cover preview" />`
    : `<div class="dfp-preview-cover empty">📖</div>`
  modal.innerHTML = `
    <div class="dfp-modal-head">
      <div><h2>👁 Story Preview</h2><div class="dfp-muted">This is the player-facing preview of your current story.</div></div>
      <button class="dfp-close" type="button">✕</button>
    </div>
    <div class="dfp-preview-grid">
      <div>${cover}</div>
      <div>
        <h1 style="margin:0 0 6px">${escapeHtml(data.title)}</h1>
        <div class="dfp-muted">${escapeHtml(data.oneLine || "No one-line introduction yet.")}</div>
        <div class="dfp-pill-row">
          ${data.genre ? `<span class="dfp-pill">${escapeHtml(data.genre)}</span>` : ""}
          <span class="dfp-pill">🤖 AI Interactive</span>
          <span class="dfp-pill">🎮 Playable</span>
        </div>
        ${previewSection("About the Story", data.description || data.details || "No description yet.")}
        ${previewSection("World", data.world || "No world/setting information yet.")}
        ${previewSection("Opening", data.prologue || "No prologue yet.")}
      </div>
    </div>`
  overlay.appendChild(modal)
  document.body.appendChild(overlay)
  const close = () => overlay.remove()
  modal.querySelector(".dfp-close").onclick = close
  overlay.addEventListener("click", e => { if (e.target === overlay) close() })
  document.addEventListener("keydown", function esc(e){ if(e.key === "Escape"){close();document.removeEventListener("keydown",esc)} })
}

function previewSection(title, text) {
  return `<div class="dfp-preview-section"><h3>${title}</h3><p>${escapeHtml(text)}</p></div>`
}

function escapeHtml(text) {
  return String(text || "").replace(/[&<>\"]/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[ch]))
}

function showContext() {
  const d = getStoryData()
  const meta = d.meta
  const context = [
    "=== DREAMFORGE AI STORY CONTEXT ===",
    `STORY: ${d.title}`,
    `GENRE: ${d.genre || "Not specified"}`,
    `TONE: ${d.tone || "Not specified"}`,
    "",
    "WORLD / SETTING",
    d.world || "(none)",
    "",
    "STORY DETAILS",
    d.details || "(none)",
    "",
    "MAIN STORY PROMPT",
    d.prompt || "(none)",
    "",
    "PROLOGUE",
    d.prologue || "(none)",
    "",
    "CORE AI RULES",
    d.rules || "(none)",
    "",
    `CUSTOM STATS: ${JSON.stringify(meta.stats || [], null, 2)}`,
    `STORY CHARACTERS: ${JSON.stringify(meta.characters || [], null, 2)}`,
    `SLASH COMMANDS: ${JSON.stringify(meta.commands || [], null, 2)}`,
    `ENDINGS: ${JSON.stringify(meta.endings || [], null, 2)}`,
    "",
    "PLAYER CHARACTER: supplied at play time by the user's equipped character",
    "CURRENT SCENE: supplied by the game engine",
    "STORY MEMORY: supplied by the game engine"
  ].join("\n")

  const overlay = document.createElement("div")
  overlay.className = "dfp-overlay"
  const modal = document.createElement("div")
  modal.className = "dfp-modal"
  modal.innerHTML = `<div class="dfp-modal-head"><div><h2>🤖 AI Context Preview</h2><div class="dfp-muted">The structured context Dreamforge is preparing for the story engine.</div></div><button class="dfp-close" type="button">✕</button></div><div class="dfp-context"></div>`
  modal.querySelector(".dfp-context").textContent = context
  overlay.appendChild(modal);document.body.appendChild(overlay)
  const close=()=>overlay.remove();modal.querySelector(".dfp-close").onclick=close;overlay.onclick=e=>{if(e.target===overlay)close()}
}

function mount(root) {
  if (root.dataset[POLISH_ID]) return
  root.dataset[POLISH_ID] = "1"
  installStyles()
  const top = root.querySelector(".dfc-top")
  if (!top) return

  const toolbar = document.createElement("div")
  toolbar.className = "dfp-toolbar"
  const preview = document.createElement("button")
  preview.className = "dfp-action"; preview.type="button"; preview.textContent="👁 Preview Story"; preview.onclick=showPreview
  const context = document.createElement("button")
  context.className = "dfp-action"; context.type="button"; context.textContent="🤖 AI Context"; context.onclick=showContext
  const status = document.createElement("div")
  status.className="dfp-status";status.innerHTML='<span class="dfp-status-dot"></span><span class="dfp-status-text">Autosave ready</span>'
  toolbar.append(preview,context,status)
  top.parentElement.insertBefore(toolbar, top)

  let timer
  const update = () => {
    clearTimeout(timer)
    status.querySelector(".dfp-status-text").textContent="Saving draft..."
    timer=setTimeout(()=>{ writeMeta({oneLine:valueOf("One-Line Introduction"),prompt:valueOf("Main Story Prompt"),details:valueOf("Story Details")});status.querySelector(".dfp-status-text").textContent="Draft saved locally" },350)
  }
  root.addEventListener("input", update)
  root.addEventListener("change", update)
  update()
}

const observer = new MutationObserver(() => {
  const root = [...document.querySelectorAll("main")].find(el => el.querySelector(".dfc-shell"))
  if (root) mount(root)
})
observer.observe(document.body,{childList:true,subtree:true})

const initial = [...document.querySelectorAll("main")].find(el => el.querySelector(".dfc-shell"))
if(initial) mount(initial)
