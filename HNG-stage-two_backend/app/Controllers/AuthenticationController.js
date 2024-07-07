const services = require('../Services/AuthenticationServices')
const { validationResult } = require('express-validator');

async function register(request, response) {

  const errors = validationResult(request);
  if (!errors.isEmpty()){
    return response.status(422).json({ errors: errors.array() });
  }
  try{
    const results = await services.registerUser(request.body);

    response.status(201).json(results);
  } catch (error) {
    console.log(`Error querying database: ${error}`);

    response.status(error.statusCode || 400).json({ 
      status: error.status || 'Bad request',
      message: error.message || 'Registration unsuccessful'
    });
  }
}

  async function login(request, response) {

  try{
    const results = await services.loginUser(request.body.email, request.body.password);

    response.status(200).json(results);
  } catch (error) {
    console.log(`Error querying database: ${error}`);

    response.status(error.statusCode || 401).json({ 
      status: error.status || 'Bad request',
      message: error.message || 'Authentication failed'
    });
  }
}
module.exports = {
  register,
  login
}
