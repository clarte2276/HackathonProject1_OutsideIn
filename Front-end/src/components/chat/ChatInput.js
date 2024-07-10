import React, { useRef } from 'react';

function ChatInput({ onSendMessage }) {
  const inputRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <div>
      <input type="text" ref={inputRef} onKeyDown={handleKeyDown} placeholder="Type your message here..." />
      <button onClick={onSendMessage}>전송</button>
    </div>
  );
}

export default ChatInput;
