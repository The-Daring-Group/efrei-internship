const {router} = require('../initializer/initRouter.js');
const {sequelize, QueryTypes} = require('../initializer/initSequelize.js');


router.post("/create-internship", async (req, res) => {
  const { id_student, title, company, description, startDate, endDate, email_academic_tutor, email_company_tutor } = req.body
  try {
        const id_academic_tutor = await sequelize.query(
            `SELECT id FROM academic_tutor WHERE email = :email_academic_tutor`,
            {
                replacements: {email_academic_tutor},
                type: QueryTypes.SELECT,
            }
        );
        const id_company_tutor = await sequelize.query(
            `SELECT id FROM company_tutor WHERE email = :email_company_tutor`,
            {
                replacements: {email_company_tutor},
                type: QueryTypes.SELECT,
            }
        );

        if(id_academic_tutor.length === 0 || id_company_tutor.length === 0) {
            res.status(500).json({ message: "Academic tutor or company tutor not found" });
            return;
        }
      await sequelize.query(
          `INSERT INTO internship (title, start_date, end_date, description, company_name, id_student, id_academic_tutor, id_company_tutor) 
          VALUES (?, TO_DATE(?, 'YYYY-MM-DD'), TO_DATE(?, 'YYYY-MM-DD'), ?, ?, ?, ?, ?)`,
              {
                replacements: [title, startDate, endDate, description, company, id_student, id_academic_tutor[0].id, id_company_tutor[0].id],
                type: QueryTypes.INSERT,
              }
      );
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
    res.status(200).json({ message: "Internship created" });
});

router.get("/get-internship/:id_internship", async (req, res) => {
   const { id_internship } = req.params
    try {
        const internship = await sequelize.query(
        `SELECT * FROM internship WHERE id = :id_internship`,
            {
                replacements: {id_internship},
                type: QueryTypes.SELECT,
            }
        );
        if(internship.length === 0) {
            res.status(404).json({ message: "No internship found" });
            return;
        }
        res.status(200).json({ internship: internship[0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/get-internship-student/:id_student", async (req, res) => {
    const { id_student } = req.params
    try {
        const internship = await sequelize.query(
        `SELECT * FROM internship WHERE id_student = :id_student`,
            {
                replacements: {id_student},
                type: QueryTypes.SELECT,
            }
        );
        if(internship.length === 0) {
            res.status(404).json({ message: "No internship found for the user" });
            return;
        }
        res.status(200).json({ internship: internship });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/get-internship-academic/:id_academic_tutor", async (req, res) => {
    const { id_academic_tutor } = req.params
    try {
        const internship = await sequelize.query(
        `SELECT * FROM internship WHERE id_academic_tutor = :id_academic_tutor`,
            {
                replacements: {id_academic_tutor},
                type: QueryTypes.SELECT,
            }
        );
        if(internship.length === 0) {
            res.status(404).json({ message: "No internship found for the academic tutor" });
            return;
        }
        res.status(200).json({ internship: internship });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/get-internship-company/:id_company_tutor", async (req, res) => {
  const { id_company_tutor } = req.params
    try {
        const internship = await sequelize.query(
        `SELECT * FROM internship WHERE id_company_tutor = :id_company_tutor`,
            {
                replacements: {id_company_tutor},
                type: QueryTypes.SELECT,
            }
        );
        if(internship.length === 0) {
            res.status(404).json({ message: "No internship found for the company tutor" });
            return;
        }
        res.status(200).json({ internship: internship });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;