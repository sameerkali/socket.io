import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001/");

function App() {
  const [message, setMessage] = useState(""); // Send message
  const [receivedMessages, setReceivedMessages] = useState([]); // Array of received messages
  const [room, setRoom] = useState("")


  const sendMessage = () => {
    if (message.trim()) { // Validation: check for empty message
      socket.emit("send_message", { message, room });
      setMessage(""); // Clear input after sending
    }
  };

  useEffect(() => {
    socket.on("recieved_message", (data) => {
      setReceivedMessages((prevMessages) => [...prevMessages, data.message]); // Add message to array
    });
  }, [socket]);

  const joinRoom = () => {
    if(room !== ""){
      socket.emit("join_room", room)
    }
  }

  return (
    <div className="h1">
      <h2>message app</h2>
      <input placeholder="Enter room Number..." onChange={(e)  => setRoom(e.target.value)}  />
      <button onClick={joinRoom}>join the room</button>
      <input 
        type="text"
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Send text"
      />
      <button onClick={sendMessage}>Send</button>
      <ol>
        {receivedMessages.length > 0 ? (
          receivedMessages.map((message, i) => (
            <li key={i}>{message}</li>
          ))
        ) : (
          <li>No messages received yet.</li> // Show this when no messages arrive
        )}
      </ol>
    </div>
  );
}

export default App;
