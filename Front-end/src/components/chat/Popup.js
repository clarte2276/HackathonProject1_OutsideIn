import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chatroom from "./Chatroom";
import { ChatSocketProvider } from "./ChatSocketContext";

export const openChatroomPopup = (roomId) => {
  const url = `/Chatroom/${roomId}`;
  const title = "popup";
  const status =
    "toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=400,height=500,top=100,left=200";
  const newWindow = window.open("", title, status);

  if (newWindow) {
    newWindow.document.write('<div id="popup-root"></div>');
    newWindow.document.close();

    ReactDOM.createRoot(newWindow.document.getElementById("popup-root")).render(
      <Router>
        <ChatSocketProvider>
          <Routes>
            <Route path="/Chatroom/:roomId" element={<Chatroom />} />
          </Routes>
        </ChatSocketProvider>
      </Router>
    );
    newWindow.location.href = url; // 절대 경로 설정
  }
};
