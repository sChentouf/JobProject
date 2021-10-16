const Applied = require("../models/applied.model");
const Candidate = require("../models/candidate.model");

//selectionner tout les candidats de la bdd
exports.findAll = (req, res) => {
  console.log("hgghg");
  Applied.getAll((err, data) => {
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
  Applied.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all applied.",
      });
    else res.send({ message: `All applied were deleted successfully!` });
  });
};

// exports.createA = (req, res) => {
//   Candidate.create(req.body, function (err, result) {
//     var applied = {
//       advertisementId: req.body.idAdv,
//       candidateId: result.insertId,
//       //motivationPeople: "jesuis motivé",
//     };
//     applied.createA(
//       applied,
//       function (error, resultt) {
//         // votre cdc a bine ete envoyer ou vous avez deja postuler
//         // LATE
//         res.send(resultt);
//       },
//       (er) => {
//         res.send({ message: "An error occured." });
//       }
//     );
//   });
// };
//createAU

//créer un applied et le sauvegarder
exports.createAU = (req, res) => {
  const candidateId = req.body.id;
  console.log("first");
  Candidate.findById(candidateId, (err, res) => {});
  console.log("second");
  //if (res) {
  const applied = new Applied({
    advertisement_id: req.body.idAdv,
    // candidate_id: res.id,
    candidate_id: candidateId,
    motivation_people: req.body.motivation_people,
  });

  Applied.createA(applied, (err, res) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Candidate.",
      });
  });

  //} else {
  // console.log(err);
  // }
};

//créer un applied et le sauvegarder
exports.createA = (req, res) => {
  console.log(req);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const candidate = new Candidate({
    name: req.body.name,
    first_name: req.body.first_name,
    email: req.body.email,
    phone: req.body.phone,
  });

  Candidate.create(candidate, (err, res) => {
    if (res) {
      console.log(res);
      const applied = new Applied({
        advertisement_id: req.body.idAdv,
        candidate_id: res.id,
        // candidate_id: req.body.candidate_id,
        motivation_people: req.body.motivation_people,
      });

      Applied.createA(applied, (err, res) => {
        if (err)
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while creating the Candidate.",
          });
      });
    } else {
      console.log(err);
    }
  });

  // const applied = new Applied({
  //   advertisement_id: req.body.idAdv,
  //   candidate_id: res.insertId,
  //   //candidate_id: req.body.candidate_id,
  //   motivation_people: req.body.motivation_people,
  // });

  // Applied.createA(applied, (err, res) => {
  // if (err)
  //   res.status(500).send({
  //     message:
  //       err.message || "Some error occurred while creating the Candidate.",
  //   });
  // else res.send({ message: "Successfully registered" });
  //});
};

// Candidate.selectlastid(candidate, (err, res) => {
//   if (err)
//     res.status(500).send({
//       message:
//         err.message || "Some error occurred while creating the Candidate.",
//     });
//   else res.send({ message: "okkkk" });
//   console.log(candidate.ID);
// });

// Create a applied

//   //console.log(applied);

//   // const applied = new Applied({
//   //   candidate_id: candidate.id,
//   //   advertisement_id:  advertisement.id,
//   //  motivation_people: motivation_people,

//   // });
//   // sql.query("INSERT INTO applied (candidate_id, advertisement_id, motivation_people) VALUES (?, ?, ?)", newApplied, (err, res) => {
//   //   if (err) {
//   //     console.log("error: ", err);
//   //     result(err, null);
//   //     return;
//   //   }

//   //   console.log("created candidate: ", { id: res.insertId, ...newApplied });
//   //   result(null, { id: res.insertId, ...newApplied });
//   // });

//   // console.log(req);
//   // if (!req.body) {
//   //   res.status(400).send({
//   //     message: "Content can not be empty!",
//   //   });
//   // }

//   // Save applied in the database
//   // Applied.create(applied, (err, data) => {
//   //   if (err)
//   //     res.status(500).send({
//   //       message:
//   //         err.message || "Some error occurred while creating the applied.",
//   //     });
//   //   else res.send({ message: "Successfully registered" });
//   // });

// // Find a single Customer with a customerId
exports.findOne = (req, res) => {
  Applied.findById(req.params.appliedId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.appliedId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.appliedId,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Applied.remove(req.params.appliedId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.appliedId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.appliedId,
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};
