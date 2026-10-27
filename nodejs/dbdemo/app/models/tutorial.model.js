const sql = require("./db.js");

// constructor
const Tutorial = function(tutorial) {
  this.title = tutorial.title;
  this.description = tutorial.description;
  this.published = tutorial.published;
};

Tutorial.create = (newTutorial, result) => {
  // PostgreSQL binds $1, $2, ... to values supplied in an array.
  // RETURNING exposes the generated ID in the query result's rows array.
  sql.query(
    "INSERT INTO tutorials (title, description, published) VALUES ($1, $2, $3) RETURNING id",
    [newTutorial.title, newTutorial.description, newTutorial.published],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created tutorial: ", { id: res.rows[0].id, ...newTutorial });
      result(null, { id: res.rows[0].id, ...newTutorial });
    }
  );
};

Tutorial.findById = (id, result) => {
  sql.query("SELECT * FROM tutorials WHERE id = $1", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // pg wraps selected records in rows rather than returning an array directly.
    if (res.rows.length) {
      console.log("found tutorial: ", res.rows[0]);
      result(null, res.rows[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Tutorial.getAll = (title, result) => {
  let query = "SELECT * FROM tutorials";
  const values = [];

  if (title) {
    // Bind the search pattern so quotes in the title remain part of the value.
    query += " WHERE title LIKE $1";
    values.push(`%${title}%`);
  }

  sql.query(query, values, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("tutorials: ", res.rows);
    result(null, res.rows);
  });
};

Tutorial.getAllPublished = result => {
  sql.query("SELECT * FROM tutorials WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("tutorials: ", res.rows);
    result(null, res.rows);
  });
};

Tutorial.updateById = (id, tutorial, result) => {
  sql.query(
    "UPDATE tutorials SET title = $1, description = $2, published = $3 WHERE id = $4",
    [tutorial.title, tutorial.description, tutorial.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.rowCount === 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { id: id, ...tutorial });
      result(null, { id: id, ...tutorial });
    }
  );
};

Tutorial.remove = (id, result) => {
  sql.query("DELETE FROM tutorials WHERE id = $1", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // DELETE without RETURNING has no result rows; rowCount reports deletions.
    if (res.rowCount === 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tutorial with id: ", id);
    result(null, res);
  });
};

Tutorial.removeAll = result => {
  sql.query("DELETE FROM tutorials", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log(`deleted ${res.rowCount} tutorials`);
    result(null, res);
  });
};

module.exports = Tutorial;
