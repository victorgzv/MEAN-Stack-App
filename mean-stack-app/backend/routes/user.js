const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const User = new User({
      email: req.body.email,
      password: hash,
    });
    User.save()
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

module.exports = router;
