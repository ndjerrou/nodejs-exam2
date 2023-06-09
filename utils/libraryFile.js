import { writeFileSync, readFileSync } from "fs";

// function fetchProducts() {
//   axios('https://fakestoreapi.com/products').then(({ data }) => {
//     try {
//       writeFileSync(productsPath, JSON.stringify(data));
//     } catch (err) {
//       console.error('Error writing file : ', err.message);
//     }
//   });
// }

export const writeData = (path, content) => {
  try {
    writeFileSync(path, JSON.stringify(content));
  } catch (err) {
    console.error("Error writing file : ", err.message);
  }
};

export const readData = (path) => {
  try {
    const books = readFileSync(path, "utf-8");

    return JSON.parse(books);
  } catch (err) {
    console.error("Error reading file : ", err.message);
  }
};
