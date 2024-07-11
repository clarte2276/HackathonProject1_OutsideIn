import React, { useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Header from './components/home/Header.js';
import CheckList from './components/home/CheckList.js';
import CalendarFunc from './components/home/CalendarFunc.js';
import Board from './components/home/Board.js';
import MypageTap from './components/mypage/MypageTap.js';
import LoginTap from './components/mypage/LoginTap.js';
import Signup from './components/mypage/Signup.js';
import JoyBoard from './components/board/JoyBoard.js';
import SadnessBoard from './components/board/SadnessBoard.js';
import AnxietyBoard from './components/board/AnxietyBoard.js';
import FearBoard from './components/board/FearBoard.js';
import WriteJoy from './components/board/WriteJoy.js';
import ReadBoard from './components/board/ReadBoard.js';
import Chat from './components/chat/Chat.js';
import Chatroom from './components/chat/Chatroom.js';

const Home = () => {
  return (
    <div>
      <Header title1="상처를" title2="치유해줄 사람 어디없나"></Header>
      <div className="content">
        <CheckList></CheckList>
        <CalendarFunc></CalendarFunc>
      </div>
      <div className="Board_layout">
        <Board title="기쁨이 게시판" emotion="joy"></Board>
        <Board title="우울이 게시판" emotion="sadness"></Board>
      </div>
      <div className="Board_layout">
        <Board title="불안이 게시판" emotion="anxiety"></Board>
        <Board title="소심이 게시판" emotion="fear"></Board>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/joy" element={<JoyBoard />} />
          <Route path="/MyPage" element={<MypageTap />} />
          <Route path="/LoginTap" element={<LoginTap />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/sadness" element={<SadnessBoard />} />
          <Route path="/anxiety" element={<AnxietyBoard />} />
          <Route path="/Fear" element={<FearBoard />} />
          <Route path="/joy/:page" component={JoyBoard} />
          <Route path="/process/chat" element={<Chat />} />
          <Route path="/Chatroom/:roomId" element={<Chatroom />} />
          <Route path="/BoardWrite/joy" element={<WriteJoy />} />
          <Route path="/joy/PostView/:no" element={<ReadBoard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
