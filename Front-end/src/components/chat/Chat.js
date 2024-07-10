import React, { useState, useEffect } from 'react';
import CommonTable from '../board/boardList/CommonTable';
import CommonTableColumn from '../board/boardList/CommonTableColumn';
import CommonTableRow from '../board/boardList/CommonTableRow';
import CustomPagination from '../board/Pagination';
import './Chat.css';
import axios from 'axios';
import userImg from '../images/userImg.jpg';

const Chat = () => {
  async function checkLogin(event) {
    event.preventDefault();
    console.log('checkLogin 호출됨');
    try {
      const response = await fetch('/check-login', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const result = await response.json();
      console.log('응답 받음:', result);
      if (result.loggedIn) {
        window.location.href = '/MyPage';
      } else {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('세션 확인 중 오류 발생:', error);
      window.location.href = '/login';
    }
  }
  const [dataList, setDataList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    axios
      .post('/process/chat')
      .then((response) => {
        console.log(response.data); // 응답 데이터 확인을 위한 로그 추가
        setDataList(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the posts!', error);
      });
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Array.isArray(dataList) ? dataList.slice(indexOfFirstPost, indexOfLastPost) : [];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openPopup = (roomId) => {
    const url = `/Chatroom/${roomId}`;
    const title = 'popup';
    const status = 'toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=400,height=500,top=100,left=200';
    const newWindow = window.open(url, title, status);

    const form = document.createElement('form');
    form.method = 'post';
    form.action = url;
    form.target = title;

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  return (
    <>
      <div className="chatTop">
        <h1>채팅 대기실</h1>
        <div className="chatmain_body">이곳은 1:1 채팅 대기실입니다.</div>
        <div>대화에 참여해 새로운 만남을 경험해 보세요!</div>
      </div>
      <CommonTable headersName={['닉네임', '상태', '대화하기']}>
        {currentPosts.map((item, index) => (
          <CommonTableRow key={index}>
            <CommonTableColumn>
              <div className="img_name">
                <img className="userImg" src={userImg} alt=""></img>
                <div>{item.nickname}</div>
              </div>
            </CommonTableColumn>
            <CommonTableColumn>{item.state}</CommonTableColumn>
            <CommonTableColumn>
              <button onClick={() => openPopup(item.roomId)}>
                <div>참여</div>
              </button>
            </CommonTableColumn>
          </CommonTableRow>
        ))}
      </CommonTable>
      <div className="pagination">
        <CustomPagination
          currentPage={currentPage}
          totalPages={Math.ceil(dataList.length / postsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Chat;
