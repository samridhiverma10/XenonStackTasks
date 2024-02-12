const express = require("express");
const router = express.Router();

const updateDB = require("../models/updates.js");

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    await updateDB
      .create({
        updateName: req.body.updateName,
        updateContent: req.body.updateContent,
        user: req.body.user,
      })
      .then(() => {
        res.status(201).send({
          status: true,
          message: "update added successfully",
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
      message: "There is some error adding the update",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    await updateDB
      .find({})
      .exec()
      .then((doc) => {
        res.status(200).send(doc);
      })
      .catch((error) => {
        res.send(500).send({
          status: false,
          message: "Unable to get the update details",
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
