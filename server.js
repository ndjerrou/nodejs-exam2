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
  //ajouter condition !== id déjà présents dans library.json
  //prendre tous les id de library.json pour vérification
  let fileId = [];
  data.map((ele) => (fileId = [...fileId, ele.id]));
  // console.log(fileId);

  const { body } = req;
  ///vérification
  if (!fileId.includes(body.id)) data = [...data, body];
  else res.send(`L'id ${body.id} est déjà présent dans la bibliothèque`);

  //si vérification réussie, insertion de la nouvelle data dans library.json
  try {
    fs.writeFileSync("library.json", JSON.stringify(data), "utf8");
    console.log("nouveau livre ajouté à la bibliothèque");
  } catch (error) {
    console.log("erreur lors de l'ajout ", error);
  }
  res.send("Succès de l'ajout du nouveau livre: " + JSON.stringify(body));
});

//delete
app.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  let dataAfterDelete = [];
  let fileId = [];
  data.map((ele) => (fileId = [...fileId, ele.id]));
  console.log(fileId);

  if (fileId.includes(parseInt(id))) {
    dataAfterDelete = data.filter((ele) => ele.id !== parseInt(id));
    console.log("après opération", dataAfterDelete);
    try {
      fs.writeFileSync("library.json", JSON.stringify(dataAfterDelete), "utf8");
      console.log(`Le livre possédant l'id ${id} a été supprimé`);
    } catch (error) {
      console.log("erreur lors de la suppression ", error);
    }
  } else {
    res.send(
      "Veuillez choisir un ID enregistré dans la bibliothèque pour supprimer un livre"
    );
  }

  res.send("Livre effacé");
});

//put
app.put("/books/:id", (req, res) => {
  res.send("livre mis à jour");
});

app.listen(3000, () => console.log("Server is running"));
