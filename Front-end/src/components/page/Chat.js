import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CommonTable from "../table/CommonTable";
import CommonTableColumn from "../table/CommonTableColumn";
import CommonTableRow from "../table/CommonTableRow";
import CustomPagination from "./Pagination";
import "./BoardTap.css";
import axios from "axios";
import userImg from "../images/userImg.jpg";

const Chat = () => {
  async function checkLogin(event) {
    event.preventDefault();
    console.log("checkLogin 호출됨");
    try {
      const response = await fetch("/check-login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      console.log("응답 받음:", result);
      if (result.loggedIn) {
        window.location.href = "/MyPage";
      } else {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("세션 확인 중 오류 발생:", error);
      window.location.href = "/login";
    }
  }
  const [dataList, setDataList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    axios
      .get("/process/chat")
      .then((response) => {
        console.log(response.data); // 응답 데이터 확인을 위한 로그 추가
        setDataList(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the posts!", error);
      });
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Array.isArray(dataList)
    ? dataList.slice(indexOfFirstPost, indexOfLastPost)
    : [];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <CommonTable headersName={["닉네임", "상태", "대화하기"]}>
        {currentPosts.map((item, index) => (
          <CommonTableRow key={index}>
            {/* <CommonTableColumn>
              <Link to={`/PostView/${item.no}`} style={{ textDecoration: 'none' }}>
                <div className="table_title">{item.title}</div>
              </Link>
            </CommonTableColumn> */}
            <CommonTableColumn>{item.nickname}</CommonTableColumn>
            <CommonTableColumn>{item.state}</CommonTableColumn>
            <Link
              to={`/Chatroom/${item.no}`}
              style={{ textDecoration: "none" }}
            >
              <div>참여</div>
            </Link>
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
      <img className="userImg" src={userImg} alt=""></img>
    </>
  );
};

export default Chat;
