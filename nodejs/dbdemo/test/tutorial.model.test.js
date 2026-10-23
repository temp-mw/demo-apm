const assert = require("node:assert/strict");
const { test } = require("node:test");

const dbPath = require.resolve("../app/models/db.js");
const cachedDb = require.cache[dbPath];
const sql = {};
let Tutorial;
try {
  require.cache[dbPath] = { exports: sql };
  Tutorial = require("../app/models/tutorial.model.js");
} finally {
  if (cachedDb) require.cache[dbPath] = cachedDb;
  else delete require.cache[dbPath];
}

const tutorial = {
  title: "PostgreSQL's parameters",
  description: "Keep ? and $1 in the value",
  published: false
};

test("updateById binds PostgreSQL parameters in order", () => {
  sql.query = (query, values, callback) => {
    assert.equal(
      query,
      "UPDATE tutorials SET title = $1, description = $2, published = $3 WHERE id = $4"
    );
    assert.deepEqual(values, [
      tutorial.title,
      tutorial.description,
      tutorial.published,
      "42"
    ]);
    callback(null, { rowCount: 1 });
  };
  let calls = 0;
  Tutorial.updateById("42", tutorial, (err, data) => {
    calls++;
    assert.equal(err, null);
    assert.deepEqual(data, { id: "42", ...tutorial });
  });
  assert.equal(calls, 1);
});

test("updateById reports a missing record using PostgreSQL rowCount", () => {
  sql.query = (query, values, callback) => callback(null, { rowCount: 0 });
  let calls = 0;
  Tutorial.updateById("42", tutorial, (err, data) => {
    calls++;
    assert.deepEqual(err, { kind: "not_found" });
    assert.equal(data, null);
  });
  assert.equal(calls, 1);
});

test("updateById propagates database errors", () => {
  const error = new Error("database unavailable");
  sql.query = (query, values, callback) => callback(error);
  let calls = 0;
  Tutorial.updateById("42", tutorial, (err, data) => {
    calls++;
    assert.equal(err, error);
    assert.equal(data, null);
  });
  assert.equal(calls, 1);
});
