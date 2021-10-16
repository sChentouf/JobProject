module.exports = (app) => {
  const buisness = require("../controllers/buisness.controllers");

  console.log("ssdsdsd");

  //les selectionner tous
  app.get("/buisness", (req, res) => buisness.findAll(req, res));
  // les supprimer tous
  app.delete("/buisness", (req, res) => buisness.deleteAll(req, res));
  //Créer registration
  app.post("/register_buis/", (req, res) => buisness.create(req, res));
  //login
  app.post("/buisness/login/", (req, res) => buisness.loginB(req, res));
  //Select un candidat par l'id
  app.get("/buisness/:buisnessId", (req, res) => buisness.findOne(req, res));

  //modifier un candidat par l'id
 app.post("/buisness/:buisnessId", (req, res) => buisness.update(req, res));

  // Modifier un candidat with candidatId
  //app.post("/buisness/:buisnessId", (req, res) => buisness.update(req, res));

  // Supprimer un candidat parId
  app.delete("/buisness/:buisnessId", (req, res) => buisness.delete(req, res));
};
