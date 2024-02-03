const {router} = require('../initializer/initRouter.js');
const {sequelize, QueryTypes} = require('../initializer/initSequelize.js');

router.post("/evaluate", async (req, res) => {
    console.log(req.body) // body undefined ???
    const {id_student, id_academic_tutor, id_company_tutor, type_document, grade, commentary} = req.body
    
    try {
        await sequelize.query(
            `INSERT INTO evaluation (type_document, grade, commentary, id_student, id_academic_tutor, id_company_tutor) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            {
                replacements: [type_document, grade, commentary, id_student, id_academic_tutor, id_company_tutor],
                type: QueryTypes.INSERT,
            }
        );
        res.status(200).json({ message: "Evaluation created" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/get-evaluation-student/:id_student", async (req, res) => {
    const {id_student} = req.params
    try {
        const result = await sequelize.query(
            `SELECT * FROM evaluation WHERE id_student = :id_student`,
            {
                replacements: {id_student},
                type: QueryTypes.SELECT,
            }
        );
        if (result.length === 0) {
            res.status(404).json({message: "No evaluation found for the user"});
            return;
        }

        res.status(200).json({evaluations: result});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;