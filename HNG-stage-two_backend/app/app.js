const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const sequelize = require('./../config/database');
require('dotenv').config();

// route declaration
const authRouter = require('./routes/authenticationRoute');
const organisationRouter = require('./routes/organisationRoute');

const app = express();

sequelize.sync()
    .then(() => console.log('Database connected!'))
    .catch((error) => console.log('Error:' + error));

// Enable CORS for all route
app.use(cors());

//parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//parse cookies
app.use(cookieParser());

app.use(authRouter);
app.use(organisationRouter);

module.exports = app;