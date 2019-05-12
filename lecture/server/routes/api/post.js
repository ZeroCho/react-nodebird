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
    const hashtags = req.body.content.match(/#[^\s]+/g);
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
      if (Array.isArray(req.body.images)) {
        const images = await Promise.all(req.body.images.map((v) => {
          return db.Image.create({ src: v });
        }));
        await newPost.addImages(images);
      } else {
        const image = await db.Image.create({ src: req.body.images });
        await newPost.addImage(image);
      }
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

router.post('/images', isLoggedIn, upload.array('image'), (req, res) => {
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
    if (req.user.id === post.UserId) { // TODO: 내 포스트를 리트윗한 것을 내가 다시 리트윗할 때
      return res.status(403).send('Retweeting your own post is not allowed');
    }
    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await db.Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      },
    });
    if (exPost) {
      return res.status(403).send('already retweeted');
    }
    const retweet = await db.Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: 'retweet',
    });
    const retweetWithPrevPost = await db.Post.findOne({
      where: { id: retweet.id },
      include: [{
        model: db.Post,
        as: 'Retweet',
        include: [{
          model: db.User,
        }, {
          model: db.Image,
        }]
      }, {
        model: db.User,
      }]
    });
    res.json(retweetWithPrevPost);
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
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('no such post');
    }
    const comments = await db.Comment.findAll({
      where: {
        PostId: req.params.id,
      },
      order: [['createdAt', 'ASC']],
      include: [{
        model: db.User,
        attributes: ['id', 'nickname']
      }],
    });
    res.json(comments);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/:id/comment', isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('no such post');
    }
    const newComment = await db.Comment.create({
      PostId: post.id,
      UserId: req.user.id,
      content: req.body.content,
    });
    await post.addComment(newComment.id);
    const comment = await db.Comment.findOne({
      where: {
        id: newComment.id,
      },
      include: [{
        model: db.User,
        attributes: ['id', 'nickname']
      }],
    });
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
