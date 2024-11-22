var express = require('express');
var axios = require('axios');
var path = require('path');
var app = express();
var PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Serve the index.html file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// POST route to handle /refreshapps
app.post('/api/refreshapps', (req, res) => {
  var apiKey = 'a37b7897-9063-42dd-bd5f-e29650eaa009'; // Replace with your actual API key
  var apiUrl = 'https://api.modeck.io/refreshapps';

  axios
    .post(apiUrl, { apiKey: apiKey })
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.error('Error refreshing apps:', error.message);
      res.status(500).json({
        success: false,
        message: 'Failed to refresh apps',
        error: error.response?.data || error.message,
      });
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
