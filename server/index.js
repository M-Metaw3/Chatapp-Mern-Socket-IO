const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http,{
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }});
const mongoose = require('mongoose');
const Message = require('./models/message');
const cors = require('cors');
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ extended: true, limit: '200mb' }));
app.use(cors());
require('dotenv').config();

const PORT = process.env.PORT || 10000;
const MONGODB_URI = process.env.CONNECTIONURL;

mongoose.set('toJSON',{getters:true})
try {
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.CONNECTIONURL,{useNewUrlParser:true,useUnifiedTopology:true,autoIndex:true}). then( async() => {
    console.log("Mongoose")

})
    
} catch (error) {
    console.log(error.message)
}
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    const message = new Message({
      text: msg,
    });
    message.save()
    io.emit('chat message', message);
    console.log(message)
  });
});

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});