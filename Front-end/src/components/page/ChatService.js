import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import ChatInput from './ChatInput';

function ChatService() {
  const socket = useSelector((state) => state.socketStorage.socket);
  const newChatRef = useRef(null);
  const [arrivalChat, setArrivalChat] = useState(null);

  //roomId와 participantId 마이페이지에서 불러오기
  const roomId = 'your_room_id';
  const participantId = 'your_participant_id';

  useEffect(() => {
    socket.on('message-expert', (chat0bj) => {
      const { result, errmsg } = chat0bj;
      setArrivalChat(result);
    });

    return () => {
      socket.off('messge-expert');
    };
  }, [socket]);

  const sendMessage = async () => {
    if (!newChatRef.current.value) return;

    await socket.emit('message-expert', {
      room_id: roomId,
      sender_index: participantId,
      message: newChatRef.current.value,
    });
    newChatRef.current.value = '';
  };

  return (
    <div>
      <ChatInput inputRef={newChatRef} onSendMessage={sendMessage} />
    </div>
  );
}

export default ChatService;
