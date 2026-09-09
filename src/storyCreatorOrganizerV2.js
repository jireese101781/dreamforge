const META_KEY = "dreamforge_story_creator_meta_v2"
const STYLE_ID = "dreamforge-story-creator-v2"

const TABS = [
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

const REQUIRED = [
  ["profile", "Story Name", "title"],
  ["profile", "Cover Image", "cover"],
  ["profile", "One-Line Introduction", "oneLine"],
  ["setting", "Main Story Prompt", "prompt"],
  ["setting", "Story Details", "details"],
  ["intro", "Prologue / Opening Scene", "prologue"],
  ["advanced", "Core AI Rules", "rules"],
  ["stats", "At least one gameplay system", "stats"]
]

const descriptions = {
  profile: "Give your story its identity and required basics.",
  setting: "Build the world, premise, lore, locations, and rules of the setting.",
  characters: "Design the NPCs, villains, companions, bosses, and other story characters.",
  intro: "Control exactly how the player's adventure begins.",
  stats: "Create fully custom stats, bars, meters, currencies, counters, and effects.",
  media: "Add contextual images for characters, locations, scenes, items, maps, and more.",
  commands: "Create slash commands unique to your game.",
  endings: "Create optional endings, conditions, and final scenes.",
  advanced: "Tell the AI exactly how it should run and narrate your world.",
  publish: "Review requirements and choose how your story will be published."
}

function metaRead() {
  try { return JSON.parse(localStorage.getItem(META_KEY) || "{}") } catch { return {} }
}
function metaWrite(data) { localStorage.setItem(META_KEY, JSON.stringify(data)) }
function textValue(el) { return el && typeof el.value === "string" ? el.value.trim() : "" }
function makeButton(text, className) { const b=document.createElement("button"); b.type="button"; b.textContent=text; b.className=className || "dfc-add"; return b }
function makeInput(placeholder,type="text") { const e=document.createElement("input"); e.type=type; e.placeholder=placeholder; return e }
function makeArea(placeholder) { const e=document.createElement("textarea"); e.placeholder=placeholder; return e }
function makeField(title, control, required=false) { const w=document.createElement("div"); w.className="dfc-field"; const l=document.createElement("label"); l.innerHTML=title+(required?' <span class="dfc-star">★</span>':""); w.append(l,control); return w }

function addStyles() {
  if(document.getElementById(STYLE_ID)) return
  const s=document.createElement("style"); s.id=STYLE_ID
  s.textContent=`
.dfc-shell{margin-top:22px}.dfc-top{position:sticky;top:0;z-index:30;background:rgba(8,9,13,.96);backdrop-filter:blur(15px);border:1px solid rgba(139,92,246,.22);border-radius:16px;padding:10px;margin-bottom:18px}.dfc-tabs{display:flex;gap:7px;overflow-x:auto;padding:2px}.dfc-tab{border:1px solid rgba(255,255,255,.08);background:#11131c;color:#a7a9b7;border-radius:11px;padding:10px 13px;white-space:nowrap;cursor:pointer;font-weight:700}.dfc-tab.active{color:#fff;border-color:rgba(139,92,246,.7);background:linear-gradient(135deg,rgba(139,92,246,.3),rgba(79,140,255,.12));box-shadow:0 0 22px rgba(139,92,246,.12)}.dfc-dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:#656978;margin-left:6px}.dfc-tab.complete .dfc-dot{background:#a78bfa;box-shadow:0 0 8px rgba(167,139,250,.8)}.dfc-tab.missing .dfc-dot{background:#ff607b}.dfc-progress{display:flex;align-items:center;gap:12px;color:#9295a5;font-size:12px;margin:9px 4px 0}.dfc-bar{height:5px;flex:1;background:#1a1d28;border-radius:99px;overflow:hidden}.dfc-fill{height:100%;background:linear-gradient(90deg,#6d28d9,#a78bfa);transition:width .2s}.dfc-section{display:none}.dfc-section.active{display:block}.dfc-card{background:rgba(17,19,28,.78);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:20px}.dfc-card h2{margin:0 0 5px}.dfc-card>p{color:#9295a5;margin:0 0 20px}.dfc-field{margin-bottom:17px}.dfc-field label{display:block;font-weight:700;margin-bottom:7px}.dfc-field input,.dfc-field textarea,.dfc-field select{width:100%}.dfc-field textarea{min-height:110px;resize:vertical}.dfc-star{color:#a78bfa;font-weight:900}.dfc-note{padding:12px 14px;border:1px solid rgba(139,92,246,.25);background:rgba(139,92,246,.07);border-radius:11px;color:#c9c5d8;margin-bottom:17px;font-size:13px}.dfc-builder{border:1px solid rgba(255,255,255,.08);background:#0d0f16;border-radius:14px;padding:15px;margin-top:14px}.dfc-builder-head{display:flex;justify-content:space-between;gap:12px;align-items:center}.dfc-builder-head h3{margin:0}.dfc-mini{color:#85899a;font-size:12px;margin-top:4px}.dfc-add{border:1px solid rgba(139,92,246,.45);background:rgba(139,92,246,.1);color:#eee;border-radius:9px;padding:8px 11px;cursor:pointer;font-weight:700}.dfc-item{border:1px solid rgba(255,255,255,.07);background:#11131c;border-radius:12px;padding:13px;margin-top:10px}.dfc-item-head{display:flex;justify-content:space-between;align-items:center;gap:10px}.dfc-remove{border:0;background:transparent;color:#ff7087;font-size:19px;cursor:pointer}.dfc-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px}.dfc-error{display:none;border:1px solid rgba(255,92,115,.35);background:rgba(255,92,115,.08);padding:14px;border-radius:12px;margin-bottom:15px}.dfc-error.show{display:block}.dfc-error ul{margin:8px 0 0;padding-left:20px;color:#ffb2bf}.dfc-error button{background:none;border:0;color:#c9b8ff;text-decoration:underline;cursor:pointer;padding:0}.dfc-lock{padding:12px 14px;border:1px solid rgba(139,92,246,.25);background:rgba(139,92,246,.07);border-radius:11px;color:#c9c5d8;font-size:13px;margin-top:15px}.dfc-hidden{display:none!important}@media(max-width:760px){.dfc-card{padding:15px}.dfc-grid{grid-template-columns:1fr}.dfc-top{position:relative}}
`; document.head.appendChild(s)
}

function organize(root) {
  if(root.dataset.dfcReady === "1") return
  const form=root.querySelector(".story-creator-form")
  if(!form) return
  root.dataset.dfcReady="1"
  addStyles()

  const labels=[...form.querySelectorAll(":scope > label")]
  const byLabel={}
  labels.forEach(l=>{byLabel[l.textContent.trim()]=l})
  const refs={
    title:byLabel["Story Title *"]?.nextElementSibling,
    cover:byLabel["Cover Image"]?.nextElementSibling,
    description:byLabel["Description"]?.nextElementSibling,
    genre:byLabel["Genre *"]?.nextElementSibling,
    world:byLabel["🌎 World / Setting"]?.nextElementSibling,
    tone:byLabel["🎨 Tone / Style"]?.nextElementSibling,
    prologue:byLabel["🎬 Prologue *"]?.nextElementSibling,
    lore:byLabel["📜 World Lore"]?.nextElementSibling,
    history:byLabel["🌎 World History"]?.nextElementSibling,
    rules:byLabel["📋 Story Rules"]?.nextElementSibling,
    ai:byLabel["🤖 Story Prompt"]?.nextElementSibling,
    behavior:byLabel["🎭 Character Behavior"]?.nextElementSibling,
    health:byLabel["❤️ Health System"]?.nextElementSibling,
    inventory:byLabel["🎒 Inventory"]?.nextElementSibling,
    events:byLabel["⚡ Events & Triggers"]?.nextElementSibling,
    media:byLabel["🎞️ Media Library"]?.parentElement
  }
  const oldToggle=form.querySelector(".advanced-toggle")
  const oldAdvanced=form.querySelector(".advanced-settings")
  const save=form.querySelector(".create-button")
  ;[...form.children].forEach(e=>{if(e!==save)e.classList.add("dfc-hidden")})

  const shell=document.createElement("div");shell.className="dfc-shell"
  const top=document.createElement("div");top.className="dfc-top"
  const nav=document.createElement("div");nav.className="dfc-tabs"
  const sections={}
  TABS.forEach(([id,icon,name])=>{
    const b=makeButton("", "dfc-tab");b.dataset.tab=id;b.innerHTML=`${icon} ${name}<span class="dfc-dot"></span>`;nav.appendChild(b)
    const sec=document.createElement("section");sec.className="dfc-section";sec.dataset.section=id
    const card=document.createElement("div");card.className="dfc-card";card.innerHTML=`<h2>${icon} ${name}</h2><p>${descriptions[id]}</p>`;sec.appendChild(card);sections[id]=card;shell.appendChild(sec)
    b.onclick=()=>activate(id)
  })
  const progress=document.createElement("div");progress.className="dfc-progress";progress.innerHTML=`<span class="dfc-progress-text"></span><div class="dfc-bar"><div class="dfc-fill"></div></div>`;top.append(nav,progress);shell.prepend(top)
  form.appendChild(shell)

  function existing(section,title,el,required=false){if(!el)return;el.classList.remove("dfc-hidden");section.appendChild(makeField(title,el,required))}
  existing(sections.profile,"Story Name",refs.title,true)
  if(refs.cover){refs.cover.classList.remove("dfc-hidden");sections.profile.appendChild(makeField("Cover Image",refs.cover,true))}
  const meta=metaRead()
  const oneLine=makeInput("A single sentence that hooks the player...");oneLine.value=meta.oneLine||"";sections.profile.appendChild(makeField("One-Line Introduction",oneLine,true))
  existing(sections.profile,"Story Description",refs.description)
  existing(sections.profile,"Genre",refs.genre,true)
  existing(sections.profile,"Tone / Style",refs.tone)

  const prompt=makeArea("Tell the AI what this story is fundamentally about and what it should simulate...");prompt.value=meta.prompt||"";sections.setting.appendChild(makeField("Main Story Prompt",prompt,true))
  const details=makeArea("Describe the premise, conflicts, world details, factions, locations, and important information...");details.value=meta.details||"";sections.setting.appendChild(makeField("Story Details",details,true))
  existing(sections.setting,"World / Setting",refs.world);existing(sections.setting,"World Lore",refs.lore);existing(sections.setting,"World History",refs.history)
  sections.setting.appendChild(makeField("Magic / Power Systems",makeArea("Optional: magic, powers, technology, ranks, special mechanics...")))
  sections.setting.appendChild(makeField("Factions / Important Locations",makeArea("Optional: kingdoms, cities, organizations, landmarks...")))

  existing(sections.intro,"Prologue / Opening Scene",refs.prologue,true)
  const guide=makeArea("Explain how players interact with the story, make choices, use commands, or understand special mechanics...");guide.value=meta.playGuide||"";sections.intro.appendChild(makeField("Play Guide",guide))
  const start=makeArea("Optional starting situation, location, quest, or scene setup...");start.value=meta.startSituation||"";sections.intro.appendChild(makeField("Starting Situation",start))

  // Advanced fields that already existed in the prototype are placed into the correct new sections.
  existing(sections.advanced,"Core AI Rules",refs.rules,true);existing(sections.advanced,"AI Narration Instructions",refs.ai);existing(sections.advanced,"NPC / Character Behavior",refs.behavior);existing(sections.advanced,"Inventory System",refs.inventory);existing(sections.advanced,"Events & Triggers",refs.events);existing(sections.advanced,"Health System (legacy)",refs.health)

  // Custom Stats
  const statBuilder=document.createElement("div");statBuilder.className="dfc-builder";statBuilder.innerHTML=`<div class="dfc-builder-head"><div><h3>Custom Gameplay Systems</h3><div class="dfc-mini">Add unlimited stats, bars, meters, currencies, counters, relationship values, toggles, or custom systems.</div></div></div>`;const addStat=makeButton("＋ Add Stat / Meter");statBuilder.querySelector(".dfc-builder-head").appendChild(addStat);const statList=document.createElement("div");statBuilder.appendChild(statList);sections.stats.appendChild(statBuilder)
  let stats=Array.isArray(meta.stats)?meta.stats:[]
  function renderStats(){statList.innerHTML="";stats.forEach((st,i)=>{const item=document.createElement("div");item.className="dfc-item";const head=document.createElement("div");head.className="dfc-item-head";const title=document.createElement("strong");title.textContent=st.name||"New Stat";const rem=makeButton("×","dfc-remove");head.append(title,rem);item.appendChild(head);const grid=document.createElement("div");grid.className="dfc-grid";const add=(n,k,type,ph)=>{let c;if(type==="select"){c=document.createElement("select");["Number","Bar","Percentage","Currency","Counter","Relationship","Toggle","Custom"].forEach(x=>{const o=document.createElement("option");o.value=x;o.textContent=x;if((st[k]||"Number")==x)o.selected=true;c.appendChild(o)})}else{c=makeInput(ph,type);c.value=st[k]||""}c.oninput=()=>{st[k]=c.value;title.textContent=st.name||"New Stat";metaWrite({...metaRead(),stats})};grid.appendChild(makeField(n,c))};add("Name","name","text","Health, Sanity, Gold...");add("Type","type","select","");add("Starting Value","start","number","");add("Maximum","max","number","");add("Minimum","min","number","");item.appendChild(grid);const ai=makeArea("Tell the AI when this stat changes and what it means...");ai.value=st.ai||"";ai.oninput=()=>{st.ai=ai.value;metaWrite({...metaRead(),stats})};const effect=makeArea("Example: decrease 10 when injured; increase 5 after resting...");effect.value=st.effect||"";effect.oninput=()=>{st.effect=effect.value;metaWrite({...metaRead(),stats})};item.append(makeField("AI Instructions",ai),makeField("Change / Effect Rules",effect));rem.onclick=()=>{stats.splice(i,1);metaWrite({...metaRead(),stats});renderStats()};statList.appendChild(item)});metaWrite({...metaRead(),stats});update()}
  addStat.onclick=()=>{stats.push({name:"",type:"Number",start:"100",max:"100",min:"0",ai:"",effect:""});renderStats()};renderStats()

  // Story Character Design
  const charBuilder=document.createElement("div");charBuilder.className="dfc-builder";charBuilder.innerHTML=`<div class="dfc-builder-head"><div><h3>Story Character Design</h3><div class="dfc-mini">Create NPCs, villains, companions, bosses, merchants, and other story characters. This does not replace the player's globally equipped character.</div></div></div>`;const addChar=makeButton("＋ Add Character");charBuilder.querySelector(".dfc-builder-head").appendChild(addChar);const charList=document.createElement("div");charBuilder.appendChild(charList);sections.characters.appendChild(charBuilder)
  let chars=Array.isArray(meta.characters)?meta.characters:[]
  function renderChars(){charList.innerHTML="";chars.forEach((ch,i)=>{const item=document.createElement("div");item.className="dfc-item";const head=document.createElement("div");head.className="dfc-item-head";const title=document.createElement("strong");title.textContent=ch.name||"New Character";const rem=makeButton("×","dfc-remove");head.append(title,rem);item.appendChild(head);const grid=document.createElement("div");grid.className="dfc-grid";[["Name","name","text","Character name"],["Age","age","number","Age"],["Role","role","text","Villain, companion, merchant..."]].forEach(([n,k,t,p])=>{const c=makeInput(p,t);c.value=ch[k]||"";c.oninput=()=>{ch[k]=c.value;title.textContent=ch.name||"New Character";metaWrite({...metaRead(),characters:chars})};grid.appendChild(makeField(n,c))});item.appendChild(grid);[["Appearance","appearance","Appearance details..."],["Personality","personality","Personality and behavior..."],["AI Behavior / Backstory","ai","Speech style, goals, fears, relationships, secrets, backstory, and AI instructions..."]].forEach(([n,k,p])=>{const c=makeArea(p);c.value=ch[k]||"";c.oninput=()=>{ch[k]=c.value;metaWrite({...metaRead(),characters:chars})};item.appendChild(makeField(n,c))});rem.onclick=()=>{chars.splice(i,1);metaWrite({...metaRead(),characters:chars});renderChars()};charList.appendChild(item)});metaWrite({...metaRead(),characters:chars})}
  addChar.onclick=()=>{chars.push({name:"",age:"",role:"NPC",appearance:"",personality:"",ai:""});renderChars()};renderChars()

  // Existing media library is moved intact.
  if(refs.media){refs.media.classList.remove("dfc-hidden");sections.media.appendChild(refs.media)}
  const mediaNote=document.createElement("div");mediaNote.className="dfc-note";mediaNote.textContent="💡 Media is optional. Add clear trigger text to images so the AI can understand when each asset belongs in the scene.";sections.media.appendChild(mediaNote)

  function listBuilder(section,key,title,desc,fields){const wrap=document.createElement("div");wrap.className="dfc-builder";wrap.innerHTML=`<div class="dfc-builder-head"><div><h3>${title}</h3><div class="dfc-mini">${desc}</div></div></div>`;const add=makeButton(`＋ Add ${key}`);wrap.querySelector(".dfc-builder-head").appendChild(add);const list=document.createElement("div");wrap.appendChild(list);section.appendChild(wrap);let arr=Array.isArray(metaRead()[key])?metaRead()[key]:[];function render(){list.innerHTML="";arr.forEach((obj,i)=>{const item=document.createElement("div");item.className="dfc-item";const head=document.createElement("div");head.className="dfc-item-head";const titleEl=document.createElement("strong");titleEl.textContent=obj.name||`New ${key}`;const rem=makeButton("×","dfc-remove");head.append(titleEl,rem);item.appendChild(head);fields.forEach(([n,k,p])=>{const c=makeArea(p);c.value=obj[k]||"";c.oninput=()=>{obj[k]=c.value;titleEl.textContent=obj.name||`New ${key}`;metaWrite({...metaRead(),[key]:arr})};item.appendChild(makeField(n,c))});rem.onclick=()=>{arr.splice(i,1);metaWrite({...metaRead(),[key]:arr});render()};list.appendChild(item)});metaWrite({...metaRead(),[key]:arr})}add.onclick=()=>{arr.push({name:""});render()};render()}
  listBuilder(sections.commands,"commands","Custom Slash Commands","Create commands unique to your game.",[["Command","name","/inventory"],["Description","description","What does this command do?"],["AI Instructions","ai","How should the AI execute it?"]])
  listBuilder(sections.endings,"endings","Story Endings","Optional endings can have conditions and complete ending scenes.",[["Ending Name","name","The True Ending"],["Conditions","condition","What unlocks this ending?"],["Ending Scene","scene","Write the ending scene or tell the AI how to generate it..."]])

  const publishGrid=document.createElement("div");publishGrid.className="dfc-grid";const hashtags=makeInput("#fantasy #anime #rpg");hashtags.value=metaRead().hashtags||"";hashtags.oninput=()=>metaWrite({...metaRead(),hashtags:hashtags.value});const visibility=document.createElement("select");["Public","Private","Unlisted"].forEach(x=>{const o=document.createElement("option");o.value=x;o.textContent=x;if((metaRead().visibility||"Public")==x)o.selected=true;visibility.appendChild(o)});visibility.onchange=()=>metaWrite({...metaRead(),visibility:visibility.value});publishGrid.append(makeField("Hashtags",hashtags,true),makeField("Visibility",visibility,true));sections.publish.appendChild(publishGrid)
  const error=document.createElement("div");error.className="dfc-error";error.innerHTML="<strong>⚠️ Your story isn't ready yet.</strong><ul></ul>";sections.publish.appendChild(error)
  const lock=document.createElement("div");lock.className="dfc-lock";lock.textContent="🔒 Publish is locked until every purple ★ requirement is complete. Optional systems can be skipped.";sections.publish.appendChild(lock)
  if(save){save.classList.remove("dfc-hidden");sections.publish.appendChild(save)}

  function current(){const m=metaRead();return{title:textValue(refs.title),cover:!!refs.cover?.querySelector("img[src]"),oneLine:textValue(oneLine),prompt:textValue(prompt),details:textValue(details),prologue:textValue(refs.prologue),rules:textValue(refs.rules),stats:(Array.isArray(m.stats)&&m.stats.some(s=>String(s.name||"").trim()))||textValue(refs.health)}}
  function refresh(){const v=current();let count=0;const missing={};REQUIRED.forEach(([tab,name,key])=>{if(v[key])count++;else{if(!missing[tab])missing[tab]=[];missing[tab].push(name)}});progress.querySelector(".dfc-progress-text").textContent=`${count} / ${REQUIRED.length} required complete`;progress.querySelector(".dfc-fill").style.width=`${Math.round(count/REQUIRED.length*100)}%`;TABS.forEach(([id])=>{const b=nav.querySelector(`[data-tab="${id}"]`);b?.classList.toggle("missing",!!missing[id]);b?.classList.toggle("complete",!missing[id])});return missing}
  function activate(id){TABS.forEach(([key])=>{sections[key].classList.toggle("active",key===id);nav.querySelector(`[data-tab="${key}"]`)?.classList.toggle("active",key===id)});refresh()}
  ;[oneLine,prompt,details,guide,start,hashtags].forEach(e=>e.addEventListener("input",()=>{const m=metaRead();Object.assign(m,{oneLine:oneLine.value,prompt:prompt.value,details:details.value,playGuide:guide.value,startSituation:start.value,hashtags:hashtags.value});metaWrite(m);refresh()}))
  ;[refs.title,refs.prologue,refs.rules,refs.health].forEach(e=>e?.addEventListener("input",refresh))
  refs.cover?.querySelector("input[type=file]")?.addEventListener("change",()=>setTimeout(refresh,150))
  save?.addEventListener("click",e=>{const missing=refresh();if(Object.keys(missing).length){e.preventDefault();e.stopImmediatePropagation();error.querySelector("ul").innerHTML=Object.entries(missing).flatMap(([tab,names])=>names.map(name=>`<li><button type="button" data-jump="${tab}">${name}</button></li>`)).join("");error.classList.add("show");error.querySelectorAll("[data-jump]").forEach(b=>b.onclick=()=>activate(b.dataset.jump));activate(Object.keys(missing)[0]);alert("⚠️ Some required information is missing. Check the purple ★ fields before continuing.");return false}error.classList.remove("show");metaWrite({...metaRead(),updatedAt:Date.now()})},true)
  activate("profile")
}

function scan(){const h=[...document.querySelectorAll("h1,h2")].find(x=>/Create Story|Edit Story/i.test(x.textContent||""));const root=h?.closest("main");if(root)organize(root)}
if(!window.__dreamforgeStoryCreatorV2){window.__dreamforgeStoryCreatorV2=true;const observer=new MutationObserver(scan);observer.observe(document.body,{childList:true,subtree:true});scan()}
