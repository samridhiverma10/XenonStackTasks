const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  articleName: String,

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  user: Object,
});

module.exports = mongoose.model("articles", articleSchema);
