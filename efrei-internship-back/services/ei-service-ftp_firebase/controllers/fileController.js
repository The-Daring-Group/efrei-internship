// fileController.js
const fileService = require('../services/service');

const uploadFile = async (req, res) => {
  try {
    const fileUrl = await fileService.uploadFile(req);
    res.status(200).json({ success: true, fileUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};


const getStudentFiles = async (req, res) => {
  try {
    const documents = await fileService.getStudentFiles(req);
    res.json(documents);
  } catch (error) {
    console.error(error);
  }
};

const getAcademicTutorFiles = async (req, res) => {
  try {
    const documents = await fileService.getAcademicTutorFiles(req);
    res.json(documents);
  } catch (error) {
    console.error(error);
  }
};

const AcademicValidateFile = async (req, res) => {
  try {
    const documents = await fileService.AcademicValidateFile(req);
    res.json(documents);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  uploadFile,
  getStudentFiles,
  getAcademicTutorFiles,
  AcademicValidateFile,
};
