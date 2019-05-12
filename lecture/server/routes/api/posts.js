const express = require('express');
const db = require('../../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      include: [{
        model: db.User,
      }, {
        model: db.User,
        through: 'Like',
        as: 'Likers',
        attributes: ['id'],
      }, {
        model: db.Image,
      }, {
        model: db.Post,
        as: 'Retweet',
        include: [{
          model: db.User,
        }, {
          model: db.Image,
        }],
      }],
      limit: 20,
      order: [['createdAt', 'DESC']],
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
