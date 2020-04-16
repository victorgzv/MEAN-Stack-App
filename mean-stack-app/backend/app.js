const express = require("express");

const app = express();

app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "fdgad2",
      title: "First dummy server-side title",
      content: "some content coming from the server",
    },
    {
      id: "fefe2",
      title: "Second dummy server-side title",
      content: "some content",
    },
  ];
  res.status(200).json({
    message: "Post fetched successfully",
    posts: posts,
  });
});

module.exports = app;
