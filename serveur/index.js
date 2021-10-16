//création serveur express pour construire les API
const express = require("express");

//permet de scinder la requete et cree un objet req.body qui navigue sur les route et un res qui contient les infos
const bodyParser = require("body-parser");

//fichier.env
require("dotenv").config();

//fournit un middleware express pour activer cors
const cors = require("cors");
require("./models/db");
const app = express();
const PORT = process.env.PORT || 8083;

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//parse les requetes de type json
app.use(express.json());

//parse les requetes de type form-urlencoded
app.use(express.urlencoded({ extended: true }));

require("./routes/candidate.routes")(app);
require("./routes/buisness.routes")(app);
require("./routes/advertisements.routes")(app);
require("./routes/applied.routes")(app);

//tests
//app.get("/", (req, res) => {
// res.json({ message: "Welcome to bezkoder application." });
//});
const validate = require("validator");

//le serveur ecoute ce port
app.listen(PORT, () => {
  console.log(`Le serveur est lancé ${PORT}`);
});
