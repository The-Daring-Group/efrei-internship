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

module.exports = {
  uploadFile,
};
