import fs from 'fs';
import path from 'path';
import {
  fileURLToPath
} from 'url';

const __filename = fileURLToPath(
  import.meta.url);

const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '..', 'data', 'library.json');

export function readData() {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');

    return JSON.parse(data);
  } catch (err) {
    return err.message;
  }
}

export function writeData(content) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(content));
  } catch (err) {
    return err.message;
  }
}