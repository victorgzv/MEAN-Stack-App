const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/signup", (req, res, next) => {
  console.log("called");
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created successfully",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (result) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      //create JWT
      const token = jwt.sign(
        { email: user.email, userId: user._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Auth failed",
      });
    });
});
module.exports = router;
