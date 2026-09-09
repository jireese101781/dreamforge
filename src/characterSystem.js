const EQUIPPED_KEY = "dreamforge_equipped_character"
const ASSIGNMENTS_KEY = "dreamforge_story_characters"
const PENDING_STORY_KEY = "dreamforge_pending_story"

function readJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function getEquippedCharacter() {
  return readJSON(EQUIPPED_KEY, null)
}

function getAssignments() {
  return readJSON(ASSIGNMENTS_KEY, {})
}

function setEquippedCharacter(character) {
  if (!character) return

  saveJSON(EQUIPPED_KEY, {
    id: character.id,
    name: character.name
  })
}

function assignCharacterToStory(storyKey, character) {
  if (!storyKey || !character) return

  const assignments = getAssignments()

  // Once a story has a character, never replace it.
  if (assignments[storyKey]) return

  assignments[storyKey] = {
    characterId: character.id,
    characterName: character.name
  }

  saveJSON(ASSIGNMENTS_KEY, assignments)
}

function addCharacterStyles() {
  if (document.getElementById("dreamforge-character-system-style")) return

  const style = document.createElement("style")
  style.id = "dreamforge-character-system-style"
  style.textContent = `
    .character-equip-button {
      width: 100%;
      margin-top: 12px;
      padding: 10px 14px;
      border: 1px solid rgba(139, 92, 246, 0.45);
      border-radius: 10px;
      background: rgba(139, 92, 246, 0.12);
      color: #c4b5fd;
      font-weight: 700;
      cursor: pointer;
      transition: 0.2s ease;
    }

    .character-equip-button:hover {
      background: rgba(139, 92, 246, 0.22);
      transform: translateY(-1px);
    }

    .character-equip-button.equipped {
      background: linear-gradient(135deg, #7c3aed, #4f46e5);
      border-color: transparent;
      color: white;
      box-shadow: 0 0 20px rgba(139, 92, 246, 0.25);
    }
  `

  document.head.appendChild(style)
}

function addCharacterControls() {
  document.querySelectorAll(".character-card").forEach((card) => {
    if (card.querySelector(".character-equip-button")) return

    const heading = card.querySelector("h2")
    if (!heading) return

    const characterName = heading.textContent.trim()
    const equipped = getEquippedCharacter()
    const isEquipped = equipped?.name === characterName

    const button = document.createElement("button")
    button.type = "button"
    button.className = "character-equip-button"
    button.textContent = isEquipped ? "✓ Equipped" : "Equip"

    if (isEquipped) {
      button.classList.add("equipped")
    }

    button.addEventListener("click", (event) => {
      event.preventDefault()
      event.stopPropagation()

      setEquippedCharacter({
        id: characterName,
        name: characterName
      })

      document.querySelectorAll(".character-equip-button").forEach((item) => {
        item.textContent = "Equip"
        item.classList.remove("equipped")
      })

      button.textContent = "✓ Equipped"
      button.classList.add("equipped")
    })

    card.appendChild(button)
  })
}

function captureStoryBeforePlay(event) {
  const playButton = event.target.closest(".library-story-actions button")

  if (!playButton) return
  if (!playButton.textContent.includes("Play")) return

  const storyCard = playButton.closest(".library-story-card")
  const title = storyCard?.querySelector("h2")?.textContent?.trim()

  if (title) {
    localStorage.setItem(PENDING_STORY_KEY, title)
  }
}

function autoSelectStoryCharacter() {
  const characterCards = document.querySelectorAll(".player-character-card")

  if (!characterCards.length) return

  const storyKey = localStorage.getItem(PENDING_STORY_KEY)
  if (!storyKey) return

  const assignments = getAssignments()
  const assignment = assignments[storyKey]
  const equipped = getEquippedCharacter()
  const target = assignment || equipped

  if (!target) return

  let targetCard = null

  characterCards.forEach((card) => {
    const name = card.querySelector("h2")?.textContent?.trim()

    if (name === target.characterName || name === target.name) {
      targetCard = card
    }
  })

  if (!targetCard) return
  if (targetCard.dataset.characterSystemSelected === "true") return

  targetCard.dataset.characterSystemSelected = "true"
  targetCard.click()

  const selectedName = targetCard.querySelector("h2")?.textContent?.trim()

  if (!assignment) {
    assignCharacterToStory(storyKey, {
      id: selectedName,
      name: selectedName
    })
  }

  // The character screen is intentionally skipped for the player.
  setTimeout(() => {
    const continueButton = document.querySelector(
      ".play-character-actions .create-button"
    )

    if (continueButton) {
      continueButton.click()
    }
  }, 100)
}

function watchDreamforge() {
  addCharacterStyles()
  addCharacterControls()
  autoSelectStoryCharacter()

  document.addEventListener("click", captureStoryBeforePlay, true)

  const observer = new MutationObserver(() => {
    addCharacterControls()
    autoSelectStoryCharacter()
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", watchDreamforge)
} else {
  watchDreamforge()
}
