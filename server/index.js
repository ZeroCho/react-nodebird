const express = require('express');
const morgan = require('morgan');
const hpp = require('hpp');
const helmet = require('helmet');
const session = require('express-session');
const cookie = require('cookie-parser');
const passport= require('passport');
const cors = require('cors');

const passportConfig = require('./passport');
const db = require('./models');
const apiRouter = require('./routes/api');

const app = express();

passportConfig();
db.sequelize.sync();
app.set('port', process.env.PORT || 3065);

if (process.env.NODE_ENV === 'production') {
  app.use(hpp());
  app.use(helmet());
  app.use(morgan('combined'));
  app.use(cors({
    origin: '배포 주소 여기에 넣기',
  }));
} else {
  app.use(cors());
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter);

app.listen(app.get('port'), () => {
  console.log(`listening on port ${app.get('port')}`);
});
