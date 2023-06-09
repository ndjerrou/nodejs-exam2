const fs = require("fs/promises");

const deleteData = async (bookId) => {
  try {
    const data = await fs.readFile("library.json", "utf8");
    const library = JSON.parse(data);
    const updatedLibrary = library.filter((book) => book.id !== bookId);
    await fs.writeFile("library.json", JSON.stringify(updatedLibrary), "utf8");
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

module.exports = { deleteData };
