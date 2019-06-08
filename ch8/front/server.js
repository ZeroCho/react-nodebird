const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const https = require('https');
const http = require('http');

const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';

const app = next({ dev });
const handle = app.getRequestHandler();
dotenv.config();

app.prepare().then(() => {
  const server = express();

  server.use(morgan('dev'));
  server.use('/', express.static(path.join(__dirname, 'public')));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser(process.env.COOKIE_SECRET));
  server.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }));

  server.get('/post/:id', (req, res) => {
    return app.render(req, res, '/post', { id: req.params.id });
  });

  server.get('/hashtag/:tag', (req, res) => {
    return app.render(req, res, '/hashtag', { tag: req.params.tag });
  });

  server.get('/user/:id', (req, res) => {
    return app.render(req, res, '/user', { id: req.params.id });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  if (prod) {
    const lex = require('greenlock-express').create({
      version: 'draft-11',
      configDir: '/etc/letsencrypt', // 또는 ~/letsencrypt/etc
      server: 'https://acme-v02.api.letsencrypt.org/directory',
      approveDomains: (opts, certs, cb) => {
        if (certs) {
          opts.domains = ['nodebird.com', 'www.nodebird.com'];
        } else {
          opts.email = 'zerohch0@gmail.com';
          opts.agreeTos = true;
        }
        cb(null, { options: opts, certs });
      },
      renewWithin: 81 * 24 * 60 * 60 * 1000,
      renewBy: 80 * 24 * 60 * 60 * 1000,
    });
    https.createServer(lex.httpsOptions, lex.middleware(server)).listen(443);
    http.createServer(lex.middleware(require('redirect-https')())).listen(80);
  } else {
    server.listen(prod ? process.env.PORT : 3060, () => {
      console.log(`next+express running on port ${process.env.PORT}`);
    });
  }
});
