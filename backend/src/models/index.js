const sequelize = require('../db/database');
const User = require('./User');
const Project = require('./Project');
const Task = require('./Task');

// Associations
User.hasMany(Project, { foreignKey: 'userId', as: 'projects' });
Project.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Project.hasMany(Task, { foreignKey: 'projectId', as: 'tasks' });
Task.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

User.hasMany(Task, { foreignKey: 'assignedToId', as: 'tasks' });
Task.belongsTo(User, { foreignKey: 'assignedToId', as: 'assignedTo' });

module.exports = {
  sequelize,
  User,
  Project,
  Task
};
