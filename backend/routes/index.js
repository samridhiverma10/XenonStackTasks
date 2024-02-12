const express = require("express");
const router = express.Router();

const questionRouter = require("./question");
const answerRouter = require("./answer");
const articleRouter = require("./articles");
const updateRouter = require("./updates");
router.get("/", (req, res) => {
  res.send("This API is running");
});

router.use("/questions", questionRouter);
router.use("/answers", answerRouter);
router.use("/articles", articleRouter);
router.use("/updates", updateRouter);

module.exports = router;
