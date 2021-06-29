const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();

app.use((req, res, next) => {
  res.header({
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  next();
});

app.use(index);

const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET,POST,PUT,DELETE"],
  },
});

let interval;
let intervalFastData;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  if (intervalFastData) {
    clearInterval(intervalFastData);
  }

  interval = setInterval(() => getApiAndEmit(socket), 1000);
  intervalFastData = setInterval(() => emitFastData(socket), 1);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
    clearInterval(intervalFastData);
  });
});

const getApiAndEmit = (socket) => {
  const response = new Date();
  socket.emit("FromAPI", response);
};

const emitFastData = (socket) => {
  const arrayData = Array.from({ length: 10 }, (el, i) => ({
    id: i,
    left: Math.floor(Math.random() * 99999),
    right: Math.floor(Math.random() * 99999),
  }));
  console.log("arrayData", arrayData);
  socket.emit("FastData", arrayData);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
