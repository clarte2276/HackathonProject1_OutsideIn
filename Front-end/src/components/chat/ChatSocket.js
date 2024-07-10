// 채팅 UI 구현

import React, { useContext } from 'react';
import { ChatSocketContext } from './ChatSocketContext';

function ChatSocket() {
  const { data, toggleData } = useContext(ChatSocketContext);

  return (
    <div>
      <h2>ChatSocket Component</h2>
      <p>Data: {data}</p>
      <button onClick={toggleData}>Toggle Data</button>
    </div>
  );
}

export default ChatSocket;
