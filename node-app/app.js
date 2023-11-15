const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  try {
    // Make a request to the API
    const response = await axios.get('http://localhost:3001/occupancy');

    // Display the API response on the screen
    res.send(`Occupancy API Response: ${JSON.stringify(response.data)}`);
  } catch (error) {
    console.error('Error fetching data from API:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
