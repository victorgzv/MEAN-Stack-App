const express = require("express");
const bodyParser = require("body-parser");
const moongose = require("mongoose");

const Post = require("./models/post");
const app = express();
moongose
  .connect(
    "mongodb+srv://vic:miNNzlmsq7ySM5EN@cluster0-wvjy0.mongodb.net/node-angular?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, x-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save();
  console.log(post);
  res.status(201).json({
    message: "Post added successfully",
  });
});

app.use("/api/posts", (req, res, next) => {
  const posts = [];
  res.status(200).json({
    message: "Post fetched successfully",
    posts: posts,
  });
});

module.exports = app;
