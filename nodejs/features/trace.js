const express = require("express");
// const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const https = require("https");

// const tracker = require("@middleware.io/node-apm");
const tracker = require("@middleware.io/node-apm");
// const tracer = tracker.getTracer("testTRacer", "2.0.0");
// const Sentry = require("@sentry/node");

tracker.track({
    projectName: "beta1--node-2.1.2-rc.5",
    serviceName: "beta1-node-2.1.2-rc.5",
    accessToken: "xtzrzvturlisziuvpdffwdsjavkwzpyplwrz",
    target: "https://kbuin.beta.env.middleware.io",
});

function getRequest() {
    const url = "https://opentelemetry.io/";

    return new Promise((resolve, reject) => {
        const req = https.get(url, (res) => {
            resolve(res.statusCode);
        });

        req.on("error", (err) => {
            reject(new Error(err));
        });
    });
}

const app = express();
app.use(bodyParser.json());

// Predefined array of items
const predefinedItems = [
    { id: "1", name: "Item 1", description: "This is item 1" },
    { id: "2", name: "Item 2", description: "This is item 2" },
    { id: "3", name: "Item 3", description: "This is item 3" },
];

let items = [...predefinedItems];

// Reset items to predefined array before each request
app.use((req, res, next) => {
    items = [...predefinedItems];
    next();
});

// Create
app.post("/items", (req, res) => {
    console.log("request recievedd here");
    const newItem = { id: uuidv4(), ...req.body };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Read all
// app.get("/items", async (req, res) => {
//   console.log("request recievedd here");
//   tracer.startActiveSpan("HeavyProcessing", async (span) => {
//     /*
//        Add Custom Events and Attributes
//     */
//     span.setAttribute("foo", "bar");
//     span.addEvent("Custom Get CHallenge Event");
//     const result = await getRequest();

//     //await delay(20000);
//     span.end();
//   });

//   res.json(items);
// });

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Read one
app.get("/items/:id", (req, res) => {
    // tracker.info("Sample Express app Info log");
    // tracker.warn("Sample Express app Warn log");
    // tracker.debug("Sample Express app Debug log");
    // tracker.error("Sample Express app Error log");
    // try {
    //   throw new Error("Oh ! Items not found new");
    // } catch (e) {
    //   tracker.errorRecord(e);
    // }
    const item = items.find((item) => item.id === req.params.id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

app.get("/simulated-crash", (req, res) => {
    throw new Error("Simulated crash");
});

app.get("/json-parsing", (req, res, next) => {
    console.log("json-parsing function called");

    const invalidJson = "{ type: 'json' }";
    const parsedData = JSON.parse(invalidJson);
    res.json(parsedData);
});

app.get("/simulated-rejection", (req, res) => {
    Promise.reject(new Error("Simulated rejection"));
});


app.get("/index", (req, res) => {
    // index out of range error
    const arr = [1, 2, 3];
    const index = 5; // out of range
    const value = arr[index]; // This will cause an error
    console.log(value); // This line will not be executed
});

// Update
app.put("/items/:id", (req, res) => {
    const index = items.findIndex((item) => item.id === req.params.id);
    if (index !== -1) {
        items[index] = { ...items[index], ...req.body };
        res.json(items[index]);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

// Delete
app.delete("/items/:id", (req, res) => {
    const index = items.findIndex((item) => item.id === req.params.id);
    if (index !== -1) {
        const deletedItem = items[index];
        items.splice(index, 1);
        res.json(deletedItem);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.log("caught error ....")
//   res.status(500).json({ message: "Naman APP Internal Server Error" });
// });

// Register the error handler middleware
tracker.registerErrorHandler(app);

// The error handler must be registered before any other error middleware and after all controllers
// Sentry.setupExpressErrorHandler(app);


app.listen(3000, () => {
    console.log("server staretd on 3000");
});

// Lambda handler
// module.exports.handler = app;