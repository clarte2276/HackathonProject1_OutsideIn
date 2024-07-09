const express = require("express");
const mysql = require("mysql");
const db_config = require("./config/db_config.json");
const router = express.Router();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: db_config.host,
  user: db_config.user,
  password: db_config.password,
  database: db_config.database,
  port: db_config.port,
  debug: false,
});

// 게시글 목록 조회 (GET)
router.get("/process/chat", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("로그인이 필요합니다.");
  }

  const currentUserNickname = req.session.user.nickname;

  pool.query(
    "SELECT roomId, nickname, state FROM users WHERE nickname != ?",
    [currentUserNickname],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("서버 오류");
      } else {
        console.log(results); // 응답 데이터 확인을 위한 로그 추가
        res.json(results);
      }
    }
  );
});

module.exports = router;
