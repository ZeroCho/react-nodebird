const express = require('express');
const morgan = require('morgan');
const hpp = require('hpp');
const helmet = require('helmet');
const apiRouter = require('./routes/api');

const app = express();

app.set('port', process.env.PORT || 3065);

if (process.env.NODE_ENv === 'production') {
  app.use(hpp());
  app.use(helmet());
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

app.use('/api', apiRouter);

app.listen(app.get('port'));