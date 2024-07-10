// 전체 채팅 서비스

import React from 'react';
import { ChatSocketProvider } from './ChatSocketContext';
import Chat from './Chat';

const ChatService = ({ children }) => {
  return (
    <ChatSocketProvider>
      <Chat />
      {children}
    </ChatSocketProvider>
  );
};

export default ChatService;
