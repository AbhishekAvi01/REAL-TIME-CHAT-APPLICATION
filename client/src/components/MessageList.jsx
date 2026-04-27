import { useEffect, useRef } from 'react';

function MessageList({ messages, currentUser, typingUsers }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to the bottom when messages or typing users change
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingUsers]);

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (messages.length === 0 && typingUsers.length === 0) {
    return (
      <div className="messages-list empty-state">
        <div className="empty-message-container">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="empty-icon">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <h3>No messages yet</h3>
          <p>Be the first to say hello in this room!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="messages-list">
      {messages.map((msg, idx) => {
        // System message
        if (msg.type === 'join' || msg.type === 'leave') {
          return (
            <div key={idx} className="system-message">
              {msg.message}
            </div>
          );
        }

        // Chat message
        const isMe = msg.senderName === currentUser;
        
        return (
          <div key={msg.id || idx} className={`message-wrapper ${isMe ? 'sent' : 'received'}`}>
            <span className="message-sender">{msg.senderName}</span>
            <div className="message-bubble">
              {msg.text}
              <span className="message-time">{formatTime(msg.timestamp)}</span>
            </div>
          </div>
        );
      })}

      {typingUsers.map((user) => (
        <div key={user} className="typing-indicator">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
      ))}
      
      <div ref={bottomRef} />
    </div>
  );
}

export default MessageList;
