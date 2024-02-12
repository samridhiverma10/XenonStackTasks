const express = require("express");
const router = express.Router();

const answerDb = require("../models/answer");

router.post("/", async (req, res) => {
  try {
    await answerDb
      .create({
        answer: req.body.answer,
        questionId: req.body.questionId,
        user: req.body.user,
      })
      .then(() => {
        res.status(201).send({
          status: true,
          message: "Answer added successfully",
        });
      })
      .catch((e) => {
        res.status(400).send({
          status: false,
          message: "Bad Request",
        });
      });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error in adding answers",
    });
  }
});

module.exports = router;
