import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Chatroom = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    // 백엔드에서 메시지 가져오기
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/chatrooms/${roomId}/messages`
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [roomId]);

  useEffect(() => {
    if (messages) {
      setRoomMessages(messages.filter((msg) => msg.room_id === roomId));
    }
  }, [messages, roomId]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;
    try {
      // 백엔드에 새 메시지 보내기
      await axios.post(`http://localhost:3000/chatrooms/${roomId}/messages`, {
        sender_id: "someSenderId", // sender_id를 적절히 설정하세요
        receiver_id: "someReceiverId", // receiver_id를 적절히 설정하세요
        content: newMessage,
      });
      // 메시지를 성공적으로 보낸 후 메시지 목록 업데이트
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          room_id: roomId,
          sender_id: "someSenderId",
          receiver_id: "someReceiverId",
          content: newMessage,
        },
      ]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <h2>Chatroom {roomId}</h2>
      <div>
        {roomMessages.map((msg, index) => (
          <p key={index}>{msg.content}</p>
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
