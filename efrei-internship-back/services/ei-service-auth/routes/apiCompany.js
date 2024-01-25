const express = require("express");
const router = express.Router();

const data_db = require('../.data_db');

const { Sequelize } = require("sequelize");
const bcrypt = require("bcryptjs");

const sequelize = new Sequelize(
  "db_efrei_internship",
  data_db.Username,
  data_db.Password,
  {
    dialect: "postgres",
    host: data_db.Host,
    port: data_db.Port,
    schema: "efrei_internship"
  }
);

try {
  sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.");
  })
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await sequelize.query(
    `SELECT * FROM "academic_tutor" WHERE email='${email}'`,
    { type: Sequelize.QueryTypes.SELECT }
  );
  if (user.length === 0) {
    res.status(401).json({ error: "User not found" });
  } else {
    console.log(bcrypt.hashSync(password, 10)); //TODO: remove this line when we have enough users
    const match = await bcrypt.compare(password, user[0].password);
    if (match) {
      req.session.user = user[0].id_efrei;
      res.json({ email: user[0].email });
    } else {
      res.status(401).json({ error: "Wrong password" });
    }
  }
});

module.exports = router;