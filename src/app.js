require('dotenv').config();
const { NODE_ENV} = require('./config');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const validateBearerToken = require('./validateBearerToken');
const errorHandler = require('./errorHandler');
const bookmarkRouter = require('./bookmarkRouter');




const app = express();

app.use(morgan ((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV.ENV === 'test'
}))   //ternary statement if/then, else
app.use(helmet()) // helmet must come before cors
app.use(cors());
app.use(express.json());

app.use(validateBearerToken);

app.use(bookmarkRouter);
app.use(errorHandler);



module.exports = app;