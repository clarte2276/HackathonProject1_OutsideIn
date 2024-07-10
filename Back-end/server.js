const express = require("express");
const mysql = require("mysql");
const path = require("path");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const bcrypt = require("bcrypt");
const db_config = require("./config/db_config.json");

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// MySQL 세션 스토어 옵션
const sessionStoreOptions = {
  host: db_config.host,
  port: db_config.port,
  user: db_config.user,
  password: db_config.password,
  database: db_config.database,
};

const sessionStore = new MySQLStore(sessionStoreOptions);

// Database connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: db_config.host,
  user: db_config.user,
  password: db_config.password,
  database: db_config.database,
  port: db_config.port,
  debug: false,
});

// URL을 인코딩하는 코드
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 세션 세팅
app.use(
  session({
    key: "session_cookie_name",
    secret: "your_secret_key",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24시간
  })
);

// 정적 파일 제공
app.use(express.static(path.join(__dirname, "../Front-end/build")));
app.use(express.static(path.join(__dirname, "public")));

// 외부 라우터 파일 포함
const indexRoutes = require("./index");
const mypageRoutes = require("./mypage");
const postRoutes = require("./post");
const chatlistRoutes = require("./chatlist");
const chattingRoutes = require("./chatting");

app.use("/", indexRoutes);
app.use("/", mypageRoutes);
app.use("/", postRoutes);
app.use("/", chatlistRoutes);
app.use("/", chattingRoutes);

// 회원가입
app.post("/process/signup", async (req, res) => {
  console.log("/process/signup 호출됨", req.body);

  const paramLastName = req.body.lastName;
  const paramFirstName = req.body.firstName;
  const paramGender = req.body.gender;
  const parambirth = req.body.birth;
  const paramNickname = req.body.usernickname;
  const paramID = req.body.username;
  const paramPW = req.body.password;
  const paramState = req.body.state;

  try {
    const hashedPassword = await bcrypt.hash(paramPW, 10);

    pool.getConnection((err, conn) => {
      if (err) {
        console.log("MySQL Connection Error", err);
        if (conn) conn.release();
        return res.json({ success: false, message: "DB 서버 연결 실패" });
      }
      console.log("데이터베이스 연결 성공");

      const exec = conn.query(
        "INSERT INTO users (Lastname, Firstname, gender, birth, nickname, id, password, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
        [
          paramLastName,
          paramFirstName,
          paramGender,
          parambirth,
          paramNickname,
          paramID,
          hashedPassword,
          paramState,
        ],
        (err, result) => {
          conn.release();
          console.log("실행된 SQL: " + exec.sql);

          if (err) {
            console.log("SQL 실행 시 오류 발생", err);
            return res.json({ success: false, message: "Query 실패" });
          }

          if (result) {
            console.dir(result);
            console.log("insert 성공");
            return res.json({ success: true, message: "회원가입 성공" });
          } else {
            console.log("insert 실패");
            return res.json({ success: false, message: "사용자 추가 실패" });
          }
        }
      );
    });
  } catch (error) {
    console.log("비밀번호 해싱 오류", error);
    return res.json({ success: false, message: "비밀번호 해싱 실패" });
  }
});

// 로그인 구현
app.post("/process/login", (req, res) => {
  console.log("/process/login 호출됨", req.body);
  const paramID = req.body.id;
  const paramPW = req.body.password;

  console.log("로그인 요청입니다. " + paramID + " " + paramPW);
  pool.getConnection((err, conn) => {
    if (err) {
      console.log("MySQL Connection Error", err);
      if (conn) conn.release();
      res.status(500).json({ success: false, message: "DB 서버 연결 실패" });
      return;
    }
    conn.query(
      "SELECT id, nickname, password FROM users WHERE id = ?",
      [paramID],
      async (err, rows) => {
        conn.release();
        if (err) {
          console.dir(err);
          res.status(500).json({ success: false, message: "Query 실패" });
          return;
        }

        if (rows.length > 0) {
          const user = rows[0];
          const match = await bcrypt.compare(paramPW, user.password);
          if (match) {
            console.log(
              "아이디 [%s], 패스워드가 일치하는 이름 [%s] 찾음",
              paramID,
              user.nickname
            );
            req.session.user = {
              id: user.id,
              nickname: user.nickname,
              authorized: true,
            };
            res.json({ success: true });
          } else {
            console.log("비밀번호 [%s], 패스워드가 일치하지 않음", paramPW);
            res
              .status(401)
              .json({ success: false, message: "패스워드가 일치하지 않음" });
          }
        } else {
          console.log("아이디 [%s], 패스워드가 일치하는 아이디 없음", paramID);
          res.status(401).json({
            success: false,
            message: "아이디 또는 패스워드가 일치하지 않음",
          });
        }
      }
    );
  });
});

// 나머지 모든 요청을 React 앱의 index.html로 리디렉션
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Front-end/build", "index.html"));
});

app.post('/Chatroom/:roomId', (req, res) => {
  res.sendFile(path.join(__dirname, "../Front-end/build", "index.html"));
});

// 소켓.io 설정
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('message-expert', (msg) => {
    console.log('Received message:', msg);

    const { room_id, sender_index, message } = msg;
    pool.query(
      'INSERT INTO messages (room_id, sender_id, content) VALUES (?, ?, ?)',
      [room_id, sender_index, message],
      (err, result) => {
        if (err) {
          console.error('Message save error:', err);
        } else {
          io.to(room_id).emit('message-expert', msg);  // 특정 방에만 메시지를 방송
        }
      }
    );
  });

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on('leave-room', (roomId) => {
    socket.leave(roomId);
    console.log(`User left room: ${roomId}`);
  });
});


app.listen(3000, () => {
  console.log("서버가 3000 포트에서 실행 중입니다.");
});
