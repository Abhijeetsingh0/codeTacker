const MinIO = require('minio');
const path = require('path');
const dotenv = require("dotenv");

dotenv.config();
console.log("MinIO Credentials", process.env.MINIO_ACCESS_KEY, process.env.MINIO_SECRET_KEY);

const minioClient = new MinIO.Client({
    endPoint: '0.0.0.0',
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY
});

const uploadToMinIO = (filePath, fileName, email) => {
    // console.log("Uploading file:", fileName, filePath);
    return new Promise((resolve, reject) => {
        minioClient.fPutObject('images', fileName, filePath, { "Content-Type": 'application/octet-stream' }, (err, etag) => {
            if (err) {
                return reject(err);
            }
            resolve(`http://0.0.0.0:9000/images/${fileName}`);
        });
    });
};

module.exports = { uploadToMinIO };
