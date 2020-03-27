require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const winston = require ('winston')
const uuid = require('uuid/v4')

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const bookmarks = [
  {
      id: uuid(),
      title: 'Thinkful',
      url: 'https://www.thinkful.com',
description: 'coding bootcamp',
rating:5
  },
  {
      id: uuid(),
      title: 'instagram',
      url: 'https://www.instagram.com',
description: 'ouroboros of desperation',
rating:1
  },
  {
      id: uuid(),
      title: 'Google',
      url: 'https://www.google.com',
description: 'find any website!',
rating:5
  },
]

app.get('/bookmarks', (req, res)=>{
  res.json(bookmarks);
})

app.get('/bookmarks/:id', (req, res) => {
  const {id}=req.params;
  const bookmark = bookmarks.find(b => b.id == id)
  if (!bookmark) {
    logger.error(`bookmark with id ${id} not found`)
    return res.status(404).send('bookmark not found')
  }
  res.json(bookmark)
})

const logger = winston.createLogger({
  level:'info',
  format: winston.format.json(),
  transports:[
    new winston.transports.File({filename: 'info log'})
  ]
})
if(NODE_ENV !=='production'){
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }))
}

app.use(function validateBearerToken(req, res, next){
  const apiToken = process.env.API_TOKEN
  const authToken = req.get('authorisation')

  if(!authToken || authToken.split(' ')[1] !==apiToken){
    logger.error(`unauthorised request to path: ${req.path}`)
    return res.status(401).json({error: 'unathorised request'})
  }
})

app.use(function errorHandler(error, req, res, next) {
  let reponse;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
