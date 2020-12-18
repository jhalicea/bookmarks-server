'use strict';

const express = require('express');
const { v4: uuid } = require('uuid');
const logger = require('./winstonLogger');
const bookmarks = require('./store');

const bookmarksRouter = express.Router();
const bodyParser = express.json();

bookmarksRouter.route('/bookmarks').get((req, res) => {
  res.json(bookmarks);
});

bookmarksRouter.route('/bookmarks/').post(bodyParser, (req, res) => {
  const {title, url, rating} = req.body;
  
  if (!title) {
    logger.error('Title is required');
    return res
      .status(400)
      .send('Invalid data');
  }
    
  if (!url || url.length < 5) {
    logger.error('The URL is required and has to be 5 characters long');
    return res
      .status(400)
      .send('The URL is required and has to be 5 characters long');
  }
  
  if (!rating || Number(rating) < 1 || Number(rating) > 5) {
    logger.error('Rating is required and has to be between 1 and 5');
    return res
      .status(400)
      .send('Rating is required and has to be between 1 and 5');
  }
  
  // get an id
  const id = uuid();
  
  const bookmark = {
    id,
    title,
    url,
    rating
  };
  
  bookmarks.push(bookmark);
  
  logger.info(`Bookmark with id ${id} created`);
  
  res
    .status(201)
    .location(`http://localhost:8000/bookmarks/${id}`)
    .json(bookmark);
});


  
bookmarksRouter.route('/bookmarks/:id').get((req, res) => {
  const { id } = req.params;
  const bookmark = bookmarks.find(bookmarks => bookmarks.id == id);
  if (!bookmark) {
    logger.error(`Bookmark with id ${id} not found.`);
    return res
      .status(404)
      .send('Bookmark Not Found');
  }
  
  res.json(bookmark);
});
  

  
bookmarksRouter.route('/bookmarks/:b_id').delete((req, res)=> {
  const { b_id } = req.params;
  console.log(b_id);
  
  const BookmarkIndex = bookmarks.findIndex(bookmark => bookmark.id == b_id);
  
  if (BookmarkIndex === -1) {
    logger.error(`Bookmark with id ${b_id} not found.`);
    return res
      .status(404)
      .send(`Bookmark with id ${b_id} not found.`);
  }
  
  bookmarks.splice(BookmarkIndex, 1);
  
  logger.info(`Bookmark with id ${b_id} deleted.`);
  res
    .status(204)
    .end();
});

module.exports = bookmarksRouter;