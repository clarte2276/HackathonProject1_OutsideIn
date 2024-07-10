import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chatroom from './Chatroom';

export const openChatroomPopup = (roomId) => {
  const url = `/Chatroom/${roomId}`;
  const title = 'popup';
  const status = 'toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=400,height=500,top=100,left=200';
  const newWindow = window.open(url, title, status); // 팝업창 url 설정

  if (newWindow) {
    newWindow.document.write('<div id="popup-root"></div>');
    newWindow.document.close();
    ReactDOM.createRoot(newWindow.document.getElementById('popup-root')).render(
      <Router>
        <Routes>
          <Route path={`/Chatroom/:roomId`} element={<Chatroom />} />
        </Routes>
      </Router>
    );
  }
};
