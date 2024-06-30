const express = require('express');
const axios = require('axios');

const app = express();
app.set('trust proxy', true);
const port = 3000;

app.get('/api/hello', async (req, res) => {
  const visitorName = req.query.visitor_name;
  const clientIp = req.ip;

  try {
    const geoResponse = await axios.get(`http://ip-api.com/json/${clientIp}`);
    const city = geoResponse.data.city;

    res.json({
      client_ip: clientIp,
      location: city,
      greeting: `Hello, ${visitorName}!, the temperature is 11 degrees Celsius in ${city}`
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to Get location' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
