const express = require('express');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const firebaseConfig = require('../utils/firebaseConfig');

const router = express.Router();

//Initialize a firebase application
initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

//TODO: use a more complex identifier for the file name
async function uploadFile(req) {

        const storageRef = ref(storage, req.body.name  + '_' + req.file.originalname);

        // Create file metadata including the content type
        const metadata = {
            contentType: req.file.mimetype,
        };

        // Upload the file in the bucket storage
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer , metadata);
        //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

        // Grab the public url
        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log('File successfully uploaded.');
};


module.exports = {
    uploadFile,
};