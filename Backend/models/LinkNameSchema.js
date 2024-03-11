const mongoose = require('mongoose');

const chatLinkMappingSchema = new mongoose.Schema({
  userDefinedName: { type: String }, // Make it optional
  chatLink: { type: String, required: true },
});

const ChatLinkMapping = mongoose.model('ChatLinkMapping', chatLinkMappingSchema);

module.exports = ChatLinkMapping;
