const assert = require("assert");

const dbPath = require.resolve("../app/models/db.js");
const originalDb = require.cache[dbPath];
const sql = {};
require.cache[dbPath] = { exports: sql };
const Tutorial = require("../app/models/tutorial.model.js");
if (originalDb) require.cache[dbPath] = originalDb;
else delete require.cache[dbPath];

const tutorial = new Tutorial({
  title: "O'Reilly",
  description: "A tutorial",
  published: false
});
const row = { id: 42, ...tutorial };
const response = { rows: [row], rowCount: 1 };
const cases = [
  {
    method: "create",
    args: [tutorial],
    query:
      "INSERT INTO tutorials (title, description, published) VALUES ($1, $2, $3) RETURNING id",
    values: [tutorial.title, tutorial.description, tutorial.published],
    expected: row
  },
  {
    method: "findById",
    args: ["42"],
    query: "SELECT * FROM tutorials WHERE id = $1",
    values: ["42"],
    expected: row,
    notFound: true
  },
  {
    method: "getAll",
    args: [tutorial.title],
    query: "SELECT * FROM tutorials WHERE title LIKE $1",
    values: [`%${tutorial.title}%`],
    expected: [row]
  },
  {
    method: "getAll",
    args: [undefined],
    query: "SELECT * FROM tutorials",
    values: [],
    expected: [row]
  },
  {
    method: "getAllPublished",
    args: [],
    query: "SELECT * FROM tutorials WHERE published=true",
    expected: [row]
  },
  {
    method: "updateById",
    args: ["42", tutorial],
    query:
      "UPDATE tutorials SET title = $1, description = $2, published = $3 WHERE id = $4",
    values: [tutorial.title, tutorial.description, tutorial.published, "42"],
    expected: { ...row, id: "42" },
    notFound: true
  },
  {
    method: "remove",
    args: ["42"],
    query: "DELETE FROM tutorials WHERE id = $1",
    values: ["42"],
    expected: response,
    notFound: true
  },
  {
    method: "removeAll",
    args: [],
    query: "DELETE FROM tutorials",
    expected: response
  }
];

for (const testCase of cases) {
  const error = new Error("database unavailable");
  const scenarios = [
    { err: null, res: response, expected: testCase.expected },
    { err: error, expectedError: error, expected: null }
  ];
  if (testCase.notFound) {
    scenarios.push({
      err: null,
      res: { rows: [], rowCount: 0 },
      expectedError: { kind: "not_found" },
      expected: null
    });
  }

  for (const scenario of scenarios) {
    let queryCalls = 0;
    let resultCalls = 0;
    sql.query = (query, ...args) => {
      queryCalls++;
      const callback = args.pop();
      assert.strictEqual(query, testCase.query);
      assert.deepStrictEqual(args, testCase.values ? [testCase.values] : []);
      callback(scenario.err, scenario.res);
    };
    Tutorial[testCase.method](...testCase.args, (err, data) => {
      resultCalls++;
      assert.deepStrictEqual(err, scenario.expectedError || null);
      assert.deepStrictEqual(data, scenario.expected);
    });
    assert.strictEqual(queryCalls, 1);
    assert.strictEqual(resultCalls, 1);
  }
}
