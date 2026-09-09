import { useState } from "react"
import BottomNav from "./components/BottomNav"
import StoryCard from "./components/StoryCard"

const starterStories = [
  {
    title: "The Last Shinobi",
    genre: "Action",
    category: "Action",
    description: "A young warrior discovers a hidden power."
  },
  {
    title: "Moonlit Hearts",
    genre: "Romance",
    category: "Romance",
    description: "Two strangers meet beneath the night sky."
  },
  {
    title: "Kingdom of Ash",
    genre: "Fantasy",
    category: "Fantasy",
    description: "A forgotten kingdom begins to awaken."
  },
  {
    title: "Demon's Oath",
    genre: "Dark Fantasy",
    category: "Fantasy",
    description: "A cursed warrior makes a dangerous pact."
  },
  {
    title: "Cyber Tokyo",
    genre: "Sci-Fi",
    category: "Action",
    description: "A hacker uncovers a secret buried beneath the city."
  },
  {
    title: "Summer Promise",
    genre: "Romance",
    category: "Romance",
    description: "A summer friendship slowly becomes something more."
  },
  {
    title: "Across the Stars",
    genre: "Romance",
    category: "Romance",
    description: "Two souls meet across impossible worlds."
  },
  {
    title: "Warborn",
    genre: "Action",
    category: "Action",
    description: "A forgotten soldier rises from the ruins."
  },
  {
    title: "Dragon Hunter",
    genre: "Action",
    category: "Action",
    description: "A lone hunter takes on creatures thought extinct."
  },
  {
    title: "The Arcane Crown",
    genre: "Fantasy",
    category: "Fantasy",
    description: "A mysterious crown chooses an unlikely heir."
  },
  {
    title: "Realm of Dragons",
    genre: "Fantasy",
    category: "Fantasy",
    description: "An ancient dragon awakens beneath the mountains."
  },
  {
    title: "Blood Moon",
    genre: "Dark Fantasy",
    category: "Fantasy",
    description: "A strange moon appears over a cursed kingdom."
  }
]

function StorySection({ title, icon, category, onSeeAll }) {
  const sectionStories = starterStories.filter(
    (story) => story.category === category
  )

  return (
    <section>
      <div className="section-header">
        <h2>
          {icon} {title}
        </h2>

        <button onClick={() => onSeeAll(category)}>
          See All →
        </button>
      </div>

      <div className="story-row">
        {sectionStories.map((story) => (
          <StoryCard
            key={story.title}
            title={story.title}
            genre={story.genre}
            description={story.description}
          />
        ))}
      </div>
    </section>
  )
}

/* =========================
   CATEGORIES
========================= */

function CategoriesPage({ onNavigate }) {
  const categories = [
    ["🔥", "Action"],
    ["❤️", "Romance"],
    ["🧙", "Fantasy"],
    ["🚀", "Sci-Fi"],
    ["👻", "Horror"],
    ["😂", "Comedy"],
    ["🏫", "School"],
    ["🎭", "Drama"]
  ]

  return (
    <main>
      <h1>Categories</h1>

      <div className="category-grid">
        {categories.map(([icon, name]) => (
          <button
            key={name}
            onClick={() => onNavigate(name)}
          >
            <span>{icon}</span>
            {name}
          </button>
        ))}
      </div>
    </main>
  )
}

/* =========================
   MULTIPLAYER
========================= */

function MultiplayerPage() {
  return (
    <main>
      <h1>👥 Multiplayer</h1>

      <p>
        Play interactive stories together with other players.
      </p>

      <div className="multiplayer-options">
        <button>＋ Create Party</button>
        <button>🔗 Join Party</button>
      </div>

      <h2>🔥 Popular Multiplayer Stories</h2>

      <p>
        Multiplayer stories will appear here.
      </p>
    </main>
  )
}

/* =========================
   CHARACTER CREATOR
========================= */

