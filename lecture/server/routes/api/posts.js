const express = require('express');
const db = require('../../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    let where = {};
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: req.query.lastId,
        },
      };
    }
    const posts = await db.Post.findAll({
      where,
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
      limit: 10,
      order: [['createdAt', 'DESC']],
    });
    console.log(posts);
    res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
