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
    console.log("Connection has been established successfully.");
  })
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

router.post("/create-internship", async (req, res) => {
  const { id_student, title, company, description, startDate, endDate, email_academic_tutor, email_company_tutor } = req.body
    console.log(id_student, title, company, description, startDate, endDate, email_academic_tutor, email_company_tutor)
  try {
        const id_academic_tutor = await sequelize.query(
            `SELECT id FROM academic_tutor WHERE email = '${email_academic_tutor}'`
        );
        const id_company_tutor = await sequelize.query(
            `SELECT id FROM company_tutor WHERE email = '${email_company_tutor}'`
        );

        if(id_academic_tutor[0].length === 0 || id_company_tutor[0].length === 0) {
            res.status(500).json({ message: "Academic tutor or company tutor not found" });
            return;
        }
      await sequelize.query(
          `INSERT INTO internship (title, start_date, end_date, description, company_name, id_student, id_academic_tutor, id_company_tutor) 
          VALUES ('${title}', TO_DATE('${startDate}', 'YYYY-MM-DD'), TO_DATE('${endDate}', 'YYYY-MM-DD'), '${description}', '${company}', ${id_student}, ${id_academic_tutor[0][0].id}, '${id_company_tutor[0][0].id}')`
      );
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
    res.status(200).json({ message: "Internship created" });
});

router.get("/get-internship-student/:id_student", async (req, res) => {
    const { id_student } = req.params
    try {
        const internship = await sequelize.query(
        `SELECT * FROM internship WHERE id_student = ${id_student}`
        );
        if(internship[0].length === 0) {
            res.status(404).json({ message: "No internship found for the user" });
            return;
        }
        res.status(200).json({ internship: internship[0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("get-internship-academic/:id_academic_tutor", async (req, res) => {
  const { id_academic_tutor } = req.params
    try {
        const internship = await sequelize.query(
        `SELECT * FROM internship WHERE id_academic_tutor = ${id_academic_tutor}`
        );
        if(internship[0].length === 0) {
            res.status(404).json({ message: "No internship found for the academic tutor" });
            return;
        }
        res.status(200).json({ internship: internship[0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("get-internship-company/:id_company_tutor", async (req, res) => {
  const { id_company_tutor } = req.params
    try {
        const internship = await sequelize.query(
        `SELECT * FROM internship WHERE id_company_tutor = ${id_company_tutor}`
        );
        if(internship[0].length === 0) {
            res.status(404).json({ message: "No internship found for the company tutor" });
            return;
        }
        res.status(200).json({ internship: internship[0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;