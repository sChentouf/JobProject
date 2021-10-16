const cors = require("cors");

module.exports = (app) => {
  const advertisements = require("../controllers/advertisements.controllers");

  console.log("ssdsdsd");

  //les selectionner tous
  app.get("/advertisements", cors(), (req, res) =>
    advertisements.findAll(req, res)
  );
  // les supprimer tous
  app.delete("/advertisements", (req, res) =>
    advertisements.deleteAll(req, res)
  );
  //Créer registration
  app.post("/advertisements", (req, res) => advertisements.create(req, res));

  //Select un advertisment par title
  app.get("/advertisement", (req, res) =>
    advertisements.findOneTitle(req, res)
  );

  //Select un advertisment par title
  app.get("/advertisement", (req, res) =>
    advertisements.findOneTitle(req, res)
  );

  //Select un advertisment par title
  app.get("/advertisement", (req, res) =>
    advertisements.findOneTitle(req, res)
  );

  // Modifier un candidat with candidatId
  app.post("/advertisements/:advertisementsId", (req, res) =>
    advertisements.update(req, res)
  );
  //Select un candidat par l'id
  app.get("/advertisements/:advertisementsId", (req, res) =>
    advertisements.findOne(req, res)
  );
  // Supprimer un candidat parId
  app.delete("/advertisements/:advertisementsId", (req, res) =>
    advertisements.delete(req, res)
  );
};
