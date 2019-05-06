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

router.delete('/:id', isLoggedIn, async (req, res, next) => {
  try {
    await db.Post.destroy({ where: { id: req.params.id } });
    res.json({ postId: parseInt(req.params.id) });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.patch('/:id', isLoggedIn, async (req, res, next) => {
  try {
    // 나중에 @아이디도 파싱할 지 결정
    await db.Post.update({
      content: req.body.content,
    }, {
      where: {
        id: req.params.id,
        UserId: req.user.id,
      },
    });
    const post = await db.Post.findOne({
      where: { id: req.params.id },
      include: [{
        model: db.Image,
      }, {
        model: db.User,
      }],
    });
    const hashtags = req.body.content.match(/#[^\s]*/g);
    if (hashtags) {
      const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({
        where: { name: tag.slice(1).toLowerCase() },
      })));
      await post.setHashtags(result.map(r => r[0]));
    }
    console.log(post);
    res.json(post);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/:id/retweet', isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('no such post');
    }
    await post.addRetweeter(req.user.id);
    res.json(post);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/:id/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('no such post');
    }
    await post.addLiker(req.user.id);
    res.json({ userId: req.user.id });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/:id/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('no such post');
    }
    await post.removeLiker(req.user.id);
    res.json({ userId: req.user.id });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/:id/comments', async (req, res, next) => {

});

router.post('/:id/comment', isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('no such post');
    }
    const comment = await db.Comment.create({
      PostId: post.id,
      UserId: req.user.id,
      content: req.body.content,
    });
    await post.addComment(comment.id);
    res.json(comment);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/:id/comment/:cid', isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('no such post');
    }
    await post.removeComment(req.params.cid);
    res.send(req.params.cid);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
