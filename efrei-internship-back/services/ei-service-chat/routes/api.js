// api.js
const express = require("express");
const router = express.Router();

const db = require("../models");

db.sequelize.sync().then(() => {
  console.log("Database connected");
});

const { Chat } = require("../models");

router.use((req, res, next) => {
  next();
});

router.get("/", (req, res) => {
  res.send("Welcome to the chat API");
});

router.get("/messages", async (req, res) => {
  Chat.findAll()
    .then((chat) => {
      res.status(200).json(chat);
    })
    .catch((error) => {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// get all messages between two users
router.get("/messages/:userID1/:userID2", async (req, res) => {
  const { userID1, userID2 } = req.params;
  Chat.findAll({
    where: {
      [Op.or]: [
        {
          id_sender: userID1,
          id_receiver: userID2,
        },
        {
          id_sender: userID2,
          id_receiver: userID1,
        },
      ],
    },
  })
    .then((messages) => {
      res.status(200).json(messages); // think to sort by date and be sure which user is the sender
    })
    .catch((error) => {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.post("/messages", async (req, res) => {
  const { content, date, id_sender, id_receiver } = req.body;

  Chat.create({
    content,
    date,
    id_sender,
    id_receiver,
  })
    .then((chat) => {
      res.status(201).json(chat);
    })
    .catch((error) => {
      console.error("Error creating chat:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
