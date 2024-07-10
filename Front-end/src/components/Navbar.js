import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import './Navbar.css';
import './fontello-f87b823b/css/fontello.css';

function Navbar() {
  const navigate = useNavigate();

  const checkLogin = async (e) => {
    e.preventDefault();
    console.log('checkLogin 호출됨'); // 디버깅용 로그
    try {
      const response = await fetch('/check-login', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 쿠키를 포함하여 요청
      });
      const result = await response.json();
      console.log('응답 받음:', result); // 디버깅용 로그
      if (result.loggedIn) {
        navigate('/MyPage'); // 로그인 상태라면 마이페이지로 리디렉션
      } else {
        navigate('/LoginTap'); // 로그인되지 않은 상태라면 로그인 페이지로 리디렉션
      }
    } catch (error) {
      console.error('세션 확인 중 오류 발생:', error);
      navigate('/LoginTap'); // 오류 발생 시 로그인 페이지로 리디렉션
    }
  };

  return (
    <div className="navbar_all">
      <div className="OutsideIn">
        <Link className="navbarMenu" to="/">
          <div>
            Outside<br></br>In&nbsp;
            <i className="icon-users" />
          </div>
        </Link>
      </div>
      <div className="navbar">
        <Link className="navbarMenu" id="navbar_underline" to="/joy">
          Board
        </Link>
        <Link className="navbarMenu" to="/process/chat">
          Chat
        </Link>
        <form onSubmit={checkLogin} className="icon-link-form">
          <button type="submit" className="navbarMenu">
            MyPage
          </button>
        </form>
      </div>
      <form onSubmit={checkLogin} className="icon-link-form">
        <button type="submit" className="icon-link-button">
          <i className="icon-user-circle-o" style={{ fontSize: '50px' }} />
        </button>
      </form>
    </div>
  );
}

export default Navbar;
