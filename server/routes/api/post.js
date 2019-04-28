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
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});
router.post('/', isLoggedIn, upload.array('image'), async (req, res, next) => {
  console.log(req.body);
  console.log(req.files);
  console.log(req.user);
  try {
    // 컨텐츠 # 파싱
    const newPost = await db.Post.create({
      content: req.body.content,
      userId: req.user.id,
    });
    // await newPost.addImages(req.files.map((f) => f.pathname));
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