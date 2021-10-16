const { response } = require("express");
const sql = require("./db.js");

// constructeur
const Candidate = function (candidate) {
  this.name = candidate.name;
  this.first_name = candidate.first_name;
  this.email = candidate.email;
  this.phone = candidate.phone;
  this.adress = candidate.adress;
  this.postal_code = candidate.postal_code;
  this.city = candidate.city;
  this.birth_date = candidate.birth_date;
  this.cv = candidate.cv;
  this.picture = candidate.picture;
  this.gender = candidate.gender;
  this.password = candidate.password;
};

Candidate.getAll = (result) => {
  sql.query("SELECT * FROM candidate", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("candidate: ", res);
    result(null, res);
  });
};

Candidate.removeAll = (result) => {
  sql.query("DELETE FROM candidate", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("deleted ${res.affectedRows} candidate");
    result(null, res);
  });
};

Candidate.create = (newCandidate, result) => {
  sql.query("INSERT INTO candidate SET ?", newCandidate, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created candidate: ", { id: res.insertId, ...newCandidate });
    result(null, { id: res.insertId, ...newCandidate });
  });
};

Candidate.remove = (id, result) => {
  sql.query("DELETE FROM candidate WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found candidate with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted candidate with id: ", id);
    result(null, res);
  });
};

Candidate.updateById = (candidateId, credentials, result) => {
  console.log(credentials);
  sql.query(
    `UPDATE candidate SET ? WHERE id= '${candidateId}'`,
    credentials,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found candidate with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated candidate: ", { credentials });
      result(null, credentials);
    }
  );
};

Candidate.findById = (candidateId, result) => {
  sql.query(`SELECT * FROM candidate WHERE id = ${candidateId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found candidate: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Candidate with the id
    result({ kind: "not_found" }, null);
  });
};
Candidate.login = (credentials, result) => {
  console.log(credentials);
  sql.query(
    `SELECT * FROM candidate WHERE email = '${credentials.email}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("candidate: ", res);
      result(null, res);
    }
  );
};
module.exports = Candidate;
