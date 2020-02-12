const express = require("express");

const postsRouter = require("./data/posts-router");

const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/posts", postsRouter)

server.get("/", (req, res) => {
    res.send(`<h1>HI</h1>`)
})

server.listen(5000, () => {
    console.log(`Server running on port 5000`)
})