const Admin = require("../models/admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//créer un admin et le sauvegarder
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
  // Create a Admin
  const admin = new Admin({
    email: req.body.email,
    password: hashedPassword,
  });

  console.log(admin);

  // Save admin in the database
  Admin.create(admin, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the admin.",
      });
    else res.send({ message: "Successfully registered" });
  });
};
// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  Admin.findById(req.params.adminId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.adminId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.adminId,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Admin.remove(req.params.adminId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.adminId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.adminId,
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};

// exports.login = async (req, res) => {
//   Admin.login(
//     {
//       email: req.body.email,
//     },
//     async (err, data) => {
//       console.log(data);
//       if (!data || !data.length) {
//         return res.status(400).send({
//           message: "user not found",
//         });
//       }
//       // const firstAdmin = data[0];
//       // console.log(firstAdmin);
//       // const isPasswordCorrect = await bcrypt.compare(
//         // req.body.password,
//         password = req.body.password
//       // );

//       console.log(password);
//       Admin.comparepassword(req.body.password, (err, isMatch) => {
//         if (isMatch)
//         return res.Json;
//       })
  
//       // const token = jwt.sign({ id: firstAdmin.id }, "secret");
//       // res.cookie("jwt", token, {
//       //   httpOnly: true,
//       //   maxAge: 24 * 60 * 60 * 1000, // 1 day
//       // });
     
//     }
//   );
// };




exports.login = async (req, res) => {
  console.log(req.body);
  Admin.login(
    {
      email: req.body.email,
      password: req.body.password,
    },
    async (err, data) => {
      console.log(data);
      if (!data || !data.length) {
        return res.status(400).send({
          message: "user not found",
        });
      }
      // const firstAdmin = data[0];
      // const isPasswordCorrect = await bcrypt.compare(
      //   req.body.password,
      //   firstCandidate.password
      //);
      if (!req.body.password) {
        return res.status(400).send({
          message: "invalid credentials",
        });
      }

      res.send({
        message: "success",
      });
    }
  );
};
