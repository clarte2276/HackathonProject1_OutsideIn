// 채팅창 화면

import React, { createContext, useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

function ChatService({ children }) {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // 원하는 서버 주소로 소켓 연결
    const newSocket = io('http://localhost:3004');
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      console.log('connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('message', (message) => {
      setMessages((preMessages) => [...preMessages, message]);
    });

    socket.on('userList', (userList) => {
      setUsers(userList);
    });

    return () => {
      socket.off('message');
      socket.off('userList');
    };
  }, [socket]);

  const sendMessage = () => {
    if (newMessage.trim() === '') return; // 빈 메시지는 전송하지 않음
    socket.emit('sendMessage', newMessage);
    setNewMessage(''); // 전송 후 입력 상자 비움
  };
  const value = { messages, users, sendMessage, newMessage, setNewMessage };

  return (
    <div>
      <ChatContext.Provider value={value}>
        <h2>Chat Component</h2>
        <div>
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
        />
        <button onClick={sendMessage}>전송</button>
        {children}
      </ChatContext.Provider>
    </div>
  );
}

export default ChatService;
