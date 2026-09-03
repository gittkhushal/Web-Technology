const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.POSTGRESQL_URI, {
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('../models/User')(sequelize, Sequelize);
db.Book = require('../models/Book')(sequelize, Sequelize);

// Define associations
db.User.hasMany(db.Book, { as: 'books', foreignKey: 'userId' });
db.Book.belongsTo(db.User, { as: 'owner', foreignKey: 'userId' });

module.exports = db;
