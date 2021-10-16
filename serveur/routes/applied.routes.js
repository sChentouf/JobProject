module.exports = (app) => {
  const applied = require("../controllers/applied.controllers");

  //les selectionner tous
  app.get("/applied", (req, res) => applied.findAll(req, res));

  // les supprimer tous
  app.delete("/applied", (req, res) => applied.deleteAll(req, res));
  //Créer candiature

  app.post("/applied", (req, res) => applied.createA(req, res));

  //Select une candidature par l'id
  app.get("/applied/:appliedId", (req, res) => applied.findOne(req, res));

  // Supprimer une candidature parId
  app.delete("/applied/:appliedId", (req, res) => applied.delete(req, res));
};
