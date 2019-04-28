const passport = require('passport');
const bcrypt = require('bcrypt');
const express = require('express');

const db = require('../../models');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'not logged in' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  req.logout();
  res.send('ok');
});

router.post('/signup', async (req, res, next) => {
  console.log(req.body);
  try {
    const exUser = await db.User.findOne({
      where: {
        userId: req.body.id,
      },
    });
    if (exUser) {
      return res.status(403).json({ reason: '이미 사용중인 아이디입니다.' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await db.User.create({
      nickname: req.body.nick,
      userId: req.body.id,
      password: hashedPassword,
    });
    console.log(newUser);
    res.json(newUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/login', async (req, res, next) => {
  console.log(req.cookie);
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).json(info);
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      delete user.password;
      console.log(user);
      res.json(user);
    });
  })(req, res, next);
});

router.get('/:id', async (req, res, next) => {

});

router.post('/:id/follow', async (req, res, next) => {

});

router.delete('/:id/follow', async (req, res, next) => {

});

router.get('/:id/posts', async (req, res, next) => {

});

module.exports = router;
