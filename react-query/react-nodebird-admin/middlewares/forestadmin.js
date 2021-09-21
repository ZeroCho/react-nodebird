const chalk = require('chalk');
const path = require('path');
const Liana = require('forest-express-sequelize');
const { sequelize } = require('../models');

module.exports = async function forestadmin(app) {
  app.use(await Liana.init({
    modelsDir: path.join(__dirname, '../models'),
    configDir: path.join(__dirname, '../forest'),
    envSecret: process.env.FOREST_ENV_SECRET,
    authSecret: process.env.FOREST_AUTH_SECRET,
    sequelize,
  }));

  console.log(chalk.cyan('Your admin panel is available here: https://app.forestadmin.com/projects'));
};
