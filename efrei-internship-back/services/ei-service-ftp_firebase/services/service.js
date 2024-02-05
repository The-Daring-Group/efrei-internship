const express = require('express');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const firebaseConfig = require('../utils/firebaseConfig');
const {sequelize, QueryTypes} = require('../utils/initSequelize.js');

const router = express.Router();

//Initialize a firebase application
initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

//TODO: use a more complex identifier for the file name
async function uploadFile(req) {

    const { id_student, id_academic_tutor, id_company_tutor, type, name } = req.body;

    const storageRef = ref(storage, name  + '_' + req.file.originalname);

    // Create file metadata including the content type
    const metadata = {
        contentType: req.file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer , metadata);
    //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);

    SaveDocURL(downloadURL, id_student, id_academic_tutor, id_company_tutor, type, name);

    console.log('File successfully uploaded.');
};

async function SaveDocURL(url, id_student, type, name) {
    try {
        const id_academic_tutor = await sequelize.query(
            `SELECT id_academic_tutor FROM internship WHERE id_student = :id_student`,
            {
                replacements: {id_student},
                type: QueryTypes.SELECT,
            });

        const id_company_tutor = await sequelize.query(
            `SELECT id_company_tutor FROM internship WHERE id_student = :id_student`,
            {
                replacements: {id_student},
                type: QueryTypes.SELECT,
            });


        await sequelize.query(
            `INSERT INTO document (url, validated_by_company, validated_by_school, id_student, id_academic_tutor, id_company_tutor, type, name) VALUES (?, FALSE, FALSE, ?, ?, ?, ?, ?)`,
            {
                replacements: [url, id_student, id_academic_tutor, id_company_tutor, type, name],
                type: QueryTypes.INSERT,
            }
        );
    } catch (error) {
        console.error(error);
    }
    
}

async function GetFileURL(req) {
    
    return downloadURL;
}


module.exports = {
    uploadFile,
};