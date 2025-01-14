import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CommonTable from './boardList/CommonTable';
import CommonTableColumn from './boardList/CommonTableColumn';
import CommonTableRow from './boardList/CommonTableRow';
import { postList } from '../../Data';
import Boardbar from './Boardbar';
import BoardMain from './BoardMain';
import CustomPagination from './Pagination';
import NewBoardButton from './NewBoardButton';
import './BoardTap.css';

const FearBoard = () => {
  const { page } = useParams();
  const [dataList, setDataList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    setDataList(postList);
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
        <BoardMain title="소심이" body="당신의 강박증상을 공유해주세요."></BoardMain>
        <div className="Boardbar">
          <Boardbar />
        </div>
      </div>
      <CommonTable headersName={['제목', '작성자', '작성일', '좋아요']}>
        {currentPosts.map((item, index) => (
          <CommonTableRow key={index}>
            <CommonTableColumn>
              <Link to={`/fear/PostView/${item.no}`} style={{ textDecoration: 'none' }}>
                <div className="table_title">{item.title}</div>
              </Link>
            </CommonTableColumn>
            <CommonTableColumn>{item.name}</CommonTableColumn>
            <CommonTableColumn>{item.createDate}</CommonTableColumn>
            <CommonTableColumn>{item.readCount}</CommonTableColumn>
          </CommonTableRow>
        ))}
      </CommonTable>
      <NewBoardButton emotion="Fear" />
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

export default FearBoard;
