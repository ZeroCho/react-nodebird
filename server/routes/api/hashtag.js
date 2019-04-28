const express = require('express');
const db = require('../../models');

const router = express.Router();

router.get('/:name', async (req, res, next) => {
  try {

  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
