const messageModel = require("../model/messageModel");

module.exports = {
  // ----------------------------------------------------------------ADDING MESSAGE FROM USER SIDE-------------------------------------------------------------------

  addMessage: async (req, res) => {
    try {
      const from = req.userId.toString();
      const { to, message } = req.body;

      const data = await messageModel.create({
        message: { text: message },
        users: [from, to],
        sender: from,
      });

      if (data) return res.status(200).json({ message: "message Sent" });
      else return res.json({ msg: "Failed to add message to the database" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // ------------------------------------------------------------------ GET ALL MESSAGES FOR USERS -------------------------------------------------------------------

  getAllMessages: async (req, res) => {
    try {
      const from = req.userId.toString();
      const { to } = req.body;

      const messages = await messageModel
        .find({ users: { $all: [from, to] } })
        .sort({ updatedAt: 1 });

      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() == from,
          message: msg.message.text
        };
      });
      res.json(projectedMessages);
    } catch (error) {
      res.status(500).json({ message: "Internal Server error" });
    }
  },

  // ------------------------------------------------------------------ GET ALL MESSAGES FOR DOCTORS -------------------------------------------------------------------

  getAllMessagesForDoctor: async (req, res) => {
    try {
      const from = req.doctorId.toString();
      const { to } = req.body;
      const messages = await messageModel
        .find({ users: { $all: [from, to] } })
        .sort({ updatedAt: 1 });
      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() == from,
          message: msg.message.text,
        };
      });
      res.json(projectedMessages);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // ------------------------------------------------------------------ ADDING MESSAGE FROM DOCTOR SIDE -------------------------------------------------------------------
  
  addMessageFromDoctor: async (req, res) => {
    try {
      const from = req.doctorId.toString();
      const { to, message } = req.body;
      const data = await messageModel.create({
        message: { text: message },
        users: [from, to],
        sender: from,
      });
      if (data) return res.status(200).json({ message: "message Sent" });
      else return res.json({ msg: "Failed to add message to the database" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
