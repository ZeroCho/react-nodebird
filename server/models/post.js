module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('post', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.User, { through: 'Like' });
    db.Post.belongsToMany(db.User, { through: 'ReTweet' });
  };
  return Post;
};
