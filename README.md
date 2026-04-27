## Real-Time Chat Application

*COMPANY* : CODTECH IT SOLUTION

*NAME* : ABHISHEK KUMAR

*INTERN ID* : CTIS4271

*DOMAIN* : FULL STACK WEB DEVELOPMENT

*DURATION* : 16 WEEKS

*MENTOR* :NEELA SANTOSH KUMAR 


# AbhiChat: Real-Time Chat Application

A beautiful, highly-polished, real-time chat application built with React, Node.js, Express, and Socket.IO. 

This application has been meticulously designed with a premium, glassmorphic Light/Dark theme (inspired by WhatsApp Web and Slack) and features a secure **Room Code** system for isolated, private conversations.

## Features
- **Landing Page & Branding**: A stunning marketing-style front page with smooth entrance animations.
- **Private Chat Rooms**: Join specific rooms using unique Room Codes. Users are strictly isolated so conversations remain private.
- **Real-time Messaging**: Millisecond latency message delivery utilizing Socket.IO.
- **Premium UI**: Ultra-clean Light theme default with frosted glass styling and high-contrast accessibility.
- **Manual Theme Toggle**: Switch instantly between the default Light Theme and the Discord-inspired Dark Theme.
- **Typing Indicators**: Live bouncing dots indicating when another user in your room is typing.
- **Resilient UX**: Features like auto-scrolling to new messages, empty state illustrations ("No messages yet"), and server-side blank message prevention.

---

## Step-by-Step Setup Instructions

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone or Download the Project
Navigate to the root directory where the `server` and `client` folders are located.

### 2. Install Backend Dependencies
Open a terminal, navigate to the `server` directory, and install dependencies:
```bash
cd server
npm install
```

### 3. Install Frontend Dependencies
Open another terminal, navigate to the `client` directory, and install dependencies:
```bash
cd client
npm install
```

---

## How to Run Locally

To run the application, you need to start both the backend server and the frontend development server.

**Step 1: Start the Backend Server**
```bash
# In the /server directory
npm start
```
*You should see: "Server is running on port 3001"*

**Step 2: Start the Frontend App**
```bash
# In the /client directory
npm run dev
```
*The terminal will provide a local URL (usually `http://localhost:5173`). Open this URL in your web browser.*

**Step 3: Test the App**
Open the frontend URL in two separate browser windows. 
1. Click **Start Chatting Now** on the landing page.
2. In Window 1, join with `Username: Alex` and `Room Code: dev-team-1`.
3. In Window 2, join with `Username: Sarah` and `Room Code: dev-team-1`.
4. Chat instantly! *If you open a third window with a different room code, they will not see the other users.*

---

## Explanation of Socket.IO Flow

Socket.IO enables real-time, bidirectional communication between web clients and servers. Here is how the flow works in this application:

1. **Connection**: When the React app loads, `socket.io-client` initiates a handshake with the Node.js server.
2. **Joining a Room**: When the user enters their credentials and clicks "Join", the client emits a `user_join` event containing their username and the `roomCode`. The server executes `socket.join(roomCode)`, placing that user into a dedicated, isolated channel. 
3. **Presence Broadcasting**: The server maps the user in memory and emits a `user_list_update` via `io.to(roomCode).emit(...)`. This ensures the sidebar strictly displays users residing in that specific room.
4. **Messaging**: When a user sends a message, the client emits a `chat_message` event. The server validates the payload and bounces it to the room using `io.to(user.roomCode).emit('chat_message', message)`.
5. **Disconnection**: If a user closes the tab, the server fires a `disconnect` event, removes the user from the active list, and broadcasts the updated list to the remaining clients in their respective room.

---

## OUTPUT

<img width="1912" height="872" alt="Image" src="https://github.com/user-attachments/assets/90b1e00c-7ae9-4296-9240-42e188caee1b" />

<img width="1915" height="922" alt="Image" src="https://github.com/user-attachments/assets/f8a36cb8-3021-478c-95cf-4d8df9ae24de" />

<img width="1918" height="922" alt="Image" src="https://github.com/user-attachments/assets/f72a3ea9-6085-4354-a89f-520d1ab26564" />

