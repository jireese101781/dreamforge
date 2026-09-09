const COVER_WIDTH = 1024
const COVER_HEIGHT = 1535
const COVER_RATIO = COVER_WIDTH / COVER_HEIGHT
const MAX_FILE_SIZE = 5 * 1024 * 1024

let modal = null
let image = null
let zoom = 1
let offsetX = 0
let offsetY = 0
let baseScale = 1
let dragging = false
let startX = 0
let startY = 0
let startOffsetX = 0
let startOffsetY = 0

function injectStyles() {
  if (document.getElementById("dreamforge-cover-cropper-styles")) return

  const style = document.createElement("style")
  style.id = "dreamforge-cover-cropper-styles"
  style.textContent = `
    .df-crop-overlay{position:fixed;inset:0;z-index:9999;background:rgba(3,4,9,.88);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;padding:20px}
    .df-crop-modal{width:min(920px,100%);max-height:95vh;overflow:auto;background:linear-gradient(145deg,#171925,#0d0f16);border:1px solid rgba(255,255,255,.1);border-radius:22px;padding:24px;box-shadow:0 30px 100px rgba(0,0,0,.65),0 0 45px rgba(139,92,246,.12);color:#f5f5f7;font-family:Inter,Arial,sans-serif}
    .df-crop-head{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:18px}.df-crop-head h2{margin:0;font-size:22px}.df-crop-head p{margin:5px 0 0;color:#9295a5;font-size:13px;line-height:1.45}
    .df-crop-close{border:1px solid rgba(255,255,255,.08);background:#181a25;color:#fff;border-radius:10px;width:38px;height:38px;font-size:20px;cursor:pointer}.df-crop-close:hover{background:#8b5cf6}
    .df-crop-workspace{display:flex;justify-content:center;align-items:center;background:#08090d;border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:20px;min-height:520px}
    .df-crop-viewport{position:relative;width:min(400px,80vw);aspect-ratio:1024/1535;overflow:hidden;border-radius:10px;background:#111;box-shadow:0 0 0 2px rgba(139,92,246,.55),0 20px 50px rgba(0,0,0,.5);touch-action:none;cursor:grab;user-select:none}.df-crop-viewport.dragging{cursor:grabbing}
    .df-crop-image{position:absolute;max-width:none;transform-origin:center center;pointer-events:none;user-select:none}
    .df-crop-guide{position:absolute;inset:0;pointer-events:none;border:1px solid rgba(255,255,255,.3);box-shadow:inset 0 0 0 9999px rgba(0,0,0,.04)}
    .df-crop-controls{margin-top:20px}.df-crop-controls label{display:flex;justify-content:space-between;color:#b8bac6;font-size:13px;margin-bottom:8px}.df-crop-controls input[type=range]{width:100%;accent-color:#8b5cf6}
    .df-crop-size{margin-top:7px;color:#73778b;font-size:12px}
    .df-crop-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:20px}.df-crop-actions button{padding:12px 18px;border-radius:10px;border:1px solid rgba(255,255,255,.08);background:#181a25;color:#fff;cursor:pointer;font-weight:600}.df-crop-actions button:hover{border-color:rgba(150,120,255,.45);transform:translateY(-1px)}.df-crop-actions .primary{background:linear-gradient(135deg,#8b5cf6,#6d28d9);border-color:transparent}.df-crop-actions .primary:hover{box-shadow:0 8px 25px rgba(139,92,246,.3)}
    .df-crop-error{margin-top:12px;padding:10px 12px;border-radius:9px;background:rgba(255,92,115,.1);border:1px solid rgba(255,92,115,.25);color:#ff9aaa;font-size:13px;display:none}
    @media(max-width:600px){.df-crop-modal{padding:16px}.df-crop-workspace{min-height:0;padding:12px}.df-crop-head h2{font-size:19px}}
  `
  document.head.appendChild(style)
}

