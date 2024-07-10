// 소켓 연결

import React, { createContext, useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

const ChatSocketContext = createContext();

export const useChat = () => {
  return useContext(ChatSocketContext);
};

const ChatSocketProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const newSocket = io('http://localhost:3002');
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => {
      console.log('connected to server');
    };

    const handleDisconnect = () => {
      console.log('Disconnected from server');
    };

    const handleMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleUserList = (userList) => {
      setUsers(userList);
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('message', handleMessage);
    socket.on('userList', handleUserList);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('message', handleMessage);
      socket.off('userList', handleUserList);
    };
  }, [socket]);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    socket.emit('sendMessage', newMessage);
    setNewMessage('');
  };

  const value = { messages, users, sendMessage, newMessage, setNewMessage };

  return <ChatSocketContext.Provider value={value}>{children}</ChatSocketContext.Provider>;
};

export { ChatSocketProvider, ChatSocketContext };
