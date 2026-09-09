const STYLE_ID = "dreamforge-story-creator-ui-fix"

if (!document.getElementById(STYLE_ID)) {
  const style = document.createElement("style")
  style.id = STYLE_ID
  style.textContent = `
    /* Keep the original sideways tab layout. */
    .dfc-top {
      padding: 10px !important;
      overflow: visible !important;
    }

    .dfc-tabs {
      display: flex !important;
      flex-wrap: nowrap !important;
      gap: 7px !important;
      overflow-x: auto !important;
      overflow-y: hidden !important;
      padding: 2px !important;
    }

    .dfc-tab {
      flex: 0 0 auto !important;
      min-height: 44px !important;
      padding: 10px 13px !important;
      font-size: 14px !important;
      text-align: center !important;
    }

    /* The selected tab MUST reveal its editing panel. */
    .dfc-section {
      display: none !important;
    }

    .dfc-section.active {
      display: block !important;
      margin-top: 18px !important;
    }

    .dfc-section.active .dfc-card {
      display: block !important;
      min-height: 220px !important;
      padding: 24px !important;
    }

    .dfc-progress {
      margin-top: 9px !important;
      font-size: 12px !important;
    }

    .dfc-card h2 {
      font-size: 22px !important;
      margin-bottom: 8px !important;
    }

    .dfc-card > p {
      font-size: 14px !important;
      line-height: 1.55 !important;
    }

    .dfc-field label {
      font-size: 14px !important;
    }

    .dfc-field input,
    .dfc-field textarea,
    .dfc-field select {
      font-size: 15px !important;
    }

    .dfc-field textarea {
      min-height: 130px !important;
    }

    @media (max-width: 700px) {
      .dfc-section.active .dfc-card {
        padding: 17px !important;
      }
    }
  `
  document.head.appendChild(style)
}

function repairStoryCreatorTabs() {
  const shells = [...document.querySelectorAll(".dfc-shell")]
  shells.forEach(shell => {
    const tabs = [...shell.querySelectorAll(".dfc-tab")]
    const sections = [...shell.querySelectorAll(".dfc-section")]
    if (!tabs.length || !sections.length) return

    const activate = id => {
      tabs.forEach(tab => tab.classList.toggle("active", tab.dataset.tab === id))
      sections.forEach(section => section.classList.toggle("active", section.dataset.section === id))
    }

    tabs.forEach(tab => {
      if (tab.dataset.uiFixBound === "1") return
      tab.dataset.uiFixBound = "1"
      tab.addEventListener("click", event => {
        event.preventDefault()
        event.stopPropagation()
        activate(tab.dataset.tab)
      }, true)
    })

    if (!sections.some(section => section.classList.contains("active"))) {
      activate("profile")
    }
  })
}

const repairObserver = new MutationObserver(repairStoryCreatorTabs)
repairObserver.observe(document.body, { childList: true, subtree: true })
repairStoryCreatorTabs()
