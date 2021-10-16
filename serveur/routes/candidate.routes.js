module.exports = (app) => {
  const candidate = require("../controllers/candidates.controllers");

  //les selectionner tous
  app.get("/candidate", (req, res) => candidate.findAll(req, res));
  // les supprimer tous
  app.delete("/candidate", (req, res) => candidate.deleteAll(req, res));
  //Créer registration
  app.post("/register", (req, res) => candidate.create(req, res));
  //login 
  app.post("/login", (req, res) => candidate.login(req, res));

  //Select un candidat par l'id
  app.get("/candidate/:candidateId", (req, res) => candidate.findOne(req, res));

  // Modifier un candidat with candidatId
  app.post("/candidate/:candidateId", (req, res) => candidate.update(req, res));

  // Supprimer un candidat parId
  app.delete("/candidate/:candidateId", (req, res) => candidate.delete(req, res) );
};