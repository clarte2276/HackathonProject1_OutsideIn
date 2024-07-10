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

// 채팅방 메시지 조회 (GET)
router.get("/chatrooms/:roomId/messages", (req, res) => {
  const roomId = req.params.roomId;
  pool.query(
    "SELECT * FROM messages WHERE room_id = ?",
    [roomId],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("서버 오류");
      } else {
        res.json(results);
      }
    }
  );
});

// 새로운 메시지 전송 (POST)
router.post("/chatrooms/:roomId/messages", (req, res) => {
  const roomId = req.params.roomId;
  const { sender_id, receiver_id, content } = req.body;

  pool.query(
    "INSERT INTO messages (room_id, sender_id, receiver_id, content) VALUES (?, ?, ?, ?)",
    [roomId, sender_id, receiver_id, content],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("서버 오류");
      } else {
        res.status(201).send("메시지 전송 성공");
      }
    }
  );
});

module.exports = router;
