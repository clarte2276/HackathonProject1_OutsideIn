import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Chatting.css";

const Chatroom = () => {
  const { roomId } = useParams(); // roomId는 사실상 userId로 사용할 것입니다.ㅁㄴㅇ
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    // 백엔드에서 메시지 가져오기
    const fetchMessages = async () => {
      try {
        console.log(`Fetching messages for roomId: ${roomId}`);
        const response = await axios.get(`/chatrooms/${roomId}/messages`);
        console.log("Fetched messages:", response.data);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [roomId]);

  useEffect(() => {
    if (messages.length) {
      setRoomMessages(
        messages.filter((msg) => msg.receiver_id === parseInt(roomId))
      );
    }
  }, [messages, roomId]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;
    try {
      const receiver_id = parseInt(roomId); // 현재 대화 상대방의 roomId로 사용됩니다.

      console.log("Sending message:", { receiver_id, content: newMessage });

      // 백엔드에 새 메시지 보내기, 앞에 로컬호스트 링크 뻄
      const response = await axios.post(`/chatrooms/${roomId}/messages`, {
        receiver_id,
        content: newMessage,
      });

      console.log("Response:", response);

      // 메시지를 성공적으로 보낸 후 메시지 목록 업데이트
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          receiver_id,
          content: newMessage,
        },
      ]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chattingRoom">
      <h2>Chatroom {roomId}</h2>
      <div>
        {roomMessages.map((msg, index) => (
          <p
            key={index}
            className={msg.sender_id === 1 ? "my-message" : "other-message"}
          >
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
