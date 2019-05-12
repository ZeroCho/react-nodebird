const { isLoggedIn, isNotLoggedIn } = require('../middleware');

const passport = require('passport');
const bcrypt = require('bcrypt');
const express = require('express');

const db = require('../../models');

const router = express.Router();

router.get('/', isLoggedIn, (req, res) => {
  res.json(req.user);
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: { id: req.params.id },
      include: [{
        model: db.Post,
        as: 'Post',
        attributes: ['id'],
      }, {
        model: db.User,
        as: 'Followers',
        attributes: ['id'],
      }, {
        model: db.User,
        as: 'Followings',
        attributes: ['id'],
      }],
    });
    const jsonUser = user.toJSON();
    jsonUser.Post = jsonUser.Post ? jsonUser.Post.length : 0;
    jsonUser.Followers = jsonUser.Followers ? jsonUser.Followers.length : 0;
    jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings.length : 0;
    res.json(jsonUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/logout', isLoggedIn, (req, res) => {
  req.session.destroy();
  req.logout();
  res.send('ok');
});

router.post('/signup', isNotLoggedIn, async (req, res, next) => {
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
    return res.json(newUser);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.post('/login', isNotLoggedIn, async (req, res, next) => {
  console.log(req.cookie);
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).json(info);
    }
    return req.login(user, (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const filteredUser = Object.assign({}, user);
      delete filteredUser.password;
      console.log(user);
      return res.json(user);
    });
  })(req, res, next);
});

router.get('/:id/follow', async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: { id: req.user.id },
      include: [{
        model: db.User,
        as: 'Followers',
        attributes: ['id', 'nickname'],
      }, {
        model: db.User,
        as: 'Followings',
        attributes: ['id', 'nickname'],
      }],
    });
    res.json(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: { id: req.user.id },
    });
    await me.addFollowing(req.params.id);
    res.send(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: { id: req.user.id },
    });
    await me.removeFollowing(req.params.id);
    res.send(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/:id/follower', isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: { id: req.user.id },
    });
    await me.removeFollower(req.params.id);
    res.send(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/:id/posts', async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      where: {
        UserId: req.params.id,
        RetweetId: null,
      },
      include: [{
        model: db.User,
      }, {
        model: db.Image,
      }],
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
