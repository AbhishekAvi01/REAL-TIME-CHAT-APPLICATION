const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // allow all origins for dev
    methods: ["GET", "POST"]
  }
});

// In-memory state
const activeUsers = new Map(); // socket.id -> { id, username, roomCode }

// Helper function to get users in a specific room
const getUsersInRoom = (roomCode) => {
  return Array.from(activeUsers.values()).filter(user => user.roomCode === roomCode);
};

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // User joins a specific room
  socket.on('user_join', ({ username, roomCode }) => {
    // Join the Socket.IO room
    socket.join(roomCode);
    
    const user = { id: socket.id, username, roomCode };
    activeUsers.set(socket.id, user);
    
    console.log(`User ${username} joined room ${roomCode}`);
    
    // Broadcast updated user list ONLY to users in the same room
    io.to(roomCode).emit('user_list_update', getUsersInRoom(roomCode));
    
    // Announce to others in the room that someone joined
    socket.to(roomCode).emit('system_message', {
      type: 'join',
      message: `${username} has joined the chat.`,
      timestamp: new Date().toISOString()
    });
  });

  // Handle chat messages
  socket.on('chat_message', (data) => {
    const user = activeUsers.get(socket.id);
    if (user && data.text.trim()) {
      const message = {
        id: Math.random().toString(36).substring(2, 10),
        senderId: user.id,
        senderName: user.username,
        text: data.text.trim(),
        timestamp: new Date().toISOString()
      };
      
      // Broadcast to everyone in the sender's room
      io.to(user.roomCode).emit('chat_message', message);
    }
  });

  // Handle typing status
  socket.on('typing', (isTyping) => {
    const user = activeUsers.get(socket.id);
    if (user) {
      // Broadcast to others in the same room
      socket.to(user.roomCode).emit('typing', {
        userId: user.id,
        username: user.username,
        isTyping
      });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const user = activeUsers.get(socket.id);
    if (user) {
      console.log(`User ${user.username} left room ${user.roomCode}`);
      activeUsers.delete(socket.id);
      
      // Broadcast updated user list to the room
      io.to(user.roomCode).emit('user_list_update', getUsersInRoom(user.roomCode));
      
      // Announce departure
      io.to(user.roomCode).emit('system_message', {
        type: 'leave',
        message: `${user.username} has left the chat.`,
        timestamp: new Date().toISOString()
      });
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
