import fs from "fs"
import { fileURLToPath } from 'url';
import path from "path"

//import { dirname } from 'path';
const __filename    = fileURLToPath(import.meta.url);
const __dirname     = path.dirname(__filename);
const libraryPath   = path.join(__dirname,  'data', 'library.json');
const nextIdPath    = path.join(__dirname,  'data', 'nextID.json');

export function initData(){
    try {
        const books = fs.readFileSync(libraryPath, 'utf-8');
        console.log("data exist")
      } catch (err) {
        console.log("data do not exist")
        writeBooks({})
        writeNextId(0)
      }
}
// ------------------- read write data & nextId ----------------------

function writeData(data, aPath){
    try {
        fs.writeFileSync(aPath, JSON.stringify(data));
    } catch (err) {
        console.error('Error writing file : ', err.message);
    }
}
function readData(aPath) {
    try {
      const data = fs.readFileSync(aPath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Error reading file : ', err.message);
      return []
    }
}
//------------------
export function writeBooks(books){ writeData(books, libraryPath)}
export function readBooks(){
    const getdata = readData(libraryPath)
    return getdata
}
//------------------
function writeNextId(nextId){ writeData(nextId, nextIdPath)}
export function readNextId(){
    const getdata = readData(nextIdPath)
    return getdata
}
export function updateNextId(){
    let getNextId = readNextId()
    writeNextId(getNextId + 1)
}