const STYLE_ID = "dreamforge-story-creator-ui-fix"

if (!document.getElementById(STYLE_ID)) {
  const style = document.createElement("style")
  style.id = STYLE_ID
  style.textContent = `
    .dfc-top {
      padding: 14px !important;
      overflow: visible !important;
    }

    .dfc-tabs {
      display: grid !important;
      grid-template-columns: repeat(5, minmax(150px, 1fr)) !important;
      gap: 10px !important;
      overflow: visible !important;
    }

    .dfc-tab {
      min-height: 50px !important;
      padding: 13px 14px !important;
      font-size: 14px !important;
      text-align: center !important;
    }

    .dfc-progress {
      margin-top: 13px !important;
      font-size: 13px !important;
    }

    .dfc-section.active {
      display: block !important;
      margin-top: 18px !important;
    }

    .dfc-card {
      min-height: 220px !important;
      padding: 24px !important;
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

    @media (max-width: 1100px) {
      .dfc-tabs {
        grid-template-columns: repeat(3, minmax(140px, 1fr)) !important;
      }
    }

    @media (max-width: 700px) {
      .dfc-tabs {
        grid-template-columns: repeat(2, minmax(130px, 1fr)) !important;
      }
    }

    @media (max-width: 430px) {
      .dfc-tabs {
        grid-template-columns: 1fr 1fr !important;
      }
      .dfc-tab {
        min-height: 46px !important;
        font-size: 13px !important;
        padding: 10px 8px !important;
      }
      .dfc-card {
        padding: 17px !important;
      }
    }
  `
  document.head.appendChild(style)
}
