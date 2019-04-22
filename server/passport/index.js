const passport = require('passport');
const db = require('../models');
const local = require('./local');

module.exports = () => {
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      return done(null, await db.User.findOne({ where: { id } }));
    } catch (e) {
      console.error(e);
      return done(e);
    }
  });

  local();
};
