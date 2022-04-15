// create the express server here
const express = require("express");
const morgan = require("morgan");
const apiRouter = require("./api");
const { client } = require("./db");
const { PORT = 3000 } = process.env;
const server = express();
const cors = require("cors");

server.use(express.json());
server.use(morgan("dev"));
server.use(cors());

client.connect();
server.use("/api", apiRouter);
server.listen(PORT, () => {
  console.log("The server is up on post", PORT);
});
