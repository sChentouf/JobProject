const Buisness = require("../models/buisness.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//selectionner tout les candidats de la bdd
exports.findAll = (req, res) => {
  console.log("hgghg");
  Buisness.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers.",
      });
    else res.send(data);
  });
};

//supprimer tout les candidats de la bdd
exports.deleteAll = (req, res) => {
  Buisness.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all buisness.",
      });
    else res.send({ message: `All buisness were deleted successfully!` });
  });
};

//créer un buisness et le sauvegarder
exports.create = async (req, res) => {
  // Validate request
  console.log(req);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  console.log(req.body.password);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  console.log(hashedPassword);
  // Create a Buisness
  const buisness = new Buisness({
    name: req.body.name,
    activities: req.body.activities,
    contact_name: req.body.contact_name,
    number_employes: req.body.number_employes,
    adress: req.body.adress,
    postal_code: req.body.postal_code,
    city: req.body.city,
    email: req.body.email,
    phone: req.body.phone,
    siret: req.body.siret,
    password: hashedPassword,
  });

  console.log(buisness);

  // Save buisness in the database
  Buisness.create(buisness, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Buisness.",
      });
    else res.send({ message: "Successfully registered" });
    const token = jwt.sign({ id: firstBuisness.id }, "secret");
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
  });
};
// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  Buisness.findById(req.params.buisnessId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer2 with id ${req.params.buisnessId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.buisnessId,
        });
      }
    } else res.send(data);
  });
};

//Update a Customer identified by the customerId in the request
exports.update = async (req, res) => {
  console.log(req.body);
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Buisness.updateById(req.params.buisnessId, req.body, (err, data) => {
    console.log(req.body);
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer3 with id ${req.body.buisnessId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Customer with id " + req.body.buisnessId,
        });
      }
    } else res.send(data);
  });
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Buisness.remove(req.params.buisnessId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer1 with id ${req.params.buisnessId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.buisnessId,
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};

exports.loginB = async (req, res) => {
  Buisness.loginB(
    {
      email: req.body.email,
    },
    async (err, data) => {
      //console.log(data);
      if (!data || !data.length) {
        return res.status(400).send({
          message: "user not found",
        });
      }
      const firstBuisness = data[0];
      //console.log(firstBuisness);
      //console.log(firstBuisness.password);
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        firstBuisness.password
      );

      console.log(isPasswordCorrect);
      if (!isPasswordCorrect) {
        return res.status(400).send({
          message: "invalid credentials",
        });
      }
      const token = jwt.sign({ id: firstBuisness.id }, "secret");
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
      res.send({
        message: "success",
        token,
      });
    }
  );
};