function clampPosition() {
  if (!image || !modal) return
  const viewport = modal.querySelector(".df-crop-viewport")
  if (!viewport) return

  const vw = viewport.clientWidth
  const vh = viewport.clientHeight
  const scale = baseScale * zoom
  const iw = image.naturalWidth * scale
  const ih = image.naturalHeight * scale

  const maxX = Math.max(0, (iw - vw) / 2)
  const maxY = Math.max(0, (ih - vh) / 2)

  offsetX = Math.max(-maxX, Math.min(maxX, offsetX))
  offsetY = Math.max(-maxY, Math.min(maxY, offsetY))
}

function renderImage() {
  if (!image || !modal) return
  const viewport = modal.querySelector(".df-crop-viewport")
  if (!viewport) return

  clampPosition()

  const scale = baseScale * zoom
  image.style.width = `${image.naturalWidth * scale}px`
  image.style.height = `${image.naturalHeight * scale}px`
  image.style.left = `calc(50% + ${offsetX}px)`
  image.style.top = `calc(50% + ${offsetY}px)`
  image.style.transform = "translate(-50%, -50%)"
}

function canvasToBlob(canvas, quality, callback) {
  canvas.toBlob(callback, "image/jpeg", quality)
}

function createCrop() {
  if (!image || !modal) return

  const viewport = modal.querySelector(".df-crop-viewport")
  const error = modal.querySelector(".df-crop-error")
  const useButton = modal.querySelector(".df-crop-use")
  if (!viewport) return

  const vw = viewport.clientWidth
  const vh = viewport.clientHeight
  const scale = baseScale * zoom
  const displayedWidth = image.naturalWidth * scale
  const displayedHeight = image.naturalHeight * scale

  const sourceX = (displayedWidth / 2 - offsetX - vw / 2) / scale
  const sourceY = (displayedHeight / 2 - offsetY - vh / 2) / scale
  const sourceW = vw / scale
  const sourceH = vh / scale

  const canvas = document.createElement("canvas")
  canvas.width = COVER_WIDTH
  canvas.height = COVER_HEIGHT
  const ctx = canvas.getContext("2d")

  ctx.drawImage(
    image,
    sourceX,
    sourceY,
    sourceW,
    sourceH,
    0,
    0,
    COVER_WIDTH,
    COVER_HEIGHT
  )

  useButton.disabled = true
  useButton.textContent = "Processing..."

  canvasToBlob(canvas, .92, (blob) => {
    if (!blob) {
      useButton.disabled = false
      useButton.textContent = "Use This Cover"
      error.textContent = "Could not process this image. Please try another image."
      error.style.display = "block"
      return
    }

    if (blob.size > MAX_FILE_SIZE) {
      canvasToBlob(canvas, .82, (smallerBlob) => finishCrop(smallerBlob, error, useButton))
      return
    }

    finishCrop(blob, error, useButton)
  })
}

function finishCrop(blob, error, useButton) {
  if (!blob) {
    useButton.disabled = false
    useButton.textContent = "Use This Cover"
    error.textContent = "Could not process this image. Please try another image."
    error.style.display = "block"
    return
  }

  if (blob.size > MAX_FILE_SIZE) {
    useButton.disabled = false
    useButton.textContent = "Use This Cover"
    error.textContent = "The cropped image is still larger than 5 MB. Please zoom out or use a different image."
    error.style.display = "block"
    return
  }

  const input = window.__dreamforgeCropInput
  if (!input) {
    closeCropper()
    return
  }

  const file = new File([blob], "dreamforge-cover.jpg", {
    type: "image/jpeg",
    lastModified: Date.now()
  })

  closeCropper()

  const dataTransfer = new DataTransfer()
  dataTransfer.items.add(file)
  input.files = dataTransfer.files

  input.dataset.dreamforgeCropped = "true"
  input.dispatchEvent(new Event("change", { bubbles: true }))
}

function closeCropper() {
  if (modal) modal.remove()
  modal = null
  image = null
  window.__dreamforgeCropInput = null
  document.body.style.overflow = ""
}