function CharacterCreator({
  onBack,
  onCreate,
  editingCharacter
}) {
  const [advanced, setAdvanced] = useState(
    editingCharacter?.advanced || false
  )

  const [name, setName] = useState(
    editingCharacter?.name || ""
  )

  const [age, setAge] = useState(
    editingCharacter?.age || ""
  )

  const [gender, setGender] = useState(
    editingCharacter?.gender || ""
  )

  const [appearance, setAppearance] = useState(
    editingCharacter?.appearance || ""
  )

  const [personality, setPersonality] = useState(
    editingCharacter?.personality || ""
  )

  const [avatar, setAvatar] = useState(
    editingCharacter?.avatar || ""
  )

  const [backstory, setBackstory] = useState(
    editingCharacter?.backstory || ""
  )

  const [abilities, setAbilities] = useState(
    editingCharacter?.abilities || ""
  )

  const [goals, setGoals] = useState(
    editingCharacter?.goals || ""
  )

  const [fears, setFears] = useState(
    editingCharacter?.fears || ""
  )

  const [likes, setLikes] = useState(
    editingCharacter?.likes || ""
  )

  const [dislikes, setDislikes] = useState(
    editingCharacter?.dislikes || ""
  )

  const [speechStyle, setSpeechStyle] = useState(
    editingCharacter?.speechStyle || ""
  )

  const [relationships, setRelationships] = useState(
    editingCharacter?.relationships || ""
  )

  const [secrets, setSecrets] = useState(
    editingCharacter?.secrets || ""
  )

  const [extraNotes, setExtraNotes] = useState(
    editingCharacter?.extraNotes || ""
  )

  function handleAvatarUpload(event) {
    const file = event.target.files[0]

    if (!file) return

    const reader = new FileReader()

    reader.onload = () => {
      setAvatar(reader.result)
    }

    reader.readAsDataURL(file)
  }

  function saveCharacter() {
    if (!name.trim()) {
      alert("Please enter a character name.")
      return
    }

    onCreate({
      id: editingCharacter?.id || Date.now(),
      name,
      age,
      gender,
      appearance,
      personality,
      avatar,
      advanced,
      backstory,
      abilities,
      goals,
      fears,
      likes,
      dislikes,
      speechStyle,
      relationships,
      secrets,
      extraNotes
    })
  }

  return (
    <main>
      <button onClick={onBack}>← Back</button>

      <h1>
        {editingCharacter
          ? "✏️ Edit Character"
          : "✨ Create Character"}
      </h1>

      <p className="creator-description">
        Create a simple character or open Advanced Settings
        for deeper customization.
      </p>

      <div className="character-form">

        <label>Name *</label>

        <input
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          placeholder="Character name"
        />

        <label>Age</label>

        <input
          type="number"
          value={age}
          onChange={(event) =>
            setAge(event.target.value)
          }
          placeholder="Character age"
        />

        <label>Gender</label>

        <select
          value={gender}
          onChange={(event) =>
            setGender(event.target.value)
          }
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Non-binary">Non-binary</option>
          <option value="Other">Other</option>
          <option value="Prefer not to say">
            Prefer not to say
          </option>
        </select>

        <label>Avatar</label>

        <div className="avatar-upload">
          {avatar ? (
            <img
              src={avatar}
              alt={name || "Character"}
              className="avatar-preview"
            />
          ) : (
            <div className="avatar-placeholder">
              👤
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
          />
        </div>

        <label>Appearance</label>

        <textarea
          value={appearance}
          onChange={(event) =>
            setAppearance(event.target.value)
          }
          placeholder="Describe their appearance..."
        />

        <label>Personality</label>

        <textarea
          value={personality}
          onChange={(event) =>
            setPersonality(event.target.value)
          }
          placeholder="Describe their personality..."
        />

        <button
          type="button"
          className="advanced-toggle"
          onClick={() => setAdvanced(!advanced)}
        >
          ⚙️ {advanced ? "Hide" : "Show"} Advanced Settings
          <span>{advanced ? "▲" : "▼"}</span>
        </button>

        {advanced && (
          <div className="advanced-settings">

            <div className="advanced-title">
              <h2>⚙️ Advanced Character Settings</h2>

              <p>
                Optional fields for detailed characters,
                RPGs, and deeper storytelling.
              </p>
            </div>

            <label>📖 Backstory</label>

            <textarea
              value={backstory}
              onChange={(event) =>
                setBackstory(event.target.value)
              }
              placeholder="Where did they come from? What happened to them?"
            />

            <label>⚔️ Abilities</label>

            <textarea
              value={abilities}
              onChange={(event) =>
                setAbilities(event.target.value)
              }
              placeholder="Powers, skills, weapons, talents..."
            />

            <label>🎯 Goals</label>

            <textarea
              value={goals}
              onChange={(event) =>
                setGoals(event.target.value)
              }
              placeholder="What does this character want?"
            />

            <label>😨 Fears</label>

            <textarea
              value={fears}
              onChange={(event) =>
                setFears(event.target.value)
              }
              placeholder="What are they afraid of?"
            />

            <label>❤️ Likes</label>

            <textarea
              value={likes}
              onChange={(event) =>
                setLikes(event.target.value)
              }
              placeholder="Things they enjoy..."
            />

            <label>💢 Dislikes</label>

            <textarea
              value={dislikes}
              onChange={(event) =>
                setDislikes(event.target.value)
              }
              placeholder="Things they dislike..."
            />

            <label>🗣️ Speech Style</label>

            <textarea
              value={speechStyle}
              onChange={(event) =>
                setSpeechStyle(event.target.value)
              }
              placeholder="How do they talk?"
            />

            <label>👥 Relationships</label>

            <textarea
              value={relationships}
              onChange={(event) =>
                setRelationships(event.target.value)
              }
              placeholder="Friends, enemies, family..."
            />

            <label>🔒 Secrets</label>

            <textarea
              value={secrets}
              onChange={(event) =>
                setSecrets(event.target.value)
              }
              placeholder="Secrets the character keeps hidden..."
            />

            <label>📝 Extra Notes</label>

            <textarea
              value={extraNotes}
              onChange={(event) =>
                setExtraNotes(event.target.value)
              }
              placeholder="Anything else the AI should know..."
            />

          </div>
        )}

        <button
          className="create-button"
          onClick={saveCharacter}
        >
          {editingCharacter
            ? "Save Changes"
            : "Create Character"}
        </button>

      </div>
    </main>
  )
}

/* =========================
   CHARACTER CARD
========================= */

function CharacterCard({
  character,
  onEdit,
  onDelete
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="character-card">

      {character.avatar ? (
        <img
          src={character.avatar}
          alt={character.name}
          className="character-card-image"
        />
      ) : (
        <div className="character-avatar">
          👤
        </div>
      )}

      <h2>{character.name}</h2>

      {character.age && (
        <p>Age: {character.age}</p>
      )}

      {character.gender && (
        <p>Gender: {character.gender}</p>
      )}

      {character.personality && (
        <p>{character.personality}</p>
      )}

      {character.advanced && (
        <div className="advanced-badge">
          ⚙️ Advanced
        </div>
      )}

      <button
        className="character-menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ⋯
      </button>

      {menuOpen && (
        <div className="character-menu">

          <button
            onClick={() => {
              setMenuOpen(false)
              onEdit(character)
            }}
          >
            ✏️ Edit
          </button>

          <button
            className="delete-option"
            onClick={() => {
              setMenuOpen(false)
              onDelete(character.id)
            }}
          >
            🗑️ Delete
          </button>

        </div>
      )}

    </div>
  )
}

/* =========================
   CHARACTERS PAGE
========================= */

function CharactersPage({
  characters,
  onCreate,
  onDelete
}) {
  const [creating, setCreating] = useState(false)
  const [editingCharacter, setEditingCharacter] =
    useState(null)

  function startEditing(character) {
    setEditingCharacter(character)
    setCreating(true)
  }

  function saveCharacter(character) {
    onCreate(character)
    setCreating(false)
    setEditingCharacter(null)
  }

  if (creating) {
    return (
      <CharacterCreator
        editingCharacter={editingCharacter}
        onBack={() => {
          setCreating(false)
          setEditingCharacter(null)
        }}
        onCreate={saveCharacter}
      />
    )
  }

  return (
    <main>

      <div className="page-header">

        <div>
          <h1>👤 Characters</h1>
          <p>Your reusable Dreamforge characters.</p>
        </div>

        <button onClick={() => setCreating(true)}>
          ＋ Create Character
        </button>

      </div>

      {characters.length === 0 ? (
        <div className="empty-state">

          <h2>No Characters Yet</h2>

          <p>
            Create your first character and use them
            across your stories.
          </p>

          <button onClick={() => setCreating(true)}>
            ＋ Create Your First Character
          </button>

        </div>
      ) : (
        <div className="character-grid">

          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onEdit={startEditing}
              onDelete={onDelete}
            />
          ))}

        </div>
      )}

    </main>
  )
}

