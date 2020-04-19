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
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id,
    });
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Post fetched successfully",
      posts: documents,
    });
  });
});

app.get("/api/posts/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(202).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post deleted" });
  });
});

app.put("/api/posts/:id", (req, res, next) => {
  Post.update({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
  }).then((updatedPost) => {
    console.log(updatedPost);
    res.status(201).json({
      message: "Post updated successfully",
    });
  });
});
module.exports = app;
