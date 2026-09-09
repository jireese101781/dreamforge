const FIX_STYLE_ID = "dreamforge-story-tab-fix"

function installStoryCreatorTabFix() {
  if (!document.getElementById(FIX_STYLE_ID)) {
    const style = document.createElement("style")
    style.id = FIX_STYLE_ID
    style.textContent = `
      .dfc-section { display: none !important; }
      .dfc-section.active { display: block !important; }
      .dfc-section.active .dfc-card { display: block !important; }
      .dfc-tabs { overflow-x: auto !important; flex-wrap: nowrap !important; }
      .dfc-tab { flex: 0 0 auto !important; }
    `
    document.head.appendChild(style)
  }

  const root = [...document.querySelectorAll("main")].find(el =>
    /create story|edit story/i.test(el.textContent || "") && el.querySelector(".dfc-shell")
  )
  if (!root) return false

  const tabs = [...root.querySelectorAll(".dfc-tab")]
  const sections = [...root.querySelectorAll(".dfc-section")]
  if (!tabs.length || !sections.length) return false

  const activateTab = (id) => {
    tabs.forEach(tab => tab.classList.toggle("active", tab.dataset.tab === id))
    sections.forEach(section => section.classList.toggle("active", section.dataset.section === id))
    const active = sections.find(section => section.dataset.section === id)
    if (active) active.scrollIntoView({ block: "nearest", behavior: "smooth" })
  }

  tabs.forEach(tab => {
    if (tab.dataset.dfcFixBound === "1") return
    tab.dataset.dfcFixBound = "1"
    tab.addEventListener("click", event => {
      event.preventDefault()
      event.stopImmediatePropagation()
      activateTab(tab.dataset.tab)
    }, true)
  })

  if (!sections.some(section => section.classList.contains("active"))) {
    activateTab("profile")
  }

  return true
}

const tabFixObserver = new MutationObserver(() => {
  if (installStoryCreatorTabFix()) return
})
tabFixObserver.observe(document.body, { childList: true, subtree: true })
installStoryCreatorTabFix()
