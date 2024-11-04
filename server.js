const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for setting CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// JSONP or JSON response function
function sendJSONP(req, res, data) {
  const callback = req.query.callback;
  if (callback) {
    res.setHeader('Content-Type', 'application/javascript');
    res.send(`${callback}(${JSON.stringify(data)})`);
  } else {
    res.json(data);
  }
}

// /get endpoint to wrap response in JSON with `contents`
app.get('/get', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).json({ error: 'URL is required' });

  try {
    const response = await fetch(targetUrl);
    const text = await response.text();
    const data = { contents: text };
    sendJSONP(req, res, data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch URL' });
  }
});

// /raw endpoint to return unwrapped response
app.get('/raw', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).json({ error: 'URL is required' });

  try {
    const response = await fetch(targetUrl);
    const contentType = response.headers.get('content-type');
    res.setHeader('Content-Type', contentType || 'text/plain');
    response.body.pipe(res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch URL' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
