module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    charset: 'utf-8',
    collate: 'utf8_general_ci',
  });
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'followingId' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'followerId' });
    db.User.belongsToMany(db.Post, { through: 'Like' });
    db.User.belongsToMany(db.Post, { through: 'ReTweet' });
    db.User.hasMany(db.Comment);
  };
  return User;
};
