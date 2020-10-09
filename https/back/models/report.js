const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Report extends Model {
  static init(sequelize) {
    return super.init({
      // id가 기본적으로 들어있다.
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    }, {
      modelName: 'Report',
      tableName: 'reports',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', // 이모티콘 저장
      sequelize,
    });
  }
  static associate(db) {
    db.Report.belongsTo(db.User);
    db.Report.belongsTo(db.Post);
  }
};
