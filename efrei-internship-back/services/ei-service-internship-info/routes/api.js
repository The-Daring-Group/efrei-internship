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

router.post("/create-internship", async (req, res) => {
  const { id_student, title, company, description, startDate, endDate, id_academic_tutor, id_company_tutor } = req.body
  try {
      await sequelize.query(
          `INSERT INTO internship (title, startDate, endDate, description, company_name, id_student, id_academic_tutor, id_company_tutor) 
          VALUES ('${title}', '${startDate}', '${endDate}', '${description}', '${company}', ${id_student}, ${id_academic_tutor}, '${id_company_tutor}')`
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

router.get("/get-internship-academic/:id_academic_tutor", async (req, res) => {
  const { id_academic_tutor } = req.params
    try {
        const internship = await sequelize.query(
            `SELECT * FROM internship INNER JOIN student ON internship.id_student = student.id WHERE id_academic_tutor = ${id_academic_tutor}`
        );
        if(internship[0].length === 0) {
            res.status(404).json({ message: "No internship found for the academic tutor" });
            return;
        }
        res.status(200).json({ internship: internship[0] }); // Return all internships linked to the selected academic tutor
    } catch (error) {
        console.error(error);
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

router.get("/get-internship/:id_internship", async (req, res) => {
    const {id_internship} = req.params;
    try {
        const internship = await sequelize.query(
            `SELECT * FROM internship WHERE id_internship = ${id_internship}`
        );
        if(internship[0].length === 0) {
            res.status(404).json({ message: "No internship found for the asked ID" });
            return;
        }

        res.status(200).json({ internship: internship[0] });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;