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
    console.log("Connection has been established successfully.");
  })
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = {sequelize};