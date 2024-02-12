const express = require("express");
const router = express.Router();

const articleDB = require("../models/articles.js");

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    await articleDB
      .create({
        articleName: req.body.articleName,
        user: req.body.user,
      })
      .then(() => {
        res.status(201).send({
          status: true,
          message: "Article added successfully",
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
      message: "There is some error adding the article",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    await articleDB
      .find({})
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
