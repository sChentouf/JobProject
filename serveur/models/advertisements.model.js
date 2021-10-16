const sql = require("./db.js");

// constructeur
const Advertisements = function (advertisements) {
  this.title = advertisements.title;
  this.short_description = advertisements.short_description;
  this.date = advertisements.date;
  this.contrat_type = advertisements.contrat_type;
  this.description = advertisements.description;
};

Advertisements.getAll = (result) => {
  sql.query("SELECT * FROM advertisements", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("advertisements: ", res);
    result(null, res);
  });
};

Advertisements.removeAll = (result) => {
  sql.query("DELETE FROM advertisements", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("deleted ${res.affectedRows} advertisements");
    result(null, res);
  });
};

Advertisements.create = (newAdvertisements, result) => {
  sql.query(
    "INSERT INTO advertisements SET ?",
    newAdvertisements,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created advertisements: ", {
        id: res.insertId,
        ...newAdvertisements,
      });
      result(null, { id: res.insertId, ...newAdvertisements });
    }
  );
};

Advertisements.remove = (id, result) => {
  sql.query("DELETE FROM advertisements WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found advertisements with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted advertisements with id: ", id);
    result(null, res);
  });
};

Advertisements.updateById = (advertisementsId, credentials, result) => {
  console.log(credentials);
  sql.query(
    `UPDATE advertisements SET ? WHERE id= '${advertisementsId}'`,
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

      console.log("updated advertisements ", { credentials });
      result(null, credentials);
    }
  );
};

// Advertisements.updateByCP = (advertisementsId, result) => {
//   sql.query(
//     `UPDATE advertisements SET compagnie_id= null WHERE id= '${advertisementsId}'`,

//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found buisness with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("updated advertisements ", { credentials });
//       result(null, credentials);
//     }
//   );
// };

Advertisements.findById = (advertisementsId, result) => {
  sql.query(
    `SELECT * FROM advertisements WHERE id = ${advertisementsId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found advertisements: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found advertisements with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Advertisements.findByTitle = (credentials, result) => {
  sql.query(
    `SELECT * FROM advertisements WHERE title = '${credentials.title}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found advertisements: ", res);
        result(null, res);
        return;
      }
      // not found advertisements with the title
      result({ kind: "not_found" }, null);
    }
  );
};
module.exports = Advertisements;
