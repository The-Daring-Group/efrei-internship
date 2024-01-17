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
    console.log("Connection to MySQL database has been established successfully.");
  });
} catch (error) {
  console.error("Unable to connect", error);
}

router.use((req, res, next) => {
  next();
});

module.exports = router;
