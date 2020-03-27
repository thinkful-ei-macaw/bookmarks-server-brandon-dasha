

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const uuid = require('uuid/v4');
const bookmarksRouter = require('./bookmark-router');
const store = require('./store');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(bookmarksRouter)
app.use(express.json())

app.get('/', (req, res) => {

  res.send(store.bookmarks);
});




module.exports = app;