const next = require('next');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const port = parseInt(process.env.PORT, 10) || 3060;
const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  if (prod) {
    server.use(morgan('combined'));
  } else {
    server.use(morgan('dev'));
  }
  server.use('/', express.static(path.join(__dirname, '..', 'public')));
  server.use('/build/', express.static(path.join(__dirname, '..', 'build')));
  server.use('/_next/', express.static(path.join(__dirname, '..', 'build')));
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));
  server.use(cookieParser(process.env.COOKIE_SECRET));
  server.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: prod,
    },
  }));

  server.get('/hashtag/:tag', (req, res) => {
    return app.render(req, res, '/hashtag', { tag: req.params.tag });
  });

  server.get('/user/:id', (req, res) => {
    return app.render(req, res, '/user', { id: req.params.id });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log(`> Ready on http://localhost:${port}`);
  });
});
