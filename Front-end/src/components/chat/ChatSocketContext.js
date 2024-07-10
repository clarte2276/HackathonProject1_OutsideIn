// 소켓 통신 로직 정의

import React from 'react';

const ChatSocketContext = React.createContext('defaultValue');

const ChatSocketProvider = ({ children }) => {
  // 원하는 상태나 함수 정의
  const myValue = {
    data: 'myData',
    toggleData: () => {
      // 데이터 토글 로직
    },
  };

  return <ChatSocketContext.Provider value={myValue}>{children}</ChatSocketContext.Provider>;
};

export { ChatSocketProvider, ChatSocketContext };