function openCropper(src, input) {
  injectStyles()
  window.__dreamforgeCropInput = input

  modal = document.createElement("div")
  modal.className = "df-crop-overlay"
  modal.innerHTML = `
    <div class="df-crop-modal" role="dialog" aria-modal="true" aria-label="Crop cover image">
      <div class="df-crop-head">
        <div>
          <h2>✂️ Crop Cover</h2>
          <p>Position your image exactly how you want it. Dreamforge covers are 1024 × 1535.</p>
        </div>
        <button class="df-crop-close" type="button" aria-label="Close">×</button>
      </div>
      <div class="df-crop-workspace">
        <div class="df-crop-viewport">
          <img class="df-crop-image" alt="Cover crop preview" draggable="false" />
          <div class="df-crop-guide"></div>
        </div>
      </div>
      <div class="df-crop-controls">
        <label><span>Zoom</span><span class="df-crop-zoom-value">100%</span></label>
        <input class="df-crop-zoom" type="range" min="1" max="3" step="0.01" value="1" />
        <div class="df-crop-size">Final cover: 1024 × 1535 • Maximum file size: 5 MB</div>
      </div>
      <div class="df-crop-error"></div>
      <div class="df-crop-actions">
        <button class="df-crop-cancel" type="button">Cancel</button>
        <button class="df-crop-use primary" type="button">Use This Cover</button>
      </div>
    </div>
  `

  document.body.appendChild(modal)
  document.body.style.overflow = "hidden"

  image = modal.querySelector(".df-crop-image")
  const viewport = modal.querySelector(".df-crop-viewport")
  const zoomInput = modal.querySelector(".df-crop-zoom")
  const zoomValue = modal.querySelector(".df-crop-zoom-value")

  image.onload = () => {
    const vw = viewport.clientWidth
    const vh = viewport.clientHeight
    baseScale = Math.max(vw / image.naturalWidth, vh / image.naturalHeight)
    zoom = 1
    offsetX = 0
    offsetY = 0
    renderImage()
  }

  image.src = src

  zoomInput.addEventListener("input", () => {
    const previousScale = baseScale * zoom
    const centerX = previousScale ? offsetX / previousScale : 0
    const centerY = previousScale ? offsetY / previousScale : 0
    zoom = Number(zoomInput.value)
    const nextScale = baseScale * zoom
    offsetX = centerX * nextScale
    offsetY = centerY * nextScale
    zoomValue.textContent = `${Math.round(zoom * 100)}%`
    renderImage()
  })

  viewport.addEventListener("pointerdown", (event) => {
    dragging = true
    viewport.classList.add("dragging")
    viewport.setPointerCapture(event.pointerId)
    startX = event.clientX
    startY = event.clientY
    startOffsetX = offsetX
    startOffsetY = offsetY
  })

  viewport.addEventListener("pointermove", (event) => {
    if (!dragging) return
    offsetX = startOffsetX + event.clientX - startX
    offsetY = startOffsetY + event.clientY - startY
    renderImage()
  })

  const stopDragging = () => {
    dragging = false
    viewport.classList.remove("dragging")
  }

  viewport.addEventListener("pointerup", stopDragging)
  viewport.addEventListener("pointercancel", stopDragging)

  modal.querySelector(".df-crop-close").addEventListener("click", closeCropper)
  modal.querySelector(".df-crop-cancel").addEventListener("click", closeCropper)
  modal.querySelector(".df-crop-use").addEventListener("click", createCrop)
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeCropper()
  })
}

function handleCoverInput(event) {
  const input = event.target
  if (!(input instanceof HTMLInputElement)) return
  if (input.type !== "file" || input.accept !== "image/*") return

  const wrapper = input.closest(".story-cover-upload")
  if (!wrapper) return

  if (input.dataset.dreamforgeCropped === "true") {
    delete input.dataset.dreamforgeCropped
    return
  }

  const file = input.files?.[0]
  if (!file || !file.type.startsWith("image/")) return

  event.preventDefault()
  event.stopImmediatePropagation()

  const reader = new FileReader()
  reader.onload = () => openCropper(reader.result, input)
  reader.readAsDataURL(file)
}

document.addEventListener("change", handleCoverInput, true)
