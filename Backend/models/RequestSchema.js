const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    chatId: String,
    chatLink: String,
    createdAt: { type: Date, default: Date.now }
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
