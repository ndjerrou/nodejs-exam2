const fs = require("fs/promises");

const updateData = async (updatedBook) => {
  try {
    const data = await fs.readFile("library.json", "utf8");
    const library = JSON.parse(data);

    const updatedLibrary = library.map((book) => {
      if (book.id === updatedBook.id) {
        return { ...book, ...updatedBook };
      }
      return book;
    });

    await fs.writeFile("library.json", JSON.stringify(updatedLibrary), "utf8");
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
module.exports = { updateData };
