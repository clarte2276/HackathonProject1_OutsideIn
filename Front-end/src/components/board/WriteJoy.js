import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BoardTap.css';
import axios from 'axios';

const WriteJoy = ({ onPostSave }) => {
  const navigate = useNavigate();

  const [board, setBoard] = useState({
    title: '',
    body: '',
  });

  const { title, body } = board;

  const onChange = (event) => {
    const { value, name } = event.target;
    setBoard({
      ...board,
      [name]: value,
    });
  };

  const saveBoard = async () => {
    const newPost = {
      no: 5, // 새로운 게시글의 번호
      title: title,
      nickname: body,
      created_date: new Date().toISOString(),
      viewCount: 0,
    };

    await axios.post(`/joy`, newPost).then((res) => {
      alert('등록되었습니다.');
      onPostSave(newPost); // 새로운 게시글을 전달하여 리스트 갱신
      navigate('/joy');
    });
  };

  const backToList = () => {
    navigate('/joy');
  };

  return (
    <div>
      <div>
        <span>제목</span>
        <input type="text" name="title" value={title} onChange={onChange} />
      </div>
      <br />
      <div>
        <span>내용</span>
        <textarea name="body" cols="30" rows="10" value={body} onChange={onChange}></textarea>
      </div>
      <br />
      <div>
        <button onClick={backToList}>취소</button>
        <button onClick={saveBoard}>등록하기</button>
      </div>
    </div>
  );
};

export default WriteJoy;
