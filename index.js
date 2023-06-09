const express = require("express")
const app = express()
require('dotenv').config();
const PORT = process.env.PORT

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// j'ai créé ce middleWare afin de log les détails des requêtes 
app.use((req, res, next) => {
    const log = `[${new Date().toISOString()}] ${res.statusCode} ${req.method} ${req.originalUrl} from ${req.hostname}.`
    console.log(log);
    //fin du taff
    next();
  });


  
//import de mon fichier de routes
const endpoints=require("./routes/endpoints")
endpoints(app)

app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
module.exports = app;