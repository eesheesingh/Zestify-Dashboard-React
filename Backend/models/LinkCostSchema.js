const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  chatLink: String,
  adCost: [{
      adCost: Number,
      date: Date,
    }],
});

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;
