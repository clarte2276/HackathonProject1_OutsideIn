import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BoardTap.css';
import axios from 'axios';

function WriteJoy() {
  const navigate = useNavigate();
  const location = useLocation();
  const { nextNo } = location.state || {};

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

  const saveBoard = async (event) => {
    event.preventDefault();
    const newPost = {
      no: nextNo, // 새로운 게시글의 번호
      title,
      nickname: 0,
      content: body,
      created_date: new Date().toISOString(),
      viewCount: 0,
    };

    try {
      await axios.post(`/joy`, newPost);
      alert('등록되었습니다.');
      console.log('현재 데이터:', newPost);
      navigate('/joy', { state: { newPost } });
    } catch (error) {
      console.error('Error saving post:', error);
      alert('글을 저장하는 도중 오류가 발생했습니다.');
    }
  };

  const backToList = () => {
    navigate('/joy');
  };

  return (
    <form onSubmit={saveBoard}>
      <div>
        <span>제목</span>
        <input type="text" name="title" placeholder="제목" value={title} onChange={onChange} />
      </div>
      <br />
      <div>
        <span>내용</span>
        <textarea name="body" placeholder="내용" value={body} onChange={onChange}></textarea>
      </div>
      <br />
      <button type="button" onClick={backToList}>
        취소
      </button>
      <input type="submit" value="등록하기"></input>
    </form>
  );
}

export default WriteJoy;
