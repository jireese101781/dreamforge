function BottomNav({ onNavigate }) {
  return (
    <nav>
      <button onClick={() => onNavigate("home")}>
        🏠 Home
      </button>

      <button onClick={() => onNavigate("categories")}>
        📚 Categories
      </button>

      <button onClick={() => onNavigate("multiplayer")}>
        👥 Multiplayer
      </button>

      <button onClick={() => onNavigate("characters")}>
        👤 Characters
      </button>

      <button onClick={() => onNavigate("library")}>
        📖 Library
      </button>

      <button onClick={() => onNavigate("settings")}>
        ⚙️ Settings
      </button>
    </nav>
  )
}

export default BottomNav