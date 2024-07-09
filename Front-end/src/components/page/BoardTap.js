import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CommonTable from '../table/CommonTable';
import CommonTableColumn from '../table/CommonTableColumn';
import CommonTableRow from '../table/CommonTableRow';
import { postList } from '../../Data';
import Boardbar from './Boardbar';

function BoardMain(props) {
  return (
    <>
      <h1>{props.title} 게시판</h1>
      <div>
        이곳은 {props.title} 게시판입니다.
        <br></br>
        {props.body}
      </div>
    </>
  );
}

const BoardTap = (props) => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    setDataList(postList);
  }, []);

  return (
    <>
      <BoardMain title="기쁨이" body="본인의 챌린지 및 치료 후기를 적어주세요!"></BoardMain>
      <Boardbar />
      <CommonTable headersName={['제목', '작성자', '작성일', '좋아요']}>
        {dataList
          ? dataList.map((item, index) => {
              return (
                <CommonTableRow key={index}>
                  <CommonTableColumn>
                    <Link to={`/postView/${item.no}`}>{item.title}</Link>
                  </CommonTableColumn>
                  <CommonTableColumn>{item.name}</CommonTableColumn>

                  <CommonTableColumn>{item.createDate}</CommonTableColumn>
                  <CommonTableColumn>{item.readCount}</CommonTableColumn>
                </CommonTableRow>
              );
            })
          : ''}
      </CommonTable>
    </>
  );
};

export default BoardTap;
