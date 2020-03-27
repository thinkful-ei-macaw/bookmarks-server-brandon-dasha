/* eslint-disable strict */
const express = require('express');
const uuid = require('uuid/v4');
const { isWebUri } = require('valid-url');
const logger = require('./logger');
const store = require('./store');


//get and POST will go here

const bookmarksRouter = express.Router();
const bodyParser = express.json();


bookmarksRouter.route('/bookmarks').get(
  (req, res) => {
    // move implementation logic into here
    res.json(store.bookmarks);
  }
);

bookmarksRouter.route('/bookmarks')
  .get((req, res) => {
    const { id } = req.params;
    const bookmark = store.bookmarks.find(b => b.id == id);
    if (!bookmark) {
      logger.error(`bookmark with id ${id} not found`);
      return res.status(404).send('bookmark not found');
    }
    res.json(bookmark);

  })
  .post(bodyParser, (req, res)=>{
    // move implementation logic into here
    for (const keys of ['title', 'url', 'rating', 'description']) {
      if (!req.body[keys]) {
        return res.status(400)
          .send(`${keys} is required`);
      }
    }
    
    const { title, url, rating, description } = req.body;
      
    if (!isWebUri(url)) {
      logger.error(`Invalid url '${url}' supplied`);
      return res.status(400) 
        .send('url must be valid');
    }
      
    if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
      logger.error(`Invalid rating '${rating}' supplied`);
      return res.status(400)
        .send('rating needs to be a number 0 - 5');
    }
    
    const newBookmark = { id: uuid(), title, url, description, rating };

    store.bookmarks.push(newBookmark);

    logger.info(`bookmark ${newBookmark.id} added`);
    res.status(201)
      .location(`http://localhost:8000/bookmarks/${newBookmark.id}`)
      .json(newBookmark);
  })

    
  .delete (
    (req, res)=>{
      const { id } = req.params;
      const bookmarkIndex = store.bookmarks.findIndex(b => b.id == b);

      if (bookmarkIndex === -1) {
        logger.error(`bookmark with id ${id} not found`);
        return res.status(404).send('not found');
      }
      store.bookmarks.splice(bookmarkIndex, 1);
      logger.info(`bookmark with id ${id} deleted`);

      res.status(204)
        .end();
    }
  );



module.exports = bookmarksRouter;