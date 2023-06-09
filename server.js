const express = require("express");
const app = express();
app.use(express.json());

const fs = require("fs");

//data from library.json
let data = JSON.parse(fs.readFileSync("library.json", (encoding = "utf8")));
console.log(data);

//get
app.get("/books", (req, res) => {
  res.send(data);
});
app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const bookId = data.filter((ele) => ele.id === id);
  res.send(bookId);
});

//post
app.post("/books", (req, res) => {
  const { body } = req;
  data = [...data, body];
  console.log(data);
  try {
    fs.writeFileSync("library.json", JSON.stringify(data), "utf8");
    console.log("nouveau livre ajouté à la bibliothèque");
  } catch (error) {
    console.log("erreur lors de l'ajout ", error);
  }
  res.send("Succès de l'ajout du nouveau livre: " + JSON.stringify(body));
});

app.listen(3000, () => console.log("Server is running"));
