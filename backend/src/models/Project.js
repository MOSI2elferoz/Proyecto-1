const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  }
});

module.exports = Project;
