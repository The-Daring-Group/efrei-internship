// src/routes/fileRoutes.js
const express = require('express');
const fileController = require('../controllers/fileController');
// const filecontrService = require('../services/service');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

module.exports = function(app) {
    app.post("/upload_files", upload.single("file"), fileController.uploadFile);
    app.post("/get_student_files", fileController.getStudentFiles);
    app.post("/get_academic_tutor_files", fileController.getAcademicTutorFiles);
    app.post("/validate_file", fileController.AcademicValidateFile);
};

