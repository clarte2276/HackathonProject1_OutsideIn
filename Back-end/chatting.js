//채팅창(Chattin Room) 기능
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
router.get("/chatrooms/:userId/messages", (req, res) => {
  const my_roomid = req.session.user.roomid;
  console.log(my_roomid);
  const userId = req.params.userId;
  console.log(`Fetching messages for userId: ${userId}`); //콘솔로그ㅁㄴㅇ
  pool.query(
    "SELECT * FROM messages WHERE sender_id = ? OR receiver_id = ?",
    [userId, userId],
    (error, results) => {
      if (error) {
        console.error("Error fetching messages:", error);
        res.status(500).send("서버 오류");
      } else {
        console.log("Fetched messages:", results);
        res.json(results);
      }
    }
  );
});
// 새로운 메시지 전송 (POST)

router.post("/chatrooms/:userId/messages", (req, res) => {
  const my_roomid = req.session.user.roomid;
  console.log(my_roomid);
  const { receiver_id, content } = req.body;
  console.log("Received message to store:", {
    my_roomid,
    receiver_id,
    content,
  });

  pool.query(
    "SELECT * FROM users WHERE roomId = ?",
    [receiver_id],
    (err, results) => {
      if (err) {
        console.error("Error checking user IDs:", err);
        return res.status(500).send("서버 오류");
      }

      if (results.length === 0) {
        console.error("Invalid receiver_id:", { receiver_id });
        return res.status(400).send("유효하지 않은 receiver_id");
      }

      pool.query(
        "INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)",
        [my_roomid, receiver_id, content],
        (error, results) => {
          if (error) {
            console.error("Message save error:", error);
            return res.status(500).send("서버 오류");
          } else {
            console.log("Message saved successfully:", results);

            // 두 번째 쿼리 실행: 반대 방향으로 메시지 저장
            pool.query(
              "INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)",
              [receiver_id, my_roomid, content],
              (error, results) => {
                if (error) {
                  console.error("Message save error:", error);
                  return res.status(500).send("서버 오류");
                } else {
                  console.log(
                    "Message saved successfully in reverse direction:",
                    results
                  );
                  return res.status(201).send("메시지 전송 성공");
                }
              }
            );
          }
        }
      );
    }
  );
});

module.exports = router;
