const express = require('express');
const { register, login } = require('../Controllers/AuthenticationController');
const validateRegistration = require('../middlewares/registrationValidation');
const router = express.Router();

router.post('/auth/register', validateRegistration, register);
router.post('/auth/login', login);

module.exports = router;