function StoryCard({ title, genre, description }) {
  return (
    <div className="story-card">
      <div className="story-cover">
        <span>Cover</span>
      </div>

      <div className="story-info">
        <h3>{title}</h3>
        <p className="story-genre">{genre}</p>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default StoryCard