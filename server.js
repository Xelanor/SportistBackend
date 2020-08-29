const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");

require("dotenv").config();

const app = express();
const server = require("http").Server(app);
const port = process.env.PORT || 5000;

app.use(morgan("dev"));
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

const io = socketio(server);

io.on("connection", (socket) => {
  console.log("We have a new connection.");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use(function (req, res, next) {
  req.io = io;
  next();
});

// Routes
const usersRouter = require("./routes/Users");

app.use("/api/user", usersRouter);
