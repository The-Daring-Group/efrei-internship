const { router } = require('../initializer/initRouter.js');
const { sequelize, QueryTypes } = require('../initializer/initSequelize.js');

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await sequelize.query(
    `SELECT * FROM "academic_tutor" WHERE email='${email}'`,
    { type: QueryTypes.SELECT }
  );
  if (user.length === 0) {
    res.status(401).json({ error: "User not found" });
  } else {
    console.log(bcrypt.hashSync(password, 10)); //TODO: remove this line when we have enough users
    const match = await bcrypt.compare(password, user[0].password);
    if (match) {
      req.session.user = user[0].email;
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