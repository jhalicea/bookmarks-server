'use strict';

const express = require('express');
const { NODE_ENV } = require('./config');
const morgan = require('morgan');

const morganLogger = express.Router();


const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

morgan(morganOption);

module.exports = morganLogger;