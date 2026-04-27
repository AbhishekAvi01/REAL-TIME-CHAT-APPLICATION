import { useState } from 'react';

function JoinScreen({ onJoin }) {
  const [name, setName] = useState('');
  const [roomCode, setRoomCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && roomCode.trim()) {
      onJoin(name.trim(), roomCode.trim());
    }
  };

  return (
    <div className="join-screen">
      <form className="glass join-form" onSubmit={handleSubmit}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#primaryGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <defs>
              <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <h1 style={{ marginBottom: 0 }}>LiveChat</h1>
        </div>
        
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Alex"
            autoFocus
            required
            maxLength={20}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="roomCode">Room Code</label>
          <input
            id="roomCode"
            type="text"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            placeholder="e.g. dev-team-1"
            required
            maxLength={20}
          />
        </div>
        
        <button type="submit" className="btn-primary">
          Join Room
        </button>
      </form>
    </div>
  );
}

export default JoinScreen;
