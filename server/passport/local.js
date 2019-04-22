const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../models');

module.exports = () => {
  return new LocalStrategy({
    usernameField: 'user-id',
    passwordField: 'user-pass',
  }, async (id, pass, done) => {
    try {
      const user = await db.User.findOne({ where: { id }});
      if (user) {
        const result = await bcrypt.compare(pass, user.password);
        if (result) {
          return done(null, user);
        } else {
          return done(null, false, { msg: '비밀번호가 틀렸습니다!' });
        }
      } else {
        return done(null, false, { msg: '존재하지 않는 사용자입니다!' });
      }
    } catch (e) {
      console.error(e);
      return done(e);
    }
  });
};