/* =========================
   STORY CREATOR
========================= */

function StoryCreator({
  onBack,
  onSave,
  editingStory
}) {
  const [advanced, setAdvanced] = useState(
    editingStory?.advanced || false
  )

  const [title, setTitle] = useState(
    editingStory?.title || ""
  )

  const [cover, setCover] = useState(
    editingStory?.cover || ""
  )

  const [description, setDescription] = useState(
    editingStory?.description || ""
  )

  const [genre, setGenre] = useState(
    editingStory?.genre || ""
  )

  const [world, setWorld] = useState(
    editingStory?.world || ""
  )

  const [tone, setTone] = useState(
    editingStory?.tone || ""
  )

  const [prologue, setPrologue] = useState(
    editingStory?.prologue || ""
  )

  const [lore, setLore] = useState(
    editingStory?.lore || ""
  )

  const [worldHistory, setWorldHistory] = useState(
    editingStory?.worldHistory || ""
  )

  const [rules, setRules] = useState(
    editingStory?.rules || ""
  )

  const [aiInstructions, setAiInstructions] =
    useState(editingStory?.aiInstructions || "")

  const [characterBehavior, setCharacterBehavior] =
    useState(editingStory?.characterBehavior || "")

  const [healthSystem, setHealthSystem] =
    useState(editingStory?.healthSystem || "")

  const [customStats, setCustomStats] =
    useState(editingStory?.customStats || "")

  const [customMeters, setCustomMeters] =
    useState(editingStory?.customMeters || "")

  const [inventory, setInventory] =
    useState(editingStory?.inventory || "")

  const [events, setEvents] =
    useState(editingStory?.events || "")

  const [media, setMedia] =
    useState(editingStory?.media || [])

  function handleCoverUpload(event) {
    const file = event.target.files[0]

    if (!file) return

    const reader = new FileReader()

    reader.onload = () => {
      setCover(reader.result)
    }

    reader.readAsDataURL(file)
  }

  function handleMediaUpload(event) {
    const files = Array.from(event.target.files)

    files.forEach((file) => {
      const reader = new FileReader()

      reader.onload = () => {
        setMedia((current) => [
          ...current,
          {
            id: Date.now() + Math.random(),
            name: file.name,
            type: file.type,
            data: reader.result,
            trigger: ""
          }
        ])
      }

      reader.readAsDataURL(file)
    })
  }

  function removeMedia(id) {
    setMedia((current) =>
      current.filter((item) => item.id !== id)
    )
  }

  function updateMediaTrigger(id, trigger) {
    setMedia((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, trigger }
          : item
      )
    )
  }

  function saveStory() {
    if (!title.trim()) {
      alert("Please enter a story title.")
      return
    }

    if (!genre) {
      alert("Please select a genre.")
      return
    }

    if (!prologue.trim()) {
      alert("Please write a prologue.")
      return
    }

    onSave({
      id: editingStory?.id || Date.now(),
      title,
      cover,
      description,
      genre,
      category: genre,
      world,
      tone,
      prologue,
      advanced,
      lore,
      worldHistory,
      rules,
      aiInstructions,
      characterBehavior,
      healthSystem,
      customStats,
      customMeters,
      inventory,
      events,
      media,
      createdAt:
        editingStory?.createdAt || Date.now()
    })
  }

  return (
    <main>

      <button onClick={onBack}>
        ← Back
      </button>

      <h1>
        {editingStory
          ? "✏️ Edit Story"
          : "✨ Create Story"}
      </h1>

      <p className="creator-description">
        Build your world, write the opening, and decide
        how Dreamforge should handle your story.
      </p>

      <div className="story-creator-form">

        <label>Story Title *</label>

        <input
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          placeholder="Enter your story title..."
        />

        <label>Cover Image</label>

        <div className="story-cover-upload">

          {cover ? (
            <img
              src={cover}
              alt="Story cover"
              className="story-cover-preview"
            />
          ) : (
            <div className="story-cover-placeholder">
              🖼️
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleCoverUpload}
          />

        </div>

        <label>Description</label>

        <textarea
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          placeholder="What is this story about?"
        />

        <label>Genre *</label>

        <select
          value={genre}
          onChange={(event) =>
            setGenre(event.target.value)
          }
        >
          <option value="">Select genre</option>
          <option value="Action">Action</option>
          <option value="Romance">Romance</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Horror">Horror</option>
          <option value="Comedy">Comedy</option>
          <option value="School">School</option>
          <option value="Drama">Drama</option>
          <option value="Mystery">Mystery</option>
          <option value="Adventure">Adventure</option>
        </select>

        <label>🌎 World / Setting</label>

        <textarea
          value={world}
          onChange={(event) =>
            setWorld(event.target.value)
          }
          placeholder="Describe where and when the story takes place..."
        />

        <label>🎨 Tone / Style</label>

        <textarea
          value={tone}
          onChange={(event) =>
            setTone(event.target.value)
          }
          placeholder="Dark, funny, emotional, cinematic..."
        />

        <label>🎬 Prologue *</label>

        <textarea
          className="prologue-input"
          value={prologue}
          onChange={(event) =>
            setPrologue(event.target.value)
          }
          placeholder="Write the actual opening of your story..."
        />

        <div className="prologue-help">
          💡 The Prologue is the true beginning of your
          story. Dreamforge treats it as the starting
          point when the player begins.
        </div>

        <button
          type="button"
          className="advanced-toggle"
          onClick={() => setAdvanced(!advanced)}
        >
          ⚙️ {advanced ? "Hide" : "Show"} Advanced Settings
          <span>{advanced ? "▲" : "▼"}</span>
        </button>

        {advanced && (
          <div className="advanced-settings">

            <div className="advanced-title">
              <h2>⚙️ Advanced Story Settings</h2>

              <p>
                Give creators more control over their
                story and RPG systems.
              </p>
            </div>

            <label>📜 World Lore</label>

            <textarea
              value={lore}
              onChange={(event) =>
                setLore(event.target.value)
              }
              placeholder="Magic systems, factions, mythology..."
            />

            <label>🌎 World History</label>

            <textarea
              value={worldHistory}
              onChange={(event) =>
                setWorldHistory(event.target.value)
              }
              placeholder="Important historical events..."
            />

            <label>📋 Story Rules</label>

            <textarea
              value={rules}
              onChange={(event) =>
                setRules(event.target.value)
              }
              placeholder="Rules the AI should always follow..."
            />

            <label>🤖 Story Prompt</label>

            <textarea
              value={aiInstructions}
              onChange={(event) =>
                setAiInstructions(event.target.value)
              }
              placeholder="Tell the AI how to run and narrate your story..."
            />

            <label>🎭 Character Behavior</label>

            <textarea
              value={characterBehavior}
              onChange={(event) =>
                setCharacterBehavior(event.target.value)
              }
              placeholder="How should NPCs behave?"
            />

            <label>❤️ Health System</label>

            <textarea
              value={healthSystem}
              onChange={(event) =>
                setHealthSystem(event.target.value)
              }
              placeholder="Describe how health works..."
            />

            <label>📊 Custom Stats</label>

            <textarea
              value={customStats}
              onChange={(event) =>
                setCustomStats(event.target.value)
              }
              placeholder="Strength, magic, charisma..."
            />

            <label>📏 Custom Meters</label>

            <textarea
              value={customMeters}
              onChange={(event) =>
                setCustomMeters(event.target.value)
              }
              placeholder="Relationship, corruption, hunger..."
            />

            <label>🎒 Inventory</label>

            <textarea
              value={inventory}
              onChange={(event) =>
                setInventory(event.target.value)
              }
              placeholder="How should inventory work?"
            />

            <label>⚡ Events & Triggers</label>

            <textarea
              value={events}
              onChange={(event) =>
                setEvents(event.target.value)
              }
              placeholder="Special events or conditions..."
            />

            <div className="media-section">

              <h2>🎞️ Media Library</h2>

              <p>
                Upload images for characters, locations,
                items, scenes, maps, or anything else.
              </p>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleMediaUpload}
              />

              {media.length > 0 && (
                <div className="media-grid">

                  {media.map((item) => (
                    <div
                      className="media-item"
                      key={item.id}
                    >

                      <img
                        src={item.data}
                        alt={item.name}
                      />

                      <strong>
                        {item.name}
                      </strong>

                      <input
                        value={item.trigger}
                        onChange={(event) =>
                          updateMediaTrigger(
                            item.id,
                            event.target.value
                          )
                        }
                        placeholder="When should this appear?"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeMedia(item.id)
                        }
                      >
                        🗑️ Remove
                      </button>

                    </div>
                  ))}

                </div>
              )}

            </div>

          </div>
        )}

        <button
          className="create-button"
          onClick={saveStory}
        >
          {editingStory
            ? "Save Story Changes"
            : "✨ Create Story"}
        </button>

      </div>
    </main>
  )
}

