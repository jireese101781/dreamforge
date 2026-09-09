import { useState } from "react"
import "./StoryCard.css"

function StoryCard({
  title,
  genre,
  description,
  cover,
  creator = "Dreamforge Creator",
  rating = "4.9",
  players = "1.2K",
  tags = []
}) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const [saved, setSaved] = useState(false)

  const storyTags = tags.length > 0 ? tags : [genre, "Interactive", "AI Story"]

  return (
    <>
      <button
        className="story-card story-card-button"
        onClick={() => setDetailsOpen(true)}
        aria-label={`View details for ${title}`}
      >
        <div className="story-cover">
          {cover ? (
            <img src={cover} alt={`${title} cover`} />
          ) : (
            <div className="story-cover-art">
              <span>✦</span>
              <small>DREAMFORGE</small>
            </div>
          )}
        </div>

        <div className="story-info">
          <h3>{title}</h3>
          <p className="story-genre">{genre}</p>
          <p>{description}</p>
          <span className="story-view-label">View Story →</span>
        </div>
      </button>

      {detailsOpen && (
        <div
          className="story-details-overlay"
          onClick={() => setDetailsOpen(false)}
        >
          <div
            className="story-details-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="story-details-close"
              onClick={() => setDetailsOpen(false)}
              aria-label="Close story details"
            >
              ✕
            </button>

            <div className="story-details-hero">
              <div className="story-details-cover">
                {cover ? (
                  <img src={cover} alt={`${title} cover`} />
                ) : (
                  <div className="story-details-cover-placeholder">
                    <span>✦</span>
                    <strong>{title}</strong>
                  </div>
                )}
              </div>

              <div className="story-details-heading">
                <div className="story-details-eyebrow">INTERACTIVE STORY</div>
                <h1>{title}</h1>
                <p className="story-details-creator">Created by {creator}</p>

                <div className="story-details-tags">
                  {storyTags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="story-details-actions">
                  <button className="story-play-button">
                    ▶ Play Story
                  </button>

                  <button
                    className={`story-secondary-button ${favorite ? "active" : ""}`}
                    onClick={() => setFavorite(!favorite)}
                  >
                    {favorite ? "♥ Favorited" : "♡ Favorite"}
                  </button>

                  <button
                    className={`story-secondary-button ${saved ? "active" : ""}`}
                    onClick={() => setSaved(!saved)}
                  >
                    {saved ? "✓ Saved" : "＋ Library"}
                  </button>
                </div>
              </div>
            </div>

            <div className="story-details-content">
              <section className="story-details-description">
                <h2>About This Story</h2>
                <p>{description}</p>
                <p>
                  Step into a living world where your choices shape the story,
                  relationships, characters, and events around you.
                </p>
              </section>

              <aside className="story-details-stats">
                <div>
                  <strong>⭐ {rating}</strong>
                  <span>Rating</span>
                </div>
                <div>
                  <strong>👥 {players}</strong>
                  <span>Players</span>
                </div>
                <div>
                  <strong>🎭 {genre}</strong>
                  <span>Genre</span>
                </div>
                <div>
                  <strong>🤖 AI</strong>
                  <span>Interactive</span>
                </div>
              </aside>
            </div>

            <div className="story-details-footer">
              <span>🛡️ Community-rated content</span>
              <span>•</span>
              <span>Updated recently</span>
              <button onClick={() => navigator.clipboard?.writeText(title)}>
                🔗 Share
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default StoryCard