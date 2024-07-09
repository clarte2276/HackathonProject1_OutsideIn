import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Header from "./components/Header.js";
import CheckList from "./components/CheckList.js";
import CalendarFunc from "./components/CalendarFunc.js";
import Board from "./components/Board.js";
import BoardTap from "./components/page/BoardTap.js";
import MypageTap from "./components/MypageTap.js";
import LoginTap from "./components/LoginTap.js";
import Signup from "./components/Signup.js";
import JoyBoard from "./components/page/JoyBoard.js";
import SadnessBoard from "./components/page/SadnessBoard.js";
import AnxietyBoard from "./components/page/AnxietyBoard.js";
import FearBoard from "./components/page/FearBoard.js";
import Chat from "./components/page/Chat.js";

const Home = () => {
  return (
    <div>
      <Header title1="상처를" title2="치유해줄 사람 어디없나"></Header>
      <div className="content">
        <CheckList></CheckList>
        <CalendarFunc></CalendarFunc>
      </div>
      <div className="Board_layout">
        <Board title="기쁨이 게시판" id="1"></Board>
        <Board title="우울이 게시판" id="2"></Board>
      </div>
      <div className="Board_layout">
        <Board title="불안이 게시판" id="3"></Board>
        <Board title="소심이 게시판" id="4"></Board>
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
          <Route path="/joy" element={<JoyBoard />} />
          <Route path="/sadness" element={<SadnessBoard />} />
          <Route path="/anxiety" element={<AnxietyBoard />} />
          <Route path="/Fear" element={<FearBoard />} />
          <Route path="/joy/:page" component={JoyBoard} />
          <Route path="/process/chat" element={<Chat />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
