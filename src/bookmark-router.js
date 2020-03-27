const express = require('express')
const uuid = require('uuid/v4')
const logger = require('./logger')
const store = require('./store')


//get and POST will go here

const bookmarksRouter = express.Router()
const bodyParser = express.json();


bookmarksRouter.route('/bookmarks').get(
    (req, res)=>{
        // move implementation logic into here
        res.json(store.bookmarks)
    }
)
bookmarksRouter.route('bookmarks/:id')
.get((req, res)=>{
    const {id}=req.params;
    const bookmark = bookmarks.find(b => b.id == id);
    if (!bookmark) {
      logger.error(`bookmark with id ${id} not found`);
      return res.status(404).send('bookmark not found');
    }
    res.json(bookmark);

})
.post(bodyParser,
    (req, res)=>{
        // move implementation logic into here

    }
)

.delete (
    (req, res)=>{
const {id} = req.params;
const bookmarkIndex = bookmarks.findIndex(b => b.id == b)

if (bookmarkIndex === -1) {
    logger.error(`bookmark with id ${id} not found`);
    return res.status(404).send('not found')
}
bookmarks.splice(bookmarksIndex, 1);
logger.info(`bookmark with id ${id} deleted`)

res.status(204).end();
    }
)



module.exports = bookmarksRouter