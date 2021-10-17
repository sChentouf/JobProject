const sql = require("./db.js");

// constructeur
const Applied = function (applied) {
  this.advertisement_id = applied.advertisement_id;
  this.candidate_id = applied.candidate_id;
  this.motivation_people = applied.motivation_people;
};

Applied.getAll = (result) => {
  sql.query("SELECT * FROM applied", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("applied: ", res);
    result(null, res);
  });
};

Applied.removeAll = (result) => {
  sql.query("DELETE FROM applied", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("deleted ${res.affectedRows} applied");
    result(null, res);
  });
};
Applied.createAU = (newApplied, result) => {
  sql.query("INSERT INTO applied SET ?", newApplied, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created applied: ", { id: res.insertId, ...newApplied });
    result(null, { message: "yesss" });
  });
};

Applied.createA = (newApplied, result) => {
  sql.query("INSERT INTO applied SET ?", newApplied, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created applied: ", { id: res.insertId, ...newApplied });
    result(null, { message: "yesss" });
  });
};

Applied.remove = (id, result) => {
  sql.query("DELETE FROM applied WHERE id = ?", id, (err, res) => {
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

    console.log("deleted applied with id: ", id);
    result(null, res);
  });
};

Applied.removead = (advertisements_id, result) => {
  sql.query(
    "DELETE FROM applied WHERE advertisements_id = '${req.body.advertisements_id}'",
    (err, res) => {
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

      console.log("deleted applied with id: ", id);
      result(null, res);
    }
  );
};

Applied.updateById = (id, candidate, result) => {
  sql.query(
    "UPDATE applied SET email = ?, WHERE id = ?",
    [applied.email, id],
    (err, res) => {
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

      console.log("updated applied: ", { id: id, ...applied });
      result(null, { id: id, ...applied });
    }
  );
};

Applied.findById = (appliedId, result) => {
  sql.query(`SELECT * FROM applied WHERE id = ${appliedId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found applied: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Candidate with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Applied;
