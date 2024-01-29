const express = require("express");
const router = express.Router();

const { sequelize, QueryTypes } = require('../initializer/initSequelize.js');
const { bcrypt, salt } = require('../initializer/initBcrypt.js');

router.post("/login", async (req, res) => {
  const { efreiId, password } = req.body;
  const user = await sequelize.query(
    `SELECT * FROM "student" WHERE id_efrei='${efreiId}'`,
    { type: QueryTypes.SELECT }
  );
  if (user.length === 0) {
    res.status(401).json({ error: "User not found" });
  } else {
    console.log(bcrypt.hashSync(password, salt)); //TODO: remove this line when we have enough users
    const match = await bcrypt.compare(password, user[0].password);
    if (match) {
      req.session.user = user[0].id_efrei;
      res.json({ id: user[0].id, firstname: user[0].firstname, lastname: user[0].lastname, email: user[0].email });
    } else {
      res.status(401).json({ error: "Wrong password" });
    }
  }
});

router.post("/logout", async (req, res) => {
  req.session.destroy();
  res.status(200).json({ connected: false });
});

module.exports = router;