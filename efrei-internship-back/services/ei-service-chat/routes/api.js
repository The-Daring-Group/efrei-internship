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

const Chat = sequelize.define("chat", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  id_sender: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  id_receiver: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

try {
  sequelize.authenticate().then(() => {
    console.log("Connection to PostgreSQL database has been established successfully.");
  });
} catch (error) {
  console.error("Unable to connect", error);
}

sequelize.sync();

router.use((req, res, next) => {
  next();
});

router.get("/", (req, res) => {
  res.send("Welcome to the chat API");
});

router.get("/messages", (req, res) => {
  /*sequelize
    .query("SELECT * FROM chat", { type: Sequelize.QueryTypes.SELECT })
    .then((messages) => {
      res.json(messages);
    });*/
  Chat.findAll().then((messages) => {
    res.json(messages);
  });
});

module.exports = router;
