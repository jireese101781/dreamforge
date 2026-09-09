const style = document.createElement("style")
style.id = "dreamforge-cover-display-fix"
style.textContent = `
/* Dreamforge covers use the exact 1024 × 1535 portrait ratio. */
.story-cover,
.story-cover-preview,
.library-story-cover,
.play-story-cover {
  aspect-ratio: 1024 / 1535;
}

.story-cover {
  height: auto !important;
  min-height: 0;
}

.story-cover img,
.story-cover-preview,
.library-story-cover,
.play-story-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.story-cover-preview {
  width: 150px;
  max-width: 100%;
  height: auto !important;
  aspect-ratio: 1024 / 1535;
}

.library-story-cover,
.play-story-cover {
  height: auto !important;
}
`

document.head.appendChild(style)
