const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/add", (req, res) => {
  const newUser = new User({
    email: req.body.email,
  });

  newUser
    .save()
    .then((user) => {
      res.json({ result: "success", user });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/", (req, res) => {
  User.find()
    .then((req) => res.json(req))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
