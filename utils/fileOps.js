const fs = require('fs');

const DB_PATH = './db.json';

const readFile = (callback, returnJson = false, filePath = DB_PATH, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
            throw err;
        }

        callback(returnJson ? JSON.parse(data) : data);
    });
};

const writeFile = (fileData, callback, filePath = DB_PATH, encoding = 'utf8') => {
    fs.writeFile(filePath, fileData, encoding, (err) => {
        if (err) {
            throw err;
        }

        callback();
    });
};

module.exports = {
    readFile,
    writeFile
};