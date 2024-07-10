// 특정 채팅 방 UI

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useChat } from './ChatSocketContext';

const Chatroom = () => {
  const { roomId } = useParams();
  const { messages, sendMessage, newMessage, setNewMessage } = useChat();
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    setRoomMessages(messages.filter((msg) => msg.roomId === roomId));
  }, [messages, roomId]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    sendMessage();
    setNewMessage('');
  };

  return (
    <div>
      <h2>Chatroom {roomId}</h2>
      <div>
        {roomMessages.map((msg, index) => (
          <p key={index}>{msg.text}</p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="메시지를 입력하세요..."
      />
      <button onClick={handleSendMessage}>전송</button>
    </div>
  );
};

export default Chatroom;
