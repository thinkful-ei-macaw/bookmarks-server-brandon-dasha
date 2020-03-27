/* eslint-disable strict */


require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const bookmarksRouter = require('./bookmark-router');
const store = require('./store');
const validateBearerToken = require('./validate-bearer-token');
const handleError = require('./handle-error');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(bookmarksRouter);
app.use(validateBearerToken);
app.use(express.json());

app.get('/', (req, res) => {

  res.send(store.bookmarks);
});

app.use(handleError);


module.exports = app;