const sql = require("./db.js");

// constructeur
const Admin = function(admin) {
  
  this.email = admin.email;
  this.password = admin.password;
  this.role = admin.role;
};
Admin.getAll = (result) => {
  sql.query("SELECT * FROM admin", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("admin: ", res);
    result(null, res);
  });
};

Admin.removeAll = (result) => {
  sql.query("DELETE FROM admin", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("deleted ${res.affectedRows} admin");
    result(null, res);
  });
};

Admin.create = (newAdmin
    , result) => {
  sql.query("INSERT INTO admin SET ?", newAdmin, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created admin: ", { id: res.insertId, ...newAdmin });
    result(null, { id: res.insertId, ...newCandidate });
  });
};

Admin.remove = (id, result) => {
  sql.query("DELETE FROM admin WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found admin with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted admin with id: ", id);
    result(null, res);
  });
};

Admin.updateById = (id, admin, result) => {
  sql.query(
    "UPDATE admin SET email = ?, WHERE id = ?",
    [admin.email, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found admin with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated admin: ", { id: id, ...admin });
      result(null, { id: id, ...admin });
    }
  );
};

Admin.findById = (adminId, result) => {
  sql.query(`SELECT * FROM admin WHERE id = ${adminId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found admin: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Candidate with the id
    result({ kind: "not_found" }, null);
  });
};
Admin.login = (credentials, result) => {
  console.log(credentials);
  sql.query(
    `SELECT * FROM admin WHERE email = '${credentials.email}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("admin: ", res);
      result(null, res);
    }
  );
};
module.exports = Admin;
