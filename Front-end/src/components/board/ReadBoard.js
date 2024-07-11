import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BoardTap.css';
import axios from 'axios';

function ReadBoard() {
  const { no } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 백엔드에서 게시글 목록을 가져옴
    axios
      .get(`/joy/PostView/${no}`) // 추출한 매개변수를 사용하여 요청 URL 구성
      .then((response) => {
        console.log('응답 데이터:', response.data); // 응답 데이터 출력
        setPost(response.data); // 데이터를 상태에 설정
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the post!', error);
        setError('There was an error fetching the post!');
        setLoading(false);
      });
  }, [no]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  const { title, nickname, created_date, content } = post.post;

  return (
    <div className="post-container">
      <h2>{title}</h2>
      <p>작성자: {nickname}</p>
      <p>작성일: {created_date}</p>
      <p>내용: {content}</p>
    </div>
  );
}

export default ReadBoard;
