import React, { useEffect, useState } from "react";
import "./MypageTap.css";
import userImg from "./images/userImg.jpg";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MypageTap() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [usernickname, setUsernickname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("");
  const navigate = useNavigate();

  const genderOptions = [
    { value: "남성", label: "남성" },
    { value: "여성", label: "여성" },
  ];

  const stateOptions = [
    { value: "우울", label: "저는 지금 우울해요" },
    { value: "불안", label: "저는 지금 불안해요" },
    { value: "강박", label: "저는 지금 강박이 있어요" },
  ];

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/user");
      const userData = response.data;

      setLastName(userData.Lastname);
      setFirstName(userData.Firstname);
      setUsernickname(userData.nickname);
      setUsername(userData.id);
      setBirthdate(userData.birth);
      setGender(userData.gender);
      setState(userData.state);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "lastName":
        setLastName(value);
        break;
      case "firstName":
        setFirstName(value);
        break;
      case "usernickname":
        setUsernickname(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "birthdate":
        setBirthdate(value);
        break;
      default:
        break;
    }
  };

  const handleGenderChange = (selectedOption) => {
    setGender(selectedOption ? selectedOption.value : "");
  };

  const handleStateChange = (selectedOption) => {
    setState(selectedOption ? selectedOption.value : "");
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const updateData = {
        lastName,
        firstName,
        nickname: usernickname,
        birth: birthdate,
        gender,
        state,
      };

      if (password) {
        updateData.password = password;
      }

      const response = await axios.post("/process/update_user", updateData);

      if (response.status === 200) {
        alert("변경사항이 저장되었습니다.");
        navigate("/"); // 변경 후 다른 페이지로 이동
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("변경사항을 저장하는 데 오류가 발생했습니다.");
    }
  };

  return (
    <div className="myPage">
      <h1>마이페이지</h1>
      <form onSubmit={handleSave} className="userProfileForm">
        <div className="userProfile">
          <img className="userImg" src={userImg} alt=""></img>
          <div className="userProfileBtn">
            <button type="button" className="imgUplode">
              이미지 업로드
            </button>
            <button type="button" className="imgDelete">
              이미지 제거
            </button>
          </div>
        </div>
        <div className="userProfileInfo">
          <div className="userProfileName">
            이름{" "}
            <input
              type="text"
              name="firstName"
              placeholder="이름"
              value={firstName}
              onChange={handleInputChange}
            />
            성{" "}
            <input
              type="text"
              name="lastName"
              placeholder="성"
              value={lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="userProfileNickname">
            닉네임{" "}
            <input
              type="text"
              name="usernickname"
              placeholder="닉네임"
              value={usernickname}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <br></br>
        <div className="userProfileAdditionalInfo">
          <div className="additional1">
            아이디{" "}
            <input type="text" placeholder="아이디" value={username} disabled />
            비밀번호{" "}
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="additional2">
            생년월일{" "}
            <input
              type="text"
              name="birthdate"
              placeholder="생년월일"
              value={birthdate}
              onChange={handleInputChange}
            />
            성별{" "}
            <Select
              className="genderLabel"
              options={genderOptions}
              value={genderOptions.find((option) => option.value === gender)}
              onChange={handleGenderChange}
              placeholder="성별"
              isClearable
            />
          </div>
          <div className="additional3">
            지금 상태는{" "}
            <Select
              className="stateLabel"
              options={stateOptions}
              value={stateOptions.find((option) => option.value === state)}
              onChange={handleStateChange}
              placeholder="상태"
              isClearable
            />
          </div>
        </div>
        <br></br>
        <button type="submit" className="saveBtn">
          저장
        </button>
      </form>
    </div>
  );
}

export default MypageTap;
