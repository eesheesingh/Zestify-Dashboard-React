// routes/chatMembers.js

const express = require('express');
const router = express.Router();
const ChatMember = require('../models/ChatMemberSchema');
const Link = require("../models/LinkCostSchema");
const Request = require('../models/RequestSchema');

router.get('/', async (req, res) => {
  const { chatId } = req.query;

  if (!chatId) {
    return res.status(400).json({ error: 'ChatId is required!' });
  }

  try {
    let chatMembers;

    if (chatId === "123456789") {
      chatMembers = await ChatMember.find();
    } else if (chatId === "uday01") {
        chatMembers = await ChatMember.find({ 
          chatId: {$in: ["-1001622855977", "-1001354366085", "-1001104856892", "-1001157694476"]}
      });
    } else {
      chatMembers = await ChatMember.find({
        $or: [
          { chatId: chatId },
          { phone: chatId }
        ]
      });
    } 

    if (!chatMembers || chatMembers.length === 0) {
      return res.status(404).json({ error: 'Chat members not found!' });
    }

    res.json(chatMembers);
  } catch (error) {
    console.error('Error fetching chat members:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/requestId", async (req, res) => {
  const { linkId, chatId } = req.body;
  try {
    const existingRequest = await Request.findOne({ chatLink: linkId, "chatIds.chatId": chatId });
    if (existingRequest) {
      return res.status(400).json({ message: "Chat ID already exists for this link" });
    }

    const filter = { chatLink: linkId };
    const update = {
      $addToSet: { chatIds: { chatId: chatId } },
      $setOnInsert: { createdAt: new Date() }
    };
    const options = { upsert: true, new: true };
    
    const request = await Request.findOneAndUpdate(filter, update, options);
    
    if (request === null) {
      return res.status(200).json({ message: "Request ID saved successfully" });
    } else {
      return res.status(200).json({ message: "Request ID updated successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/removeChatId", async (req, res) => {
  const { requestId, chatId } = req.body;
  try {
    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.chatIds = request.chatIds.filter((chat) => chat.chatId !== chatId);
    await request.save();

    return res.status(200).json({ message: "ChatId removed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get('/requests', async (req, res) => {
  const { chatLink } = req.query;
  try {
    const requests = await Request.find({ chatLink: chatLink });
    res.json(requests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/phone", async (req, res) => {
  try {
    const { chatId, phone } = req.body;

    if (!chatId || !phone) {
      return res.status(400).json({ error: 'Chat ID and Phone Number are required' });
    }

    const chatMember = await ChatMember.findOne({ chatId });

    if (!chatMember) {
      return res.status(404).json({ message: "Chat ID is not found" });
    }

    if (chatMember.phone) {
      return res.status(400).json({ message: "Phone number already exists for this Chat ID" });
    }

    chatMember.phone = phone;
    await chatMember.save();
    
    return res.status(200).json({ message: "Phone number saved successfully", chatMember });
    
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Phone number already exists" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/saveAdCost", async (req, res) => {
  try {
    const { chatLink, adCost, selectedDate } = req.body;

    const dateObject = new Date(selectedDate);

    let link = await Link.findOne({ chatLink });

    if (link) {
      const existingAdCostIndex = link.adCost.findIndex(
        (cost) => cost.date.toISOString() === dateObject.toISOString()
      );

      if (existingAdCostIndex !== -1) {
        link.adCost[existingAdCostIndex].adCost = adCost;
      } else {
        link.adCost.push({ adCost, date: dateObject });
      }

      await link.save();
      res.status(200).json({ message: `Ad cost saved successfully for ${chatLink}` });
    } else {
      link = await Link.create({ chatLink, adCost: [{ adCost, date: dateObject }] });
      res.status(200).json({ message: `New chat link and ad cost saved successfully for ${chatLink}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getAdCost", async (req,res) => {
  try {
    const adCost = await Link.find();
    res.json(adCost);
  } catch (error) {
    res.status(500).json({message: "Unable to fetch data"})
  }
});

module.exports = router;