const express = require('express');
const db = require('../../models');

const router = express.Router();

router.get('/:name', async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      include: [{
        model: db.Hashtag,
        where: { name: decodeURIComponent(req.params.name) },
      }, {
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
