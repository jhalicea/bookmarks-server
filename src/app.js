'use strict';

const express = require('express');
const morganLogger = require('./morganLogger');
const cors = require('cors');
const helmet = require('helmet');
const validateBearerToken = require('./validateBearerToken');
const bookmarks = require('./bookmarks-router');
const serverError = require('./serverError');

const app = express();

app.use(morganLogger);
app.use(helmet());
app.use(cors());
app.use(validateBearerToken);
app.use(bookmarks);
app.use(serverError);

module.exports = app;