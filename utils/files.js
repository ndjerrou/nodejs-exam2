const fs = require('fs');
const path = require('path');

const libraryPath = path.join(__dirname, '..', 'data', 'library.json');

function writeData(content) {
    try {
        fs.writeFileSync(libraryPath, JSON.stringify(content));
    } catch (err) {
        console.error('Error writing file : ', err.message);
    }
}

function readData() {
    try {
        const library = fs.readFileSync(libraryPath, 'utf-8');

        return JSON.parse(library); // string ==> Tableau JS
    } catch (err) {
        console.error('Error reading file : ', err.message);
    }
}

exports.writeData = writeData; //exports = module.exports
exports.readData = readData;
