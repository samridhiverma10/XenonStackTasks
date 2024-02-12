const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionName: String,
  questionUrl: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },

  answers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "answers",
  },
  user: Object,
});

module.exports = mongoose.model("questions", questionSchema);
