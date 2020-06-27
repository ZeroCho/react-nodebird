const express = require('express');
const { User, Hashtag, Image, Post } = require('../models');

const router = express.Router();

router.get('/:tag', async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      include: [{
        model: Hashtag,
        where: { name: decodeURIComponent(req.params.tag) },
      }, {
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: Image,
      }, {
        model: User,
        through: 'Like',
        as: 'Likers',
        attributes: ['id'],
      }, {
        model: Post,
        as: 'Retweet',
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }, {
          model: Image,
        }],
      }],
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
