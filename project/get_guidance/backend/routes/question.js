const express = require("express");
const router = express.Router();

const questionDB = require("../models/question.js");

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    await questionDB
      .create({
        questionName: req.body.questionName,
        questionUrl: req.body.questionUrl,
        user: req.body.user,
      })
      .then(() => {
        res.status(201).send({
          status: true,
          message: "Question added successfully",
        });
      })
      .catch((e) => {
        res.status(400).send({
          status: true,
          message: "Bad Request",
        });
      });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "There is some error adding the question",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    await questionDB
      .aggregate([
        {
          $lookup: {
            from: "answers",
            localField: "_id",
            foreignField: "questionId",
            as: "allAnswers",
          },
        },
      ])
      .exec()
      .then((doc) => {
        res.status(200).send(doc);
      })
      .catch((error) => {
        res.send(500).send({
          status: false,
          message: "Unable to get the question details",
        });
      });
  } catch (error) {
    res.send(500).send({
      status: false,
      messge: "Error",
    });
  }
});
module.exports = router;
