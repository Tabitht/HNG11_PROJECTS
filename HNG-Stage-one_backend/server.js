const express = require('express');
const axios = require('axios');

const app = express();
app.set('trust proxy', true);
const port = process.env.PORT || 3000;

app.get('/api/hello', async (req, res) => {
  const visitorName = req.query.visitor_name;
  const clientIp = req.ip;
  const apiKey = process.env.API_KEY

  try {
    const geoResponse = await axios.get(`http://ip-api.com/json/${clientIp}`);
    const city = geoResponse.data.city;
    const weatherResponse = await axios.get(`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`);
    const Temperature = weatherResponse.data.temperature.current
    res.json({
      client_ip: clientIp,
      location: city,
      greeting: `Hello, ${visitorName}!, the temperature is ${Temperature} degrees Celsius in ${city}`
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to Get location' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
module.exports = app;
