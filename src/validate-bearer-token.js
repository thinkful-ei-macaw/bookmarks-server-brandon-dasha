/* eslint-disable strict */
require('dotenv').config();
const winston = require('winston');
const { NODE_ENV } = require('./config');

app.use(function validateBearerToken(req, res, next){
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get('authorisation');
  
  if(!authToken || authToken.split(' ')[1] !==apiToken){
    logger.error(`unauthorised request to path: ${req.path}`);
    return res.status(401).json({error: 'unathorised request'});
  }
});

module.exports = validateBearerToken();