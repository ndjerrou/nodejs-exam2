const fs = require("fs/promises");

const writeData = async (dataName, content) => {
  try {
    await fs.writeFile(dataName, JSON.stringify(content), "utf8");
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
module.exports = { writeData };
