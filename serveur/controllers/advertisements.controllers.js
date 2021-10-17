const Advertisements = require("../models/advertisements.model");
const Applied = require("../models/applied.model");

//selectionner tout les annonces de la bdd
exports.findAll = (req, res) => {
  console.log("hgghg");
  Advertisements.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers.",
      });
    else res.send(data);
  });
};

//supprimer tout les annonces de la bdd
exports.deleteAll = (req, res) => {
  Advertisements.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all advertisements.",
      });
    else res.send({ message: `All advertisements were deleted successfully!` });
  });
};

//créer un advertisements et le sauvegarder
exports.create = (req, res) => {
  // Validate request
  console.log(req);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Advertisements
  const advertisements = new Advertisements({
    title: req.body.title,
    short_description: req.body.short_description,
    date: req.body.date,
    contrat_type: req.body.contrat_type,
    description: req.body.description,
    compagnie_id: req.body.compagnie_id,
  });

  // Save advertisements in the database
  Advertisements.create(advertisements, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the Advertisements.",
      });
    else res.send({ message: "Successfully registered" });
  });
};
// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  Advertisements.findById(req.params.advertisementsId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.advertisementsId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Customer with id " + req.params.advertisementsId,
        });
      }
    } else res.send(data);
  });
};

// Find a single Customer with a customer title
exports.findOneTitle = async (req, res) => {
  Advertisements.findByTitle(
    {
      title: req.body.title,
    },
    async (err, data) => {
      if (err) {
        if (!data || !data.length) {
          res.status(404).send({
            message: `Not found Customer with title ${req.body.title}`,
          });
        } else {
          res.send(200)({
            message: `success with title `,
            data,
          });
        }
      } else res.send(data);
    }
  );
};

exports.findOneCompagny = async (req, res) => {
  Advertisements.findByCID(
    {
      compagnie_id: req.body.decoded.id,
    },
    async (err, data) => {
      if (err) {
        if (!data || !data.length) {
          res.status(404).send({
            message: `Not found annonces`,
          });
        } else {
          res.send(200)({
            message: `success with this `,
            data,
          });
        }
      } else res.send(data);
    }
  );
};

// Update a Customer identified by the customerId in the request
exports.update = async (req, res) => {
  console.log(req.body);
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Advertisements.updateById(
    req.params.advertisementsId,
    req.body,
    (err, data) => {
      console.log(req.body);
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer3 with id ${req.body.advertisementsId}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error updating Customer with id " + req.body.advertisementsId,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const advertisementsId = req.body.id;
  console.log("lalalal" + advertisementsId);
  Applied.removead(advertisementsId, (err, res) => {
    if (res) {
      Advertisements.remove(advertisementsId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${advertisementsId}.`,
            });
          } else {
            res.status(500).send({
              message:
                "Could not delete Customer with id " +
                req.params.advertisementsId,
            });
          }
        }
      });
    } else {
      console.log(err);
    }
  });
};
