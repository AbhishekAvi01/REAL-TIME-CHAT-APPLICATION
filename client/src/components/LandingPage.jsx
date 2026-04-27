function LandingPage({ onStart }) {
  return (
    <div className="landing-page">
      <nav className="landing-nav glass-nav">
        <div className="logo-container">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#primaryGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <defs>
              <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <h2>AbhiChat</h2>
        </div>
        <button onClick={onStart} className="btn-outline">Open App</button>
      </nav>

      <main className="landing-main">
        <div className="hero-section text-center">
          <h1 className="hero-title slide-up">
            Connect instantly.<br />
            <span className="text-gradient">Chat in real-time.</span>
          </h1>
          <p className="hero-subtitle slide-up-delay">
            Experience lightning-fast messaging in secure, private rooms.
            No signups required. Just grab a room code and start talking.
          </p>
          <button onClick={onStart} className="btn-primary btn-large slide-up-delay-2">
            Start Chatting Now
          </button>
        </div>

        <div className="features-grid slide-up-delay-3">
          <div className="feature-card glass">
            <div className="feature-icon">⚡</div>
            <h3>Real-Time Speed</h3>
            <p>Powered by Socket.IO for millisecond latency message delivery.</p>
          </div>
          <div className="feature-card glass">
            <div className="feature-icon">🔒</div>
            <h3>Private Rooms</h3>
            <p>Create unique room codes to isolate your conversations securely.</p>
          </div>
          <div className="feature-card glass">
            <div className="feature-icon">✨</div>
            <h3>Premium UI</h3>
            <p>Beautiful glassmorphism aesthetics that feel right at home.</p>
          </div>
        </div>
      </main>

      <footer className="landing-footer">
        <p>&copy; 2026 AbhiChat App By Abhishek Kumar</p>
      </footer>
    </div>
  );
}

export default LandingPage;
