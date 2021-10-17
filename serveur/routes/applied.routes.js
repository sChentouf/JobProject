const cors = require("cors");

module.exports = (app) => {
  const applied = require("../controllers/applied.controllers");

  // //les selectionner tous
  // app.get("/applied", (req, res) => applied.findAll(req, res));

  // les supprimer tous
  app.delete("/applied", (req, res) => applied.deleteAll(req, res));

  //Créer candiature non user
  app.post("/applied", (req, res) => applied.createA(req, res));

  //Créer candiature user
  app.post("/applieduser", (req, res) => applied.createAU(req, res));

  // //Select une candidature par l'id
  // app.get("/applied/:appliedId", (req, res) => applied.findOne(req, res));

  //Selectionner par id compagnie
  app.get("/applied/:candidateId", cors(), (req, res) =>
    applied.findOneCandidate(req, res)
  );

  //modifier un candidat par l'id
  app.post("/applied/:appliedId", (req, res) => applied.update(req, res));

  // Supprimer une candidature parId
  app.delete("/applied/:appliedId", (req, res) => applied.delete(req, res));
};
