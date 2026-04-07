const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'simple-express-app' });
});

// Home endpoint
app.get('/', (req, res) => {
  res.status(200).send('Welcome to Simple Express App!');
});

// Error endpoint - previously threw intentional error, now handles gracefully
app.get('/error', (req, res) => {
  // FIX: Replaced intentional error throw with graceful error handling
  // OLD CODE (line 76): throw new Error("Intentional 500 Internal Server Error!");
  console.error("An intentional 500 Internal Server Error was triggered for testing purposes.");
  res.status(500).send('Internal Server Error. Please contact support if the issue persists.');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', path: req.path });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;