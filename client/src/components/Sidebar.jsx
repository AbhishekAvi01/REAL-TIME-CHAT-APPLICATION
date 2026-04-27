function Sidebar({ username, onlineUsers, isOpen, setIsOpen }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="avatar">
          {username.charAt(0).toUpperCase()}
        </div>
        <div className="user-info">
          <h2>{username}</h2>
          <div className="status">
            <span className="status-dot"></span>
            Online
          </div>
        </div>
        {isOpen && (
          <button 
            className="mobile-menu-btn" 
            style={{ marginLeft: 'auto' }}
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        )}
      </div>
      
      <div className="users-list">
        <h3>Online Users — {onlineUsers.length}</h3>
        {onlineUsers.map((user) => (
          <div key={user.id} className="user-item">
            <div className="avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <span>
              {user.username} {user.username === username ? '(You)' : ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
