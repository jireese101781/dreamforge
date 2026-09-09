const STYLE_ID = "dreamforge-story-creator-organizer"
const ROOT_ID = "dreamforge-story-workspace"
const META_KEY = "dreamforge_story_creator_meta"

const tabs = [
  ["profile", "🎨", "Profile"],
  ["setting", "🌎", "Setting"],
  ["characters", "👤", "Characters"],
  ["intro", "🎬", "Intro"],
  ["stats", "📊", "Stats"],
  ["media", "🖼️", "Media"],
  ["commands", "⚡", "Commands"],
  ["endings", "🏁", "Endings"],
  ["advanced", "⚙️", "Advanced"],
  ["publish", "🚀", "Publish"]
]

const requiredFields = [
  ["profile", "Story Name", "title"],
  ["profile", "Cover Image", "cover"],
  ["profile", "One-Line Introduction", "oneLine"],
  ["setting", "Main Story Prompt", "prompt"],
  ["setting", "Story Details", "details"],
  ["intro", "Prologue", "prologue"],
  ["advanced", "Core AI Rules", "rules"],
  ["stats", "At least one gameplay system", "stats"]
]

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return
  const style = document.createElement("style")
  style.id = STYLE_ID
  style.textContent = `
    .df-creator-shell{margin-top:24px}
    .df-creator-top{position:sticky;top:0;z-index:20;background:rgba(8,9,13,.94);backdrop-filter:blur(16px);border:1px solid rgba(139,92,246,.18);border-radius:16px;padding:10px;margin-bottom:18px;box-shadow:0 12px 40px rgba(0,0,0,.3)}
    .df-tabs{display:flex;gap:7px;overflow-x:auto;scrollbar-width:thin;padding:2px}
    .df-tab{border:1px solid rgba(255,255,255,.07);background:#11131c;color:#aeb0bd;border-radius:11px;padding:10px 13px;white-space:nowrap;cursor:pointer;font-weight:700;font-size:13px;transition:.18s}
    .df-tab:hover{border-color:rgba(139,92,246,.4);color:#fff}
    .df-tab.active{background:linear-gradient(135deg,rgba(139,92,246,.28),rgba(79,140,255,.12));border-color:rgba(139,92,246,.65);color:#fff;box-shadow:0 0 20px rgba(139,92,246,.12)}
    .df-tab .df-status{display:inline-block;width:7px;height:7px;border-radius:50%;margin-left:6px;background:#7b7f91;vertical-align:middle}
    .df-tab.complete .df-status{background:#a78bfa;box-shadow:0 0 9px rgba(167,139,250,.75)}
    .df-tab.missing .df-status{background:#ff6680}
    .df-progress{display:flex;justify-content:space-between;gap:12px;align-items:center;margin:9px 4px 1px;color:#9295a5;font-size:12px}
    .df-progress-bar{height:5px;background:#1a1d28;border-radius:99px;overflow:hidden;flex:1}.df-progress-fill{height:100%;background:linear-gradient(90deg,#6d28d9,#a78bfa);border-radius:99px;transition:width .25s}
    .df-section{display:none}.df-section.active{display:block}
    .df-section-card{background:rgba(17,19,28,.76);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:20px;box-shadow:0 12px 35px rgba(0,0,0,.2)}
    .df-section-card h2{margin:0 0 5px}.df-section-card>p{color:#9295a5;margin:0 0 20px}
    .df-required-note{border:1px solid rgba(139,92,246,.25);background:rgba(139,92,246,.07);padding:12px 14px;border-radius:11px;color:#c9c5d8;font-size:13px;margin-bottom:18px}.df-star{color:#a78bfa;font-weight:900}
    .df-field{margin:0 0 17px}.df-field label{display:block;margin-bottom:7px;font-weight:700}.df-field label .df-star{margin-left:3px}.df-field input,.df-field textarea,.df-field select{width:100%}.df-field textarea{min-height:110px;resize:vertical}
    .df-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.df-grid .df-field{margin:0}
    .df-builder{border:1px solid rgba(255,255,255,.08);background:#0d0f16;border-radius:14px;padding:15px;margin-top:14px}.df-builder-head{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:12px}.df-builder-head h3{margin:0}.df-add{border:1px solid rgba(139,92,246,.45);background:rgba(139,92,246,.1);color:#eee;border-radius:9px;padding:8px 11px;cursor:pointer;font-weight:700}.df-item{border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:13px;margin-top:10px;background:#11131c}.df-item-head{display:flex;justify-content:space-between;align-items:center;gap:10px}.df-item-head strong{font-size:14px}.df-remove{border:0;background:transparent;color:#ff7087;cursor:pointer;font-size:18px}.df-mini{font-size:12px;color:#85899a;margin-top:4px}.df-validation{display:none;margin:0 0 16px;border:1px solid rgba(255,92,115,.35);background:rgba(255,92,115,.08);border-radius:13px;padding:15px}.df-validation.show{display:block}.df-validation strong{color:#fff}.df-validation ul{margin:8px 0 0;padding-left:20px;color:#ffb2bf}.df-jump{color:#c8b9ff;cursor:pointer;text-decoration:underline}.df-publish-lock{margin-top:16px;border-radius:12px;padding:12px 14px;background:rgba(139,92,246,.08);border:1px solid rgba(139,92,246,.25);color:#c9c5d8;font-size:13px}
    .df-hidden-original{display:none!important}.df-creator-shell .story-creator-form{display:block}.df-creator-shell .create-button{margin-top:20px}
    @media(max-width:760px){.df-grid{grid-template-columns:1fr}.df-creator-top{position:relative}.df-section-card{padding:15px}.df-tab{padding:9px 11px}}
  `
  document.head.appendChild(style)
}

