// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const Chatroom = () => {
//   const { roomId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [roomMessages, setRoomMessages] = useState([]);

//   useEffect(() => {
//     // 백엔드에서 메시지 가져오기
//     const fetchMessages = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/chatrooms/${roomId}/messages`
//         );
//         setMessages(response.data);
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//       }
//     };

//     fetchMessages();
//   }, [roomId]);

//   useEffect(() => {
//     if (messages) {
//       setRoomMessages(messages.filter((msg) => msg.room_id === roomId));
//     }
//   }, [messages, roomId]);

//   const handleSendMessage = async () => {
//     if (newMessage.trim() === "") return;
//     try {
//       // 백엔드에 새 메시지 보내기
//       await axios.post(`http://localhost:3000/chatrooms/${roomId}/messages`, {
//         sender_id: "someSenderId", // sender_id를 적절히 설정하세요
//         receiver_id: "someReceiverId", // receiver_id를 적절히 설정하세요
//         content: newMessage,
//       });
//       // 메시지를 성공적으로 보낸 후 메시지 목록 업데이트
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         {
//           room_id: roomId,
//           sender_id: "someSenderId",
//           receiver_id: "someReceiverId",
//           content: newMessage,
//         },
//       ]);
//       setNewMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Chatroom {roomId}</h2>
//       <div>
//         {roomMessages.map((msg, index) => (
//           <p key={index}>{msg.content}</p>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={newMessage}
//         onChange={(e) => setNewMessage(e.target.value)}
//         placeholder="메시지를 입력하세요..."
//       />
//       <button onClick={handleSendMessage}>전송</button>
//     </div>
//   );
// };

// export default Chatroom;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Chatroom.css';

const Chatroom = () => {
  const { roomId } = useParams(); // roomId는 사실상 userId로 사용할 것입니다.
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    // 백엔드에서 메시지 가져오기
    const fetchMessages = async () => {
      try {
        console.log(`Fetching messages for roomId: ${roomId}`);
        const response = await axios.get(`http://localhost:3000/chatrooms/${roomId}/messages`);
        console.log('Fetched messages:', response.data);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [roomId]);

  useEffect(() => {
    if (messages.length) {
      setRoomMessages(
        messages.filter((msg) => msg.sender_id === parseInt(roomId) || msg.receiver_id === parseInt(roomId))
      );
    }
  }, [messages, roomId]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;
    try {
      const sender_id = 1; // 실제 사용자 roomId로 대체해야 합니다. //직접 지정
      const receiver_id = parseInt(roomId); // 현재 대화 상대방의 roomId로 사용됩니다.

      console.log('Sending message:', { sender_id, receiver_id, content: newMessage });

      // 백엔드에 새 메시지 보내기
      const response = await axios.post(`http://localhost:3000/chatrooms/${roomId}/messages`, {
        sender_id,
        receiver_id,
        content: newMessage,
      });

      console.log('Response:', response);

      // 메시지를 성공적으로 보낸 후 메시지 목록 업데이트
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender_id,
          receiver_id,
          content: newMessage,
        },
      ]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chattingRoom">
      <h2>Chatroom {roomId}</h2>
      <div className="messageContent">
        {roomMessages.map((msg, index) => (
          <p key={index} className={msg.sender_id === 1 ? 'my-message' : 'other-message'}>
            {msg.content}
          </p>
        ))}
      </div>
      <div className="inputMessage">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
        />
      </div>
      <button onClick={handleSendMessage} className="sendmessageBtn">
        전송
      </button>
    </div>
  );
};

export default Chatroom;
