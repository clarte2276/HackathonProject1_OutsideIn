const express = require("express");
const mysql = require("mysql");
const db_config = require("./config/db_config.json");
const moment = require("moment");
const router = express.Router();
const path = require("path");
const app = express();
const session = require("express-session");

// URL을 인코딩하는 코드
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
  pool.query("SELECT nickname, state FROM users", (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("서버 오류");
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
