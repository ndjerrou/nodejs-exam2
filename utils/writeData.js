const fs = require("fs/promises");

const writeData = async (book) => {
  try {
    const data = await fs.readFile("library.json", "utf8");
    const obj = JSON.parse(data);
    obj.push(book);
    const json = JSON.stringify(obj);
    await fs.writeFile("library.json", json, "utf8");
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
module.exports = { writeData };
