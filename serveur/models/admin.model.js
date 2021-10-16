const sql = require("./db.js");

// constructeur
const Super = function(super) {
  
  this.email = super.email;
  this.password = super.password;
  this.role = super.role;
};
Super.getAll = (result) => {
  sql.query("SELECT * FROM super", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("super: ", res);
    result(null, res);
  });
};

Super.removeAll = (result) => {
  sql.query("DELETE FROM super", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("deleted ${res.affectedRows} super");
    result(null, res);
  });
};

Super.create = (newSuper
    , result) => {
  sql.query("INSERT INTO super SET ?", newSuper, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created candidate: ", { id: res.insertId, ...newSuper });
    result(null, { id: res.insertId, ...newCandidate });
  });
};

Super.remove = (id, result) => {
  sql.query("DELETE FROM super WHERE id = ?", id, (err, res) => {
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

    console.log("deleted super with id: ", id);
    result(null, res);
  });
};

Super.updateById = (id, candidate, result) => {
  sql.query(
    "UPDATE super SET email = ?, WHERE id = ?",
    [super.email, id],
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

      console.log("updated super: ", { id: id, ...super });
      result(null, { id: id, ...super });
    }
  );
};

Super.findById = (superId, result) => {
  sql.query(`SELECT * FROM super WHERE id = ${superId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found super: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Candidate with the id
    result({ kind: "not_found" }, null);
  });
};
super.login = (credentials, result) => {
  console.log(credentials);
  sql.query(
    `SELECT * FROM super WHERE email = '${credentials.email}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("super: ", res);
      result(null, res);
    }
  );
};
module.exports = Super;
