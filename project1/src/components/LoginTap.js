import React, { useState } from "react";
import "./LoginTap.css";
import { Link, useNavigate } from "react-router-dom";
import loginPage from "./images/loginpage.png";

function LoginTap() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleUserPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = {
      id: userId,
      password: password,
    };

    try {
      const response = await fetch("/process/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (result.success) {
        navigate("/"); // 로그인 성공 시 메인 페이지로 이동
      } else {
        alert(result.message); // 로그인 실패 메시지 표시
      }
    } catch (error) {
      console.error("로그인 요청 중 오류 발생:", error);
      alert("로그인 요청 중 오류가 발생했습니다.");
    }
  };

  const isLoginFormValid = userId !== "" && password !== "";

  return (
    <div className="LoginPage">
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <div className="btnContent">
          <input
            type="text"
            name="id"
            placeholder="아이디"
            value={userId}
            onChange={handleUserIdChange}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={password}
            onChange={handleUserPasswordChange}
          />
          <br />
          <button
            type="submit"
            disabled={!isLoginFormValid}
            className="loginBtn"
          >
            로그인
          </button>
          <br />
          <button className="signupBtn">
            <Link to="/Signup" className="signupLink">
              회원가입
            </Link>
          </button>
        </div>
      </form>
      <img className="loginImg" src={loginPage} alt=""></img>
    </div>
  );
}

export default LoginTap;
