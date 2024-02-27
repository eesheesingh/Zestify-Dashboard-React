const socketIo = require('socket.io');

// Define your MongoDB models
const ChatMember = require('./models/ChatMemberSchema'); // Import your ChatMember model

let io;

function initializeSocket(server) {
  io = socketIo(server);

  // WebSocket connection
  io.on('connection', (socket) => {
    console.log('Client connected');

    // Listen for changes in MongoDB and emit updates to clients
    const changeStream = ChatMember.watch();
    changeStream.on('change', (change) => {
      io.emit('chatMemberUpdate', change);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
}

module.exports = { initializeSocket };