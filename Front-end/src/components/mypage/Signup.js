import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import signupPage from '../images/signuppage.png';

function Signup() {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setbirth] = useState('');
  const [usernickname, setUsernickname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState('');
  const navigate = useNavigate();

  const handleGenderChange = (selectedOption) => {
    setGender(selectedOption ? selectedOption.value : '');
  };

  const handleStateChange = (selectedOption) => {
    setState(selectedOption ? selectedOption.value : '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (gender && state && lastName && firstName && birth && usernickname && username && password) {
      const signupData = {
        lastName,
        firstName,
        gender,
        birth,
        usernickname,
        username,
        password,
        state,
      };

      try {
        const response = await fetch('/process/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signupData),
        });
        const result = await response.json();

        if (result.success) {
          navigate('/LoginTap');
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error('회원가입 요청 중 오류 발생:', error);
        alert('회원가입 요청 중 오류가 발생했습니다.');
      }
    } else {
      alert('모든 정보를 입력해주세요.');
    }
  };

  const genderOptions = [
    { value: '남성', label: '남성' },
    { value: '여성', label: '여성' },
  ];

  const stateOptions = [
    { value: '우울', label: '저는 지금 우울해요' },
    { value: '불안', label: '저는 지금 불안해요' },
    { value: '강박', label: '저는 지금 강박이 있어요' },
  ];

  return (
    <div className="SignupPage">
      <img className="signupImg" src={signupPage} alt=""></img>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <div className="SignupContent">
          <div className="PersonalInfo1">
            <input
              type="text"
              placeholder="성"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="이름"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="AdditionalInfo1">
            <Select
              className="genderLabel"
              options={genderOptions}
              onChange={handleGenderChange}
              placeholder="성별"
              isClearable
              required
            />
            <input
              type="text"
              placeholder="생년월일"
              value={birth}
              onChange={(e) => setbirth(e.target.value)}
              required
            />
          </div>
          <div className="PersonalInfo2">
            <input
              type="text"
              placeholder="닉네임"
              value={usernickname}
              onChange={(e) => setUsernickname(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="아이디"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="AdditionalInfo2">
            <Select
              className="stateLabel"
              options={stateOptions}
              onChange={handleStateChange}
              placeholder="지금 어떤 상태인가요?"
              isClearable
              required
            />
          </div>
          <button type="submit" className="SignupBtn">
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
