const sql = require("./db.js");

// constructeur
const Buisness = function (buisness) {
  this.name = buisness.name;
  this.activities = buisness.activities;
  this.contact_name = buisness.contact_name;
  this.number_employes = buisness.number_employes;
  this.adress = buisness.adress;
  this.postal_code = buisness.postal_code;
  this.city = buisness.city;
  this.email = buisness.email;
  this.phone = buisness.phone;
  this.siret = buisness.siret;
  this.password = buisness.password;
};

Buisness.getAll = (result) => {
  sql.query("SELECT * FROM buisness", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("buisness: ", res);
    result(null, res);
  });
};

Buisness.removeAll = (result) => {
  sql.query("DELETE FROM buisness", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("deleted ${res.affectedRows} buisness");
    result(null, res);
  });
};

Buisness.create = (newBuisness, result) => {
  sql.query("INSERT INTO buisness SET ?", newBuisness, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log(res);
    console.log("created buisness: ", { id: res.insertId, ...newBuisness });
    result(null, { id: res.insertId, ...newBuisness });
  });
};

Buisness.remove = (id, result) => {
  sql.query("DELETE FROM buisness WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found buisness with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted buisness with id: ", id);
    result(null, res);
  });
};

Buisness.updateById = (buisnessId, credentials, result) => {
  console.log(credentials);
  sql.query(
    `UPDATE buisness SET ? WHERE id= '${buisnessId}'`,
    credentials,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found buisness with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated buisness: ", { credentials });
      result(null, credentials);
    }
  );
};

Buisness.findById = (buisnessId, result) => {
  sql.query(`SELECT * FROM buisness WHERE id = ${buisnessId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found buisness with the id
    result({ kind: "not_found" }, null);
  });
};

Buisness.loginB = (credentials, result) => {
  sql.query(
    `SELECT * FROM buisness WHERE email = '${credentials.email}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("buisness: ", res);
      result(null, res);
    }
  );
};

module.exports = Buisness;