/* =========================
   PLAY STORY
========================= */

function CharacterSelector({
  characters,
  onSelect,
  onCreate,
  onBack
}) {
  const [selectedId, setSelectedId] = useState(null)

  function continueWithCharacter() {
    if (!selectedId) {
      alert("Please choose a character.")
      return
    }

    const character = characters.find(
      (item) => item.id === selectedId
    )

    if (character) {
      onSelect(character)
    }
  }

  return (
    <main className="play-page">

      <button onClick={onBack}>
        ← Back to Library
      </button>

      <div className="play-header">
        <h1>👤 Choose Your Character</h1>

        <p>
          Who will you become in this adventure?
        </p>
      </div>

      {characters.length === 0 ? (
        <div className="empty-state">

          <h2>You Don't Have Any Characters Yet</h2>

          <p>
            Create a character to begin your adventure.
          </p>

          <button onClick={onCreate}>
            ✨ Create Character
          </button>

        </div>
      ) : (
        <>
          <div className="player-character-grid">

            {characters.map((character) => (
              <button
                key={character.id}
                className={
                  selectedId === character.id
                    ? "player-character-card selected"
                    : "player-character-card"
                }
                onClick={() =>
                  setSelectedId(character.id)
                }
              >

                {character.avatar ? (
                  <img
                    src={character.avatar}
                    alt={character.name}
                  />
                ) : (
                  <div className="player-character-avatar">
                    👤
                  </div>
                )}

                <h2>{character.name}</h2>

                {character.age && (
                  <span>
                    Age {character.age}
                  </span>
                )}

                {selectedId === character.id && (
                  <strong>✓ Selected</strong>
                )}

              </button>
            ))}

          </div>

          <div className="play-character-actions">

            <button
              className="create-button"
              onClick={continueWithCharacter}
            >
              ▶ Continue
            </button>

            <button onClick={onCreate}>
              ＋ Create New Character
            </button>

          </div>
        </>
      )}

    </main>
  )
}

