const Candidate = require("../models/candidate.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//selectionner tout les candidats de la bdd
exports.findAll = (req, res) => {
  console.log("hgghg");
  Candidate.getAll((err, data) => {
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
  Candidate.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all candidate.",
      });
    else res.send({ message: `All candidate were deleted successfully!` });
  });
};

//créer un candidate et le sauvegarder
exports.create = async (req, res) => {
  // Validate request
  console.log(req);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  // Create a Candidate
  const candidate = new Candidate({
    name: req.body.name,
    first_name: req.body.first_name,
    email: req.body.email,
    phone: req.body.phone,
    adress: req.body.adress,
    postal_code: req.body.postal_code,
    city: req.body.city,
    birth_date: req.body.birth_date,
    //cv: req.body.cv,
    //picture: req.body.picture,
    gender: req.body.gender,
    password: hashedPassword,
  });

  // Save candidate in the database
  Candidate.create(candidate, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Candidate.",
      });
    else res.send({ message: "Successfully registered" });
  });
};
// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  Candidate.findById(req.params.candidateId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.candidateId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Customer with id " + req.params.candidateId,
        });
      }
    } else res.send(data);
  });
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

  Candidate.updateById(req.params.candidateId, req.body, (err, data) => {
    console.log(req.body);
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.body.candidateId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Customer with id " + req.body.candidateId,
        });
      }
    } else res.send(data);
  });
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Candidate.remove(req.params.candidateId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.candidateId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete Customer with id " + req.params.candidateId,
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};

exports.login = async (req, res) => {
  Candidate.login(
    {
      email: req.body.email,
    },
    async (err, data) => {
      console.log(data);
      if (!data || !data.length) {
        return res.status(400).send({
          message: "user not found",
        });
      }
      const firstCandidate = data[0];
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        firstCandidate.password
      );
      if (!isPasswordCorrect) {
        return res.status(400).send({
          message: "invalid credentials",
        });
      }
      const token = jwt.sign({ id: firstCandidate.id }, "secret");
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
