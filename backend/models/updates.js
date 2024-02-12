const mongoose = require("mongoose");

const updateSchema = new mongoose.Schema({
  updateName: String,
  updateContent: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: Object,
});

module.exports = mongoose.model("updates", updateSchema);
