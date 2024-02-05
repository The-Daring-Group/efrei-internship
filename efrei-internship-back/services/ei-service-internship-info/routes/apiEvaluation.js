const { router } = require('../initializer/initRouter.js');
const { sequelize, QueryTypes } = require('../initializer/initSequelize.js');

router.post("/evaluate", async (req, res) => {
    const { id_student, id_academic_tutor, id_company_tutor, type_document, grade, commentary } = req.body
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
    const { id_student } = req.params
    try {
        const result = await sequelize.query(
            `SELECT * FROM evaluation WHERE id_student = :id_student`,
            {
                replacements: { id_student },
                type: QueryTypes.SELECT,
            }
        );
        if (result.length === 0) {
            res.status(404).json({ message: "No evaluation found for the user" });
            return;
        }

        res.status(200).json({ evaluations: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/auto-evaluation/:id_user/:id_internship/:eval_n", async (req, res) => {
    const { id_user, id_internship, eval_n } = req.params
    const doc_name = 'autoEvaluation' + eval_n;
    try {
        const result = await sequelize.query(
            `SELECT * FROM auto_evaluation WHERE id_student = :id_user AND id_internship = :id_internship AND name = :doc_name`,
            {
                replacements: { id_user, id_internship, doc_name },
                type: QueryTypes.SELECT,
            }
        );
        if (result.length === 0) {
            res.status(404).json({ message: "No auto evaluation found for the user" });
            return;
        }

        res.status(200).json(result[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/auto-evaluation", async (req, res) => {
    const { name, userId, internshipId,
        input1, input2, input3, input4, input5, input6,
        radio1, radio1Example, radio2, radio2Example, radio3, radio3Example,
        radio4, radio4Example, radio5, radio5Example, radio6, radio6Example,
        contactMe, contactWay } = req.body;

    const input6_formatted = input6 || "";

    const internshipResult = await sequelize.query(
        `SELECT * FROM internship WHERE id = :internshipId`,
        {
            replacements: { internshipId },
            type: QueryTypes.SELECT,
        }
    );

    await sequelize.query(
        `INSERT INTO auto_evaluation (name, type, id_student, id_internship, id_academic_tutor, id_company_tutor, validated_by_school,
            input1, input2, input3, input4, input5, input6,
            radio1, radio1_example, radio2, radio2_example, radio3, radio3_example,
            radio4, radio4_example, radio5, radio5_example, radio6, radio6_example,
            contact_tutor, contact_way) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        {
            replacements: [name, "autoEvaluation", userId, internshipId, internshipResult[0].id_academic_tutor, internshipResult[0].id_company_tutor, false,
                input1, input2, input3, input4, input5, input6_formatted,
                radio1, radio1Example, radio2, radio2Example, radio3, radio3Example,
                radio4, radio4Example, radio5, radio5Example, radio6, radio6Example,
                contactMe, contactWay],
            type: QueryTypes.INSERT,
        }).then(() => {
            res.status(200).json({ message: "Auto evaluation created" });
        }).catch((error) => {
            res.status(500).json({ message: error.message });
        });
});

module.exports = router;