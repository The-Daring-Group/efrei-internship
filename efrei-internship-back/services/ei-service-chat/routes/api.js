const express = require("express");
const router = express.Router();

const data_db = require('../.data_db');

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "db_efrei_internship",
  data_db.Username,
  data_db.Password,
  {
    dialect: "postgres",
    host: data_db.Host,
    port: data_db.Port,
  }
);

try {
  sequelize.authenticate().then(() => {
    console.log("Connection to PostgreSQL database has been established successfully.");
  });
} catch (error) {
  console.error("Unable to connect", error);
}

router.use((req, res, next) => {
  next();
});

router.get("/", (req, res) => {
  res.send("Welcome to the chat API");
});

router.get("/messages", (req, res) => { // Get all messages
  sequelize
    .query("SELECT * FROM chat", { type: Sequelize.QueryTypes.SELECT })
    .then((messages) => {
      res.json(messages);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/messages/:userId1/:userId2", (req, res) => { // Get messages between two users
  sequelize
    .query("SELECT * FROM chat WHERE (id_sender = ? AND id_receiver = ?) OR (id_sender = ? AND id_receiver = ?)", {
      replacements: [req.params.userId1, req.params.userId2, req.params.userId2, req.params.userId1],
      type: Sequelize.QueryTypes.SELECT,
    })
    .then((messages) => {
      res.json(messages);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/messages", (req, res) => { // Post a message
  sequelize
    .query("INSERT INTO chat (content, id_sender, id_receiver) VALUES (?, ?, ?)", {
      replacements: [req.body.content, req.body.id_sender, req.body.id_receiver],
      type: Sequelize.QueryTypes.INSERT,
    })
    .then((messages) => {
      res.json(messages);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.put("/messages/read/:messageId", (req, res) => { // Make a message as read
  sequelize
    .query("UPDATE chat SET is_read = true WHERE id = ?", {
      replacements: [req.params.messageId],
      type: Sequelize.QueryTypes.UPDATE,
    })
    .then((messages) => {
      res.json(messages);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
router.get("/messages/unread/:userId1/:userId2", (req, res) => { // Get unread messages in a conversation
  sequelize
    .query("SELECT * FROM chat WHERE id_sender = ? AND id_receiver = ? AND is_read = false", {
      replacements: [req.params.userId1, req.params.userId2],
      type: Sequelize.QueryTypes.SELECT,
    })
    .then((messages) => {
      res.json(messages);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// TODO Can be deleted when the request is implemented in apiInternship.js of Auth
router.get("/user/:userId", (req, res) => { // Get user by id
  sequelize
    .query("SELECT * FROM person WHERE id = ?", {
      replacements: [req.params.userId],
      type: Sequelize.QueryTypes.SELECT,
    })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
