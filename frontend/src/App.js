import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(`http://localhost:10000/`);
// const socket = io('https://your-domain.com:5000');

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
  }, []);
  console.log(messages)

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit('chat message', `${name}: ${message}`);
    setMessage('');
  };

  return (
    <div>
      <ul>
      {messages?messages.map((msg, index) => (
          <li >{msg.text}</li>
        )):""}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;