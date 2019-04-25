const bcrypt = require('bcrypt');
const express = require('express');

const db = require('../models');

const router = express.Router();

router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'not logged in' });
  }
});

router.post('/user/signup', async (req, res) => {
  console.log(req.body);
  try {
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

module.exports = router;