/* =========================
   PROLOGUE
========================= */

function PrologueScreen({
  story,
  character,
  onBegin,
  onBack
}) {
  return (
    <main className="play-page">

      <button onClick={onBack}>
        ← Change Character
      </button>

      <div className="prologue-screen">

        {story.cover && (
          <img
            src={story.cover}
            alt={story.title}
            className="play-story-cover"
          />
        )}

        <h1>{story.title}</h1>

        <p className="story-genre">
          {story.genre}
        </p>

        <div className="player-intro">
          <strong>You are playing as:</strong>
          <span>{character.name}</span>
        </div>

        <div className="prologue-story">

          <h2>🎬 Prologue</h2>

          <p>
            {story.prologue}
          </p>

        </div>

        <button
          className="begin-adventure-button"
          onClick={onBegin}
        >
          ⚔️ Begin Adventure
        </button>

      </div>

    </main>
  )
}

/* =========================
   STORY GAME
========================= */

function StoryGame({
  story,
  character,
  messages,
  onSend,
  onExit
}) {
  const [input, setInput] = useState("")

  function sendMessage() {
    const text = input.trim()

    if (!text) return

    onSend(text)

    setInput("")
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  return (
    <main className="story-game">

      <header className="story-game-header">

        <div>
          <strong>{story.title}</strong>

          <span>
            Playing as {character.name}
          </span>
        </div>

        <button onClick={onExit}>
          🚪 Exit
        </button>

      </header>

      <div className="story-game-content">

        {messages.map((message) => (
          <div
            key={message.id}
            className={
              message.type === "player"
                ? "story-message player-message"
                : "story-message ai-message"
            }
          >

            <div className="message-name">
              {message.type === "player"
                ? character.name
                : "Dreamforge"}
            </div>

            <div className="message-text">
              {message.text}
            </div>

          </div>
        ))}

      </div>

      <div className="story-input-area">

        <textarea
          value={input}
          onChange={(event) =>
            setInput(event.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="What do you do?"
        />

        <button
          onClick={sendMessage}
          disabled={!input.trim()}
        >
          ➤
        </button>

      </div>

      <div className="story-input-help">
        Press Enter to send • Shift + Enter for a new line
      </div>

    </main>
  )
}

/* =========================
   LIBRARY
========================= */

function LibraryPage({
  stories,
  onCreate,
  onDelete,
  onPlay
}) {
  const [creating, setCreating] = useState(false)
  const [editingStory, setEditingStory] = useState(null)

  function saveStory(story) {
    onCreate(story)
    setCreating(false)
    setEditingStory(null)
  }

  function editStory(story) {
    setEditingStory(story)
    setCreating(true)
  }

  if (creating) {
    return (
      <StoryCreator
        editingStory={editingStory}
        onBack={() => {
          setCreating(false)
          setEditingStory(null)
        }}
        onSave={saveStory}
      />
    )
  }

  return (
    <main>

      <div className="page-header">

        <div>
          <h1>📖 My Library</h1>

          <p>
            Your created stories and adventures.
          </p>
        </div>

        <button onClick={() => setCreating(true)}>
          ＋ Create Story
        </button>

      </div>

      {stories.length === 0 ? (

        <div className="empty-state">

          <h2>Your Library Is Empty</h2>

          <p>
            Create your first interactive story.
          </p>

          <button onClick={() => setCreating(true)}>
            ✨ Create Your First Story
          </button>

        </div>

      ) : (

        <div className="library-story-grid">

          {stories.map((story) => (

            <div
              className="library-story-card"
              key={story.id}
            >

              {story.cover ? (
                <img
                  src={story.cover}
                  alt={story.title}
                  className="library-story-cover"
                />
              ) : (
                <div className="library-story-placeholder">
                  📖
                </div>
              )}

              <div className="library-story-info">

                <h2>{story.title}</h2>

                <p className="story-genre">
                  {story.genre}
                </p>

                <p>
                  {story.description ||
                    "No description added."}
                </p>

                <div className="library-story-actions">

                  <button
                    onClick={() => onPlay(story)}
                  >
                    ▶ Play
                  </button>

                  <button
                    onClick={() => editStory(story)}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    className="delete-option"
                    onClick={() => onDelete(story.id)}
                  >
                    🗑️ Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </main>
  )
}

/* =========================
   SETTINGS
========================= */

function SettingsPage() {
  return (
    <main>
      <h1>⚙️ Settings</h1>

      <p>
        Manage your Dreamforge account and preferences.
      </p>
    </main>
  )
}

/* =========================
   COIN STORE
========================= */

function CoinStore({ onClose }) {
  return (
    <div className="coin-store-overlay">

      <div className="coin-store">

        <button
          className="close-button"
          onClick={onClose}
        >
          ✕
        </button>

        <h1>💰 Coin Store</h1>

        <p>
          Get more coins to continue your adventures.
        </p>

        <div className="coin-packages">

          <button>
            <strong>100 Coins</strong>
            <span>$0.99</span>
          </button>

          <button>
            <strong>500 Coins</strong>
            <span>$4.99</span>
          </button>

          <button>
            <strong>1,000 Coins</strong>
            <span>$8.99</span>
          </button>

          <button>
            <strong>2,500 Coins</strong>
            <span>$19.99</span>
          </button>

        </div>

      </div>

    </div>
  )
}

/* =========================
   APP
========================= */

function App() {
  const [page, setPage] = useState("home")

  const [selectedCategory, setSelectedCategory] =
    useState(null)

  const [coins, setCoins] = useState(50)

  const [showCoinStore, setShowCoinStore] =
    useState(false)

  const [characters, setCharacters] = useState(() => {
    try {
      const saved =
        localStorage.getItem(
          "dreamforge_characters"
        )

      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [userStories, setUserStories] = useState(() => {
    try {
      const saved =
        localStorage.getItem(
          "dreamforge_stories"
        )

      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  /* =========================
     PLAY STATE
  ========================= */

  const [playingStory, setPlayingStory] =
    useState(null)

  const [playerCharacter, setPlayerCharacter] =
    useState(null)

  const [playStage, setPlayStage] =
    useState(null)

  const [storyMessages, setStoryMessages] =
    useState([])

  function saveCharacters(updatedCharacters) {
    setCharacters(updatedCharacters)

    localStorage.setItem(
      "dreamforge_characters",
      JSON.stringify(updatedCharacters)
    )
  }

  function saveStories(updatedStories) {
    setUserStories(updatedStories)

    localStorage.setItem(
      "dreamforge_stories",
      JSON.stringify(updatedStories)
    )
  }

  /* =========================
     PLAY STORY FUNCTIONS
  ========================= */

  function startPlayingStory(story) {
    setPlayingStory(story)
    setPlayerCharacter(null)
    setStoryMessages([])
    setPlayStage("character")
    setPage("play")
  }

  function createPlayerCharacter() {
    setPage("characters")
  }

  function choosePlayerCharacter(character) {
    setPlayerCharacter(character)
    setPlayStage("prologue")
  }

  function beginAdventure() {
  if (!playingStory || !playerCharacter) {
    return
  }

  const stateKey =
    `dreamforge_state_${playingStory.id}_${playerCharacter.id}`

  const initialState = {
    health: 100,
    maxHealth: 100,
    location: "Starting Area",
    inventory: [],
    stats: {},
    flags: {},
    discovered: [],
    turn: 0
  }

  localStorage.setItem(
    stateKey,
    JSON.stringify(initialState)
  )

  const startingMessage = {
    id: Date.now(),
    type: "ai",
    text:
      `${playingStory.prologue}\n\n` +
      `${playerCharacter.name} is now at the center of the story. ` +
      `What happens next depends on your choices.`
  }

  setStoryMessages([startingMessage])
  setPlayStage("game")

  const saveKey =
    `dreamforge_progress_${playingStory.id}`

  localStorage.setItem(
    saveKey,
    JSON.stringify({
      storyId: playingStory.id,
      characterId: playerCharacter.id,
      messages: [startingMessage],
      updatedAt: Date.now()
    })
  )
}
function generateLocalStoryResponse(text) {
  const story = playingStory
  const character = playerCharacter

  if (!story || !character) {
    return "Something went wrong. Please restart the adventure."
  }

  const action = text.toLowerCase().trim()

  // Basic persistent story state
  const stateKey = `dreamforge_state_${story.id}_${character.id}`

  let state = JSON.parse(
    localStorage.getItem(stateKey) ||
      JSON.stringify({
        health: 100,
        maxHealth: 100,
        location: "Starting Area",
        inventory: [],
        stats: {},
        flags: {},
        discovered: [],
        turn: 0
      })
  )

  state.turn += 1

  let response = ""

  // --------------------------------------------------
  // LOOK / OBSERVE
  // --------------------------------------------------

  if (
    action.includes("look") ||
    action.includes("observe") ||
    action.includes("search") ||
    action.includes("examine")
  ) {
    response =
      `${character.name} carefully examines the surroundings.\n\n`

    if (story.world) {
      response += `${story.world}\n\n`
    }

    if (story.tone) {
      response +=
        `The atmosphere carries a ${story.tone.toLowerCase()} feeling. `
    }

    response +=
      `As ${character.name} looks closer, small details begin to stand out. ` +
      `There may be more here than initially appeared.`

    state.discovered.push(`turn_${state.turn}`)
  }

  // --------------------------------------------------
  // TALK / SPEAK
  // --------------------------------------------------

  else if (
    action.includes("talk") ||
    action.includes("speak") ||
    action.includes("ask") ||
    action.includes("conversation")
  ) {
    response =
      `Someone nearby notices ${character.name}.\n\n`

    if (story.characterBehavior) {
      response +=
        `The person watches ${character.name} carefully before responding. ` +
        `Their behavior suggests they are cautious about revealing too much.`
    } else {
      response +=
        `The conversation begins cautiously. The stranger seems willing ` +
        `to listen, but their intentions aren't immediately clear.`
    }
  }

  // --------------------------------------------------
  // ATTACK / FIGHT
  // --------------------------------------------------

  else if (
    action.includes("attack") ||
    action.includes("fight") ||
    action.includes("hit") ||
    action.includes("punch") ||
    action.includes("kick")
  ) {
    response =
      `${character.name} moves into action.\n\n`

    if (character.abilities) {
      response +=
        `Drawing on their abilities, ${character.name} prepares to fight. `
    } else {
      response +=
        `${character.name} prepares to defend themselves. `
    }

    // Basic combat consequence
    const damageTaken =
      Math.floor(Math.random() * 10) + 1

    state.health = Math.max(
      0,
      state.health - damageTaken
    )

    response +=
      `The confrontation is dangerous, and ${character.name} takes ` +
      `${damageTaken} damage during the struggle.`

    if (state.health <= 0) {
      response +=
        `\n\n${character.name} collapses. The adventure has reached a critical point.`
    } else {
      response +=
        `\n\nHealth: ${state.health}/${state.maxHealth}`
    }
  }

  // --------------------------------------------------
  // RUN / ESCAPE
  // --------------------------------------------------

  else if (
    action.includes("run") ||
    action.includes("escape") ||
    action.includes("leave") ||
    action.includes("flee")
  ) {
    response =
      `${character.name} decides that staying would be too dangerous ` +
      `and quickly moves away.\n\n`

    state.location = "Unknown Area"

    response +=
      `After putting some distance between themselves and the danger, ` +
      `${character.name} finds themselves somewhere unfamiliar.`
  }

  // --------------------------------------------------
  // REST / SLEEP
  // --------------------------------------------------

  else if (
    action.includes("rest") ||
    action.includes("sleep") ||
    action.includes("heal")
  ) {
    const healed =
      Math.floor(Math.random() * 15) + 5

    state.health = Math.min(
      state.maxHealth,
      state.health + healed
    )

    response =
      `${character.name} takes a moment to recover.\n\n` +
      `After resting, they recover ${healed} health.\n\n` +
      `Health: ${state.health}/${state.maxHealth}`
  }

  // --------------------------------------------------
  // INVENTORY
  // --------------------------------------------------

  else if (
    action.includes("inventory") ||
    action.includes("items") ||
    action.includes("bag")
  ) {
    if (state.inventory.length === 0) {
      response =
        `${character.name} checks their belongings, but their inventory is empty.`
    } else {
      response =
        `${character.name} checks their inventory.\n\n` +
        state.inventory.map(item => `• ${item}`).join("\n")
    }
  }

  // --------------------------------------------------
  // STATUS / STATS
  // --------------------------------------------------

  else if (
    action.includes("status") ||
    action.includes("stats") ||
    action.includes("health")
  ) {
    response =
      `${character.name}'s current status:\n\n` +
      `❤️ Health: ${state.health}/${state.maxHealth}\n` +
      `📍 Location: ${state.location}\n` +
      `🔄 Turn: ${state.turn}`

    if (character.abilities) {
      response +=
        `\n\n⚔️ Abilities:\n${character.abilities}`
    }
  }

  // --------------------------------------------------
  // LOCATION
  // --------------------------------------------------

  else if (
    action.includes("where am i") ||
    action.includes("location") ||
    action.includes("where")
  ) {
    response =
      `${character.name} looks around and tries to determine where they are.\n\n` +
      `Current location: ${state.location}`
  }

  // --------------------------------------------------
  // GENERIC ACTION
  // --------------------------------------------------

  else {
    response =
      `${character.name} decides to ${text}.\n\n`

    response +=
      `The world reacts to the decision. ` +
      `Events continue to unfold around ${character.name}, ` +
      `and the consequences of this choice may become clearer later.`

    // Occasionally create something interesting
    const randomEvent = Math.random()

    if (randomEvent < 0.25) {
      response +=
        `\n\nSomething unexpected happens nearby. ` +
        `A sound draws ${character.name}'s attention.`
    }

    if (randomEvent > 0.75) {
      response +=
        `\n\n${character.name} notices something unusual ` +
        `that could become important later.`
    }
  }

  // --------------------------------------------------
  // STORY CONTEXT INFLUENCES THE ENGINE
  // --------------------------------------------------

  /*
    These are intentionally NOT printed to the player.

    They are used internally so the story's creator-defined
    information can influence future engine behavior.
  */

  if (story.lore) {
    state.flags.hasLore = true
  }

  if (story.rules) {
    state.flags.hasRules = true
  }

  if (story.aiInstructions) {
    state.flags.hasStoryPrompt = true
  }

  if (story.characterBehavior) {
    state.flags.hasCharacterBehavior = true
  }

  // --------------------------------------------------
  // SAVE STATE
  // --------------------------------------------------

  localStorage.setItem(
    stateKey,
    JSON.stringify(state)
  )

  return response
}
  function sendStoryAction(text) {
  if (!playingStory || !playerCharacter) {
    return
  }

  if (coins <= 0) {
    alert(
      "You don't have enough coins to continue this adventure."
    )
    return
  }

  const playerMessage = {
    id: Date.now(),
    type: "player",
    text
  }

  const responseText =
    generateLocalStoryResponse(text)

  const aiMessage = {
    id: Date.now() + 1,
    type: "ai",
    text: responseText
  }

  const updatedMessages = [
    ...storyMessages,
    playerMessage,
    aiMessage
  ]

  setStoryMessages(updatedMessages)

  // 1 coin per player message
  setCoins((currentCoins) =>
    Math.max(0, currentCoins - 1)
  )

  if (playingStory && playerCharacter) {
    const saveKey =
      `dreamforge_progress_${playingStory.id}`

    localStorage.setItem(
      saveKey,
      JSON.stringify({
        storyId: playingStory.id,
        characterId: playerCharacter.id,
        messages: updatedMessages,
        updatedAt: Date.now()
      })
    )
  }
}

  function exitStory() {
    setPlayingStory(null)
    setPlayerCharacter(null)
    setStoryMessages([])
    setPlayStage(null)
    setPage("library")
  }

  function navigate(destination) {

    if (destination === "home") {
      setPage("home")
      setSelectedCategory(null)
      return
    }

    if (destination === "categories") {
      setPage("categories")
      setSelectedCategory(null)
      return
    }

    if (destination === "multiplayer") {
      setPage("multiplayer")
      setSelectedCategory(null)
      return
    }

    if (destination === "characters") {
      setPage("characters")
      setSelectedCategory(null)
      return
    }

    if (destination === "library") {
      setPage("library")
      setSelectedCategory(null)
      return
    }

    if (destination === "settings") {
      setPage("settings")
      setSelectedCategory(null)
      return
    }

    setPage("category")
    setSelectedCategory(destination)
  }

  /* =========================
     PLAY PAGE
  ========================= */

  if (page === "play") {

    if (
      playStage === "character" &&
      playingStory
    ) {
      return (
        <CharacterSelector
          characters={characters}
          onSelect={choosePlayerCharacter}
          onCreate={() => {
            setPage("play-create-character")
          }}
          onBack={() => {
            setPlayingStory(null)
            setPlayStage(null)
            setPage("library")
          }}
        />
      )
    }

    if (
      playStage === "prologue" &&
      playingStory &&
      playerCharacter
    ) {
      return (
        <PrologueScreen
          story={playingStory}
          character={playerCharacter}
          onBegin={beginAdventure}
          onBack={() => {
            setPlayerCharacter(null)
            setPlayStage("character")
          }}
        />
      )
    }

    if (
      playStage === "game" &&
      playingStory &&
      playerCharacter
    ) {
      return (
        <StoryGame
          story={playingStory}
          character={playerCharacter}
          messages={storyMessages}
          onSend={sendStoryAction}
          onExit={exitStory}
        />
      )
    }
  }

  /* =========================
     CREATE PLAYER CHARACTER
  ========================= */

  if (page === "play-create-character") {
    return (
      <CharacterCreator
        onBack={() => {
          setPage("play")
        }}
        onCreate={(character) => {

          const updatedCharacters = [
            ...characters,
            character
          ]

          saveCharacters(updatedCharacters)

          setPlayerCharacter(character)
          setPage("play")
          setPlayStage("prologue")
        }}
      />
    )
  }

  /* =========================
     CATEGORIES
  ========================= */

  if (page === "categories") {
    return (
      <div>
        <CategoriesPage
          onNavigate={navigate}
        />

        <BottomNav
          onNavigate={navigate}
        />
      </div>
    )
  }

  /* =========================
     MULTIPLAYER
  ========================= */

  if (page === "multiplayer") {
    return (
      <div>

        <MultiplayerPage />

        <BottomNav
          onNavigate={navigate}
        />

      </div>
    )
  }

  /* =========================
     CHARACTERS
  ========================= */

  if (page === "characters") {
    return (
      <div>

        <CharactersPage
          characters={characters}

          onCreate={(character) => {

            const exists =
              characters.some(
                (item) =>
                  item.id === character.id
              )

            if (exists) {
              saveCharacters(
                characters.map((item) =>
                  item.id === character.id
                    ? character
                    : item
                )
              )
            } else {
              saveCharacters([
                ...characters,
                character
              ])
            }

          }}

          onDelete={(id) => {

            saveCharacters(
              characters.filter(
                (character) =>
                  character.id !== id
              )
            )

          }}
        />

        <BottomNav
          onNavigate={navigate}
        />

      </div>
    )
  }

  /* =========================
     LIBRARY
  ========================= */

  if (page === "library") {
    return (
      <div>

        <LibraryPage
          stories={userStories}

          onCreate={(story) => {

            const exists =
              userStories.some(
                (item) =>
                  item.id === story.id
              )

            if (exists) {

              saveStories(
                userStories.map((item) =>
                  item.id === story.id
                    ? story
                    : item
                )
              )

            } else {

              saveStories([
                ...userStories,
                story
              ])

            }

          }}

          onDelete={(id) => {

            saveStories(
              userStories.filter(
                (story) =>
                  story.id !== id
              )
            )

          }}

          onPlay={startPlayingStory}
        />

        <BottomNav
          onNavigate={navigate}
        />

      </div>
    )
  }

  /* =========================
     SETTINGS
  ========================= */

  if (page === "settings") {
    return (
      <div>

        <SettingsPage />

        <BottomNav
          onNavigate={navigate}
        />

      </div>
    )
  }

  /* =========================
     CATEGORY
  ========================= */

  if (page === "category") {

    const categoryStories =
      starterStories.filter(
        (story) =>
          story.category === selectedCategory
      )

    return (
      <div>

        <header>

          <button
            onClick={() =>
              navigate("categories")
            }
          >
            ← Back
          </button>

          <h1>
            {selectedCategory} Stories
          </h1>

        </header>

        <main className="all-stories">

          {categoryStories.map((story) => (
            <StoryCard
              key={story.title}
              title={story.title}
              genre={story.genre}
              description={story.description}
            />
          ))}

        </main>

        <BottomNav
          onNavigate={navigate}
        />

      </div>
    )
  }

  /* =========================
     HOME
  ========================= */

  return (
    <div>

      <header className="home-header">

        <div className="header-top">

          <h1>Dreamforge</h1>

          <div className="coin-display">

            <span>
              🪙 {coins}
            </span>

            <button
              onClick={() =>
                setShowCoinStore(true)
              }
            >
              +
            </button>

          </div>

        </div>

        <div className="search-bar">

          <input
            type="text"
            placeholder="Search stories..."
          />

          <button>
            Filter
          </button>

        </div>

      </header>

      <main>

        <StorySection
          title="Top Stories"
          icon="🔥"
          category="Action"
          onSeeAll={(category) => {
            setSelectedCategory(category)
            setPage("category")
          }}
        />

        <StorySection
          title="Top Romance"
          icon="❤️"
          category="Romance"
          onSeeAll={(category) => {
            setSelectedCategory(category)
            setPage("category")
          }}
        />

        <StorySection
          title="Top Action"
          icon="⚔️"
          category="Action"
          onSeeAll={(category) => {
            setSelectedCategory(category)
            setPage("category")
          }}
        />

        <StorySection
          title="Top Fantasy"
          icon="🧙"
          category="Fantasy"
          onSeeAll={(category) => {
            setSelectedCategory(category)
            setPage("category")
          }}
        />

      </main>

      <BottomNav
        onNavigate={navigate}
      />

      {showCoinStore && (
        <CoinStore
          onClose={() =>
            setShowCoinStore(false)
          }
        />
      )}

    </div>
  )
}

export default App