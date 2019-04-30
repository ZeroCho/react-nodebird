const express = require('express');
const multer = require('multer');
const path = require('path');

const { isLoggedIn } = require('../middleware');
const db = require('../../models');

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads')
    },
    filename(req, file, cb) {
      console.log(file);
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  console.log(req.body);
  console.log(req.user);
  try {
    // 나중에 @아이디도 파싱할 지 결정
    const hashtags = req.body.content.match(/#[^\s]*/g);
    const newPost = await db.Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    if (hashtags) {
      const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({
        where: { name: tag.slice(1).toLowerCase() },
      })));
      await newPost.addHashtags(result.map(r => r[0]));
    }
    if (req.body.images) {
      await newPost.addImages(req.body.images.map((v) => ({
        src: v,
      })));
    }
    const post = await db.Post.findOne({
      where: { id: newPost.id },
      include: [{
        model: db.Image,
      }, {
        model: db.User,
      }],
    });
    console.log(post);
    res.json(post);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => {
  console.log(req.files, req.body);
  res.json(req.files.map((v) => v.filename));
});

router.delete('/:id', async (req, res, next) => {

});

router.patch('/:id', async (req, res, next) => {

});

router.post('/:id/retweet', async (req, res, next) => {

});

router.post('/:id/like', async (req, res, next) => {

});

router.delete('/:id/like', async (req, res, next) => {

});

router.get('/:id/comments', async (req, res, next) => {

});


router.post('/:id/comment', async (req, res, next) => {

});

router.delete('/:id/comment', async (req, res, next) => {

});

module.exports = router;