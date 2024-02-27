// routes/chatMembers.js

const express = require('express');
const router = express.Router();
const ChatMember = require('../models/ChatMemberSchema');
const Link = require("../models/LinkCostSchema");

router.get('/', async (req, res) => {
  const { chatId } = req.query;

  if (!chatId) {
    return res.status(400).json({ error: 'ChatId is required in the request body' });
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
      chatMembers = await ChatMember.find({ chatId });
    } 

    if (!chatMembers || chatMembers.length === 0) {
      return res.status(404).json({ error: 'Chat members not found' });
    }

    res.json(chatMembers);
  } catch (error) {
    console.error('Error fetching chat members:', error);
    res.status(500).json({ error: 'Internal Server Error' });
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