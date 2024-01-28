const {router} = require('../initializer/initRouter.js');
const {sequelize} = require('../initializer/initSequelize.js');

router.post("/login", async (req, res) => {
    const { efreiId, password } = req.body;
    const user = await sequelize.query(
        `SELECT * FROM "student" WHERE id_efrei='${efreiId}'`,
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