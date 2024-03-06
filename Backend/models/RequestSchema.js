const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    chatLink: String,
    chatIds: [{
        chatId: String,
        createdAt: { type: Date, default: Date.now }
    }]
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