function getMeta() {
  try { return JSON.parse(localStorage.getItem(META_KEY) || "{}") } catch { return {} }
}
function saveMeta(meta) { localStorage.setItem(META_KEY, JSON.stringify(meta)) }
function esc(value) { return String(value || "").replace(/[&<>\"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c])) }

function fieldValue(el) { return el?.value?.trim() || "" }
function makeField(label, control) {
  const wrap = document.createElement("div")
  wrap.className = "df-field"
  wrap.append(label, control)
  return wrap
}
function makeInput(placeholder="") { const el=document.createElement("input"); el.type="text"; el.placeholder=placeholder; return el }
function makeText(placeholder="") { const el=document.createElement("textarea"); el.placeholder=placeholder; return el }
function makeButton(text, cls="df-add") { const b=document.createElement("button"); b.type="button"; b.className=cls; b.textContent=text; return b }
function label(text, required=false) { const l=document.createElement("label"); l.innerHTML=esc(text)+(required?' <span class="df-star">★</span>':""); return l }

function organizer(root) {
  if (root.dataset.dfOrganized === "true") return
  const form = root.querySelector(".story-creator-form")
  if (!form) return
  root.dataset.dfOrganized = "true"
  injectStyles()

  const oldAdvanced = form.querySelector(".advanced-toggle")
  const oldAdvancedBox = form.querySelector(".advanced-settings")
  const saveButton = form.querySelector(".create-button")
  const allLabels = [...form.querySelectorAll(":scope > label")]
  const byText = {}
  allLabels.forEach(l => { byText[l.textContent.trim()] = l })

  const shell=document.createElement("div"); shell.className="df-creator-shell"
  const top=document.createElement("div"); top.className="df-creator-top"
  const tabsBar=document.createElement("div"); tabsBar.className="df-tabs"
  const sections={}

  tabs.forEach(([id,icon,name])=>{
    const b=makeButton(`${icon} ${name}`,"df-tab"); b.dataset.tab=id
    b.innerHTML=`${icon} ${name}<span class="df-status"></span>`
    tabsBar.appendChild(b)
    const s=document.createElement("section"); s.className="df-section"; s.dataset.section=id
    const card=document.createElement("div"); card.className="df-section-card"
    card.innerHTML=`<h2>${icon} ${name}</h2><p>${tabDescription(id)}</p>`
    s.appendChild(card); sections[id]=card
    shell.appendChild(s)
  })
  const progress=document.createElement("div"); progress.className="df-progress"
  progress.innerHTML=`<span class="df-progress-text">0 / ${requiredFields.length} required complete</span><div class="df-progress-bar"><div class="df-progress-fill" style="width:0%"></div></div>`
  top.append(tabsBar,progress); shell.prepend(top)

  const validation=document.createElement("div"); validation.className="df-validation"
  validation.innerHTML=`<strong>⚠️ Your story isn't ready yet.</strong><ul></ul>`
  sections.publish.appendChild(validation)

  const formChildren=[...form.children]
  formChildren.forEach(el=>{ if(el!==oldAdvanced && el!==oldAdvancedBox && el!==saveButton) el.classList.add("df-hidden-original") })
  if(oldAdvanced) oldAdvanced.classList.add("df-hidden-original")
  if(oldAdvancedBox) oldAdvancedBox.classList.add("df-hidden-original")

  // Existing Profile fields
  const titleInput=byText["Story Title *"]?.nextElementSibling
  const coverBlock=byText["Cover Image"]?.nextElementSibling
  const descInput=byText["Description"]?.nextElementSibling
  const genreInput=byText["Genre *"]?.nextElementSibling
  const worldInput=byText["🌎 World / Setting"]?.nextElementSibling
  const toneInput=byText["🎨 Tone / Style"]?.nextElementSibling
  const prologueInput=byText["🎬 Prologue *"]?.nextElementSibling
  const loreInput=oldAdvancedBox?.querySelector('textarea')

  function existingField(container, lbl, input, required=false){ if(!input) return; input.classList.remove("df-hidden-original"); container.appendChild(makeField(lbl, input)) }
  existingField(sections.profile,"Story Name",titleInput,true)
  if(coverBlock){ coverBlock.classList.remove("df-hidden-original"); sections.profile.appendChild(makeField("Cover Image",coverBlock,true)) }
  const oneLine=makeInput("A single sentence that hooks the player...")
  const meta=getMeta(); oneLine.value=meta.oneLine||""
  sections.profile.appendChild(makeField("One-Line Introduction",oneLine,true))
  existingField(sections.profile,"Story Description",descInput)
  existingField(sections.profile,"Genre",genreInput,true)
  existingField(sections.profile,"Tone / Style",toneInput)

  // Setting
  const prompt=makeText("Tell the AI what this story is fundamentally about and what it should simulate...")
  prompt.value=meta.prompt||""
  const details=makeText("Describe the world, premise, setting, conflicts, factions, locations, and important details...")
  details.value=meta.details||""
  sections.setting.appendChild(makeField("Main Story Prompt",prompt,true))
  sections.setting.appendChild(makeField("Story Details",details,true))
  existingField(sections.setting,"World / Setting",worldInput)
  existingField(sections.setting,"World Lore",byText["📜 World Lore"]?.nextElementSibling)
  existingField(sections.setting,"World History",byText["🌎 World History"]?.nextElementSibling)
  existingField(sections.setting,"Magic / Power Systems",makeText("Optional: explain magic, powers, technology, ranks, or special systems..."))
  existingField(sections.setting,"Factions / Important Locations",makeText("Optional: kingdoms, factions, cities, organizations, landmarks..."))

  // Intro
  existingField(sections.intro,"Prologue / Opening Scene",prologueInput,true)
  const playGuide=makeText("Explain how players should interact with the world, make choices, use commands, or understand special mechanics...")
  playGuide.value=meta.playGuide||""
  sections.intro.appendChild(makeField("Play Guide",playGuide))
  const startSituation=makeText("Optional starting situation, location, quest, or scene setup...")
  startSituation.value=meta.startSituation||""
  sections.intro.appendChild(makeField("Starting Situation",startSituation))

  // Advanced existing fields moved into logical tabs through cloned references
  existingField(sections.advanced,"Core AI Rules",byText["📋 Story Rules"]?.nextElementSibling,true)
  existingField(sections.advanced,"AI Narration Instructions",byText["🤖 Story Prompt"]?.nextElementSibling)
  existingField(sections.advanced,"NPC / Character Behavior",byText["🎭 Character Behavior"]?.nextElementSibling)
  existingField(sections.advanced,"Inventory System",byText["🎒 Inventory"]?.nextElementSibling)
  existingField(sections.advanced,"Events & Triggers",byText["⚡ Events & Triggers"]?.nextElementSibling)
  existingField(sections.advanced,"Health System (legacy)",byText["❤️ Health System"]?.nextElementSibling)

  // Intro required stats builder
  const statsWrap=document.createElement("div"); statsWrap.className="df-builder"
  statsWrap.innerHTML=`<div class="df-builder-head"><div><h3>Custom Gameplay Systems</h3><div class="df-mini">Create any stat, bar, meter, currency, counter, relationship value, or toggle your game needs.</div></div></div>`
  const addStat=makeButton("＋ Add Stat / Meter")
  statsWrap.querySelector(".df-builder-head").appendChild(addStat)
  const statList=document.createElement("div"); statsWrap.appendChild(statList); sections.stats.appendChild(statsWrap)
  let stats=Array.isArray(meta.stats)?meta.stats:[]
  function renderStats(){
    statList.innerHTML=""
    stats.forEach((st,i)=>{
      const item=document.createElement("div"); item.className="df-item"
      item.innerHTML=`<div class="df-item-head"><strong>${esc(st.name||"Unnamed Stat")}</strong><button type="button" class="df-remove">×</button></div>`
      const grid=document.createElement("div"); grid.className="df-grid"
      const fields=[
        ["Name",st.name||"","text","Health, Sanity, Gold..."],["Type",st.type||"Number","select",""] ,
        ["Starting Value",st.start||"100","number",""],["Maximum",st.max||"100","number",""] ,
        ["Minimum",st.min||"0","number",""]
      ]
      fields.forEach(([n,v,type,ph])=>{let c;if(type==="select"){c=document.createElement("select");["Number","Bar","Percentage","Currency","Counter","Relationship","Toggle","Custom"].forEach(x=>{const o=document.createElement("option");o.value=x;o.textContent=x;if(x===v)o.selected=true;c.appendChild(o)})}else{c=document.createElement("input");c.type=type;c.value=v;c.placeholder=ph} c.addEventListener("input",()=>{st.key=n.toLowerCase().replace(/[^a-z]/g,"");st[n.toLowerCase().replace(/[^a-z]/g,"")]=c.value;saveMeta({...getMeta(),stats})});grid.appendChild(makeField(n,c))})
      const promptC=makeText("Tell the AI exactly when this stat changes and what the value means...");promptC.value=st.prompt||"";promptC.addEventListener("input",()=>{st.prompt=promptC.value;saveMeta({...getMeta(),stats})})
      const changeC=makeText("Example: decrease 10 when injured; increase 5 after resting...");changeC.value=st.change||"";changeC.addEventListener("input",()=>{st.change=changeC.value;saveMeta({...getMeta(),stats})})
      item.append(grid,makeField("AI Instructions",promptC),makeField("Change / Effect Rules",changeC));item.querySelector(".df-remove").onclick=()=>{stats.splice(i,1);saveMeta({...getMeta(),stats});renderStats();refresh()};statList.appendChild(item)
    })
    saveMeta({...getMeta(),stats}); refresh()
  }
  addStat.onclick=()=>{stats.push({name:"",type:"Number",start:"100",max:"100",min:"0",prompt:"",change:""});renderStats()}
  renderStats()

  // Character design builder
  const charWrap=document.createElement("div");charWrap.className="df-builder";charWrap.innerHTML=`<div class="df-builder-head"><div><h3>Story Characters</h3><div class="df-mini">Design NPCs, villains, companions, bosses, merchants, or any custom role. The player character is still chosen globally when the story starts.</div></div></div>`
  const addChar=makeButton("＋ Add Character");charWrap.querySelector(".df-builder-head").appendChild(addChar);const charList=document.createElement("div");charWrap.appendChild(charList);sections.characters.appendChild(charWrap)
  let chars=Array.isArray(meta.characters)?meta.characters:[]
  function renderChars(){charList.innerHTML="";chars.forEach((ch,i)=>{const item=document.createElement("div");item.className="df-item";item.innerHTML=`<div class="df-item-head"><strong>${esc(ch.name||"New Character")}</strong><button type="button" class="df-remove">×</button></div>`;const grid=document.createElement("div");grid.className="df-grid";[["Name","name","text","Character name"],["Age","age","number","Age"],["Role","role","text","Villain, companion, merchant..."]].forEach(([n,k,t,p])=>{const c=document.createElement("input");c.type=t;c.value=ch[k]||"";c.placeholder=p;c.addEventListener("input",()=>{ch[k]=c.value;item.querySelector("strong").textContent=ch.name||"New Character";saveMeta({...getMeta(),characters:chars})});grid.appendChild(makeField(n,c))});const app=makeText("Appearance...");app.value=ch.appearance||"";app.oninput=()=>{ch.appearance=app.value;saveMeta({...getMeta(),characters:chars)};};const per=makeText("Personality and behavior...");per.value=ch.personality||"";per.oninput=()=>{ch.personality=per.value;saveMeta({...getMeta(),characters:chars})};const ai=makeText("AI behavior instructions, speech style, secrets, goals, relationships...");ai.value=ch.ai||"";ai.oninput=()=>{ch.ai=ai.value;saveMeta({...getMeta(),characters:chars})};item.append(grid,makeField("Appearance",app),makeField("Personality",per),makeField("AI Behavior / Backstory",ai));item.querySelector(".df-remove").onclick=()=>{chars.splice(i,1);saveMeta({...getMeta(),characters:chars});renderChars()};charList.appendChild(item)});saveMeta({...getMeta(),characters:chars})}
  addChar.onclick=()=>{chars.push({name:"",age:"",role:"NPC",appearance:"",personality:"",ai:""});renderChars()};renderChars()

  // Media: preserve existing media library if present
  const mediaBox=byText["🎞️ Media Library"]?.parentElement
  if(mediaBox){mediaBox.classList.remove("df-hidden-original");sections.media.appendChild(mediaBox)}
  const mediaNote=document.createElement("div");mediaNote.className="df-required-note";mediaNote.textContent="💡 Media is optional. Give each image a clear trigger so the AI knows when it belongs in the current scene.";sections.media.appendChild(mediaNote)

  // Commands
  const cmdWrap=document.createElement("div");cmdWrap.className="df-builder";cmdWrap.innerHTML=`<div class="df-builder-head"><div><h3>Custom Slash Commands</h3><div class="df-mini">Create commands unique to your game.</div></div></div>`;const addCmd=makeButton("＋ Add Command");cmdWrap.querySelector(".df-builder-head").appendChild(addCmd);const cmdList=document.createElement("div");cmdWrap.appendChild(cmdList);sections.commands.appendChild(cmdWrap)
  let commands=Array.isArray(meta.commands)?meta.commands:[]
  function renderCommands(){cmdList.innerHTML="";commands.forEach((cmd,i)=>{const item=document.createElement("div");item.className="df-item";item.innerHTML=`<div class="df-item-head"><strong>${esc(cmd.name||"/command")}</strong><button type="button" class="df-remove">×</button></div>`;const name=makeInput("/inventory");name.value=cmd.name||"";name.oninput=()=>{cmd.name=name.value;item.querySelector("strong").textContent=cmd.name||"/command";saveMeta({...getMeta(),commands})};const desc=makeText("What does this command do?");desc.value=cmd.description||"";desc.oninput=()=>{cmd.description=desc.value;saveMeta({...getMeta(),commands})};const ai=makeText("AI instructions for executing this command...");ai.value=cmd.ai||"";ai.oninput=()=>{cmd.ai=ai.value;saveMeta({...getMeta(),commands})};item.append(makeField("Command",name),makeField("Description",desc),makeField("AI Instructions",ai));item.querySelector(".df-remove").onclick=()=>{commands.splice(i,1);saveMeta({...getMeta(),commands});renderCommands()};cmdList.appendChild(item)});saveMeta({...getMeta(),commands})}
  addCmd.onclick=()=>{commands.push({name:"/newcommand",description:"",ai:""});renderCommands()};renderCommands()

  // Endings
  const endWrap=document.createElement("div");endWrap.className="df-builder";endWrap.innerHTML=`<div class="df-builder-head"><div><h3>Story Endings</h3><div class="df-mini">Optional endings can have their own scenes and conditions.</div></div></div>`;const addEnd=makeButton("＋ Add Ending");endWrap.querySelector(".df-builder-head").appendChild(addEnd);const endList=document.createElement("div");endWrap.appendChild(endList);sections.endings.appendChild(endWrap)
  let endings=Array.isArray(meta.endings)?meta.endings:[]
  function renderEndings(){endList.innerHTML="";endings.forEach((en,i)=>{const item=document.createElement("div");item.className="df-item";item.innerHTML=`<div class="df-item-head"><strong>${esc(en.name||"New Ending")}</strong><button type="button" class="df-remove">×</button></div>`;const name=makeInput("The True Ending");name.value=en.name||"";name.oninput=()=>{en.name=name.value;item.querySelector("strong").textContent=en.name||"New Ending";saveMeta({...getMeta(),endings})};const cond=makeText("What conditions unlock this ending?");cond.value=en.condition||"";cond.oninput=()=>{en.condition=cond.value;saveMeta({...getMeta(),endings})};const scene=makeText("Write the ending scene or tell the AI how to generate it...");scene.value=en.scene||"";scene.oninput=()=>{en.scene=scene.value;saveMeta({...getMeta(),endings})};item.append(makeField("Ending Name",name),makeField("Conditions",cond),makeField("Ending Scene",scene));item.querySelector(".df-remove").onclick=()=>{endings.splice(i,1);saveMeta({...getMeta(),endings});renderEndings()};endList.appendChild(item)});saveMeta({...getMeta(),endings})}
  addEnd.onclick=()=>{endings.push({name:"",condition:"",scene:""});renderEndings()};renderEndings()

  // Publish
  const pubGrid=document.createElement("div");pubGrid.className="df-grid"
  const hashtags=makeInput("#fantasy #anime #rpg");hashtags.value=meta.hashtags||"";hashtags.oninput=()=>{saveMeta({...getMeta(),hashtags:hashtags.value})}
  const visibility=document.createElement("select");["Public","Private","Unlisted"].forEach(x=>{const o=document.createElement("option");o.value=x;o.textContent=x;if((meta.visibility||"Public")===x)o.selected=true;visibility.appendChild(o)});visibility.onchange=()=>saveMeta({...getMeta(),visibility:visibility.value})
  pubGrid.append(makeField("Hashtags",hashtags,true),makeField("Visibility",visibility,true));sections.publish.appendChild(pubGrid)
  sections.publish.appendChild(document.createElement("hr"))
  const publishInfo=document.createElement("div");publishInfo.className="df-publish-lock";publishInfo.textContent="🔒 Publish remains locked until every purple ★ requirement is complete. Optional systems can be skipped.";sections.publish.appendChild(publishInfo)

  if(saveButton){saveButton.classList.remove("df-hidden-original");sections.publish.appendChild(saveButton)}
  form.appendChild(shell)

  function activate(id){tabs.forEach(([key])=>{sections[key].classList.toggle("active",key===id);tabsBar.querySelector(`[data-tab="${key}"]`)?.classList.toggle("active",key===id)});updateStatus()}
  tabsBar.querySelectorAll(".df-tab").forEach(b=>b.onclick=()=>activate(b.dataset.tab))
  activate("profile")

  function values(){
    const m=getMeta();
    return {title:fieldValue(titleInput),cover:!!coverBlock?.querySelector("img[src]"),oneLine:fieldValue(oneLine),prompt:fieldValue(prompt),details:fieldValue(details),prologue:fieldValue(prologueInput),rules:fieldValue(byText["📋 Story Rules"]?.nextElementSibling),stats:(Array.isArray(m.stats)&&m.stats.some(s=>String(s.name||"").trim()))||fieldValue(byText["❤️ Health System"]?.nextElementSibling)}
  }
  function updateStatus(){
    const v=values();let complete=0;const missingByTab={};requiredFields.forEach(([tab,name,key])=>{if(v[key])complete++;else(missingByTab[tab]??=[]).push(name)});progress.querySelector(".df-progress-text").textContent=`${complete} / ${requiredFields.length} required complete`;progress.querySelector(".df-progress-fill").style.width=`${Math.round(complete/requiredFields.length*100)}%`;tabs.forEach(([id])=>{const b=tabsBar.querySelector(`[data-tab="${id}"]`);b?.classList.toggle("complete",!missingByTab[id]);b?.classList.toggle("missing",!!missingByTab[id])});return {v,missingByTab,complete}}
  function validate(){const {missingByTab}=updateStatus();const missing=requiredFields.filter(([tab,name,key])=>!values()[key]);if(!missing.length){validation.classList.remove("show");return true}validation.querySelector("ul").innerHTML=missing.map(([tab,name])=>`<li><span class="df-jump" data-jump="${tab}">${esc(name)}</span></li>`).join("");validation.classList.add("show");validation.querySelectorAll("[data-jump]").forEach(x=>x.onclick=()=>activate(x.dataset.jump));activate(missing[0][0]);return false}

  // Persist simple fields and refresh validation as the creator types.
  const tracked=[oneLine,prompt,details,playGuide,startSituation,hashtags]
  tracked.forEach(el=>el.addEventListener("input",()=>{const m=getMeta();Object.assign(m,{oneLine:oneLine.value,prompt:prompt.value,details:details.value,playGuide:playGuide.value,startSituation:startSituation.value,hashtags:hashtags.value});saveMeta(m);updateStatus()}))
  ;[titleInput,prologueInput,byText["📋 Story Rules"]?.nextElementSibling].forEach(el=>el?.addEventListener("input",updateStatus))
  coverBlock?.querySelector("input[type=file]")?.addEventListener("change",()=>setTimeout(updateStatus,100))
  saveButton?.addEventListener("click",e=>{if(!validate()){e.preventDefault();e.stopImmediatePropagation();alert("⚠️ Your story is missing required information. Check the purple ★ fields before continuing.");return false} const m=getMeta();m.updatedAt=Date.now();saveMeta(m)},true)
  updateStatus()
}

function tabDescription(id){return ({profile:"Give your story its identity and required basics.",setting:"Build the world, premise, lore, and story foundation.",characters:"Design the NPCs and story characters that populate your world.",intro:"Control exactly how the player's adventure begins.",stats:"Create fully custom gameplay stats, meters, currencies, and effects.",media:"Attach contextual images and visual assets to your world.",commands:"Create slash commands that are unique to your game.",endings:"Create optional endings, conditions, and final scenes.",advanced:"Tell the AI the rules it must follow while running your world.",publish:"Review required information and choose how your story is published."}[id]||"")}

function scan(){
  const headings=[...document.querySelectorAll("h1,h2")]
  const heading=headings.find(h=>/Create Story|Edit Story/i.test(h.textContent||""))
  const root=heading?.closest("main")
  if(root) organizer(root)
}

if(!window.__dreamforgeStoryCreatorOrganizer){
  window.__dreamforgeStoryCreatorOrganizer=true
  const observer=new MutationObserver(scan)
  observer.observe(document.body,{childList:true,subtree:true})
  scan()
}
