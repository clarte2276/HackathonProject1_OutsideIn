import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CommonTable from './boardList/CommonTable';
import CommonTableColumn from './boardList/CommonTableColumn';
import CommonTableRow from './boardList/CommonTableRow';
import Boardbar from './Boardbar';
import BoardMain from './BoardMain';
import CustomPagination from './Pagination';
import NewBoardButton from './NewBoardButton';
import './BoardTap.css';
import axios from 'axios';

const JoyBoard = () => {
  const [dataList, setDataList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    // 백엔드에서 게시글 목록을 가져옴
    axios
      .post('/joy')
      .then((response) => {
        console.log('응답 데이터:', response.data); // 응답 데이터 출력
        setDataList(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the posts!', error);
      });
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = dataList.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="BoardTop">
        <BoardMain title="기쁨이" body="본인의 챌린지 및 치료 후기를 적어주세요!"></BoardMain>
        <div className="Boardbar">
          <Boardbar />
        </div>
      </div>
      <CommonTable headersName={['제목', '작성자', '작성일', '좋아요']}>
        {currentPosts.map((item, index) => (
          <CommonTableRow key={index}>
            <CommonTableColumn>
              <Link to={`/PostView/${item.no}`} style={{ textDecoration: 'none' }}>
                <div className="table_title">{item.title}</div>
              </Link>
            </CommonTableColumn>
            <CommonTableColumn>{item.nickname}</CommonTableColumn>
            <CommonTableColumn>{item.created_date}</CommonTableColumn>
            <CommonTableColumn>{item.viewCount}</CommonTableColumn>
          </CommonTableRow>
        ))}
      </CommonTable>
      <NewBoardButton emotion="joy" />
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

export default JoyBoard;
