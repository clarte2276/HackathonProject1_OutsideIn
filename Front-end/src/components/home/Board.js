import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Board.css';
import axios from 'axios';

function Board(props) {
  const [dataList, setDataList] = useState([]);

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

  const getLinkClass = () => {
    switch (props.emotion) {
      case 'joy':
        return 'Board_plusLink joy';
      case 'sadness':
        return 'Board_plusLink sadness';
      case 'anxiety':
        return 'Board_plusLink anxiety';
      case 'fear':
        return 'Board_plusLink fear';
      default:
        return 'Board_plusLink';
    }
  };
  const getShadowClass = () => {
    switch (props.emotion) {
      case 'joy':
        return 'Board_name joy';
      case 'sadness':
        return 'Board_name sadness';
      case 'anxiety':
        return 'Board_name anxiety';
      case 'fear':
        return 'Board_name fear';
      default:
        return 'Board_name';
    }
  };
  return (
    <div className="Board_all">
      <div className="nameLink_layout">
        <div className={getShadowClass()}>{props.title}</div>
        <Link className={getLinkClass()} to={'/' + props.emotion}>
          +
        </Link>
      </div>
      <div className="Board_title_body">
        {dataList.length > 0 ? (
          (() => {
            const items = [];
            for (let i = 0; i < Math.min(2, dataList.length); i++) {
              items.push(
                <div key={i} className="Board_body">
                  <h3>{dataList[i].title}</h3>
                  <div className="Board_body_body">
                    {dataList[i].content.length > 10
                      ? `${dataList[i].content.substring(0, 10)}...`
                      : dataList[i].content}
                  </div>
                  <div>{i === 0 && <div className="BorderLine"></div>}</div>
                </div>
              );
            }
            return items;
          })()
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default Board;
