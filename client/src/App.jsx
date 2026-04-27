import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import LandingPage from './components/LandingPage';
import JoinScreen from './components/JoinScreen';
import Sidebar from './components/Sidebar';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import './App.css';

// We connect to the backend running on port 3001
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3001';
const socket = io(URL, { autoConnect: false });

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [username, setUsername] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check OS preference for initial dark mode state
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('user_list_update', (users) => {
      setOnlineUsers(users);
    });

    socket.on('chat_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('system_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('typing', ({ username, isTyping }) => {
      setTypingUsers((prev) => {
        const newTyping = { ...prev };
        if (isTyping) {
          newTyping[username] = true;
        } else {
          delete newTyping[username];
        }
        return newTyping;
      });
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.off('connect');
      socket.off('user_list_update');
      socket.off('chat_message');
      socket.off('system_message');
      socket.off('typing');
      socket.off('disconnect');
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleJoin = (name, code) => {
    setUsername(name);
    setRoomCode(code);
    setIsJoined(true);
    socket.connect();
    socket.emit('user_join', { username: name, roomCode: code });
  };

  const handleSendMessage = (text) => {
    socket.emit('chat_message', { text });
  };

  const handleTyping = (isTyping) => {
    socket.emit('typing', isTyping);
  };

  if (showLanding) {
    return <LandingPage onStart={() => setShowLanding(false)} />;
  }

  if (!isJoined) {
    return <JoinScreen onJoin={handleJoin} />;
  }

  return (
    <div className={`app-container ${darkMode ? 'dark-theme' : ''}`}>
      <div className="glass chat-container">
        <Sidebar 
          username={username} 
          onlineUsers={onlineUsers} 
          isOpen={sidebarOpen} 
          setIsOpen={setSidebarOpen} 
        />
        
        <div className="chat-area">
          <div className="chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button 
                className="mobile-menu-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                ☰
              </button>
              <div>
                <h2>Room: {roomCode}</h2>
                <p>{onlineUsers.length} user{onlineUsers.length !== 1 ? 's' : ''} online</p>
              </div>
            </div>
            <button onClick={toggleDarkMode} className="theme-toggle" title="Toggle Dark Mode">
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
          
          <MessageList 
            messages={messages} 
            currentUser={username} 
            typingUsers={Object.keys(typingUsers)} 
          />
          
          <MessageInput 
            onSendMessage={handleSendMessage} 
            onTyping={handleTyping} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;
