const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Active = require('../models/Active');

const connection = new Sequelize(dbConfig);

User.init(connection);
Active.init(connection);

User.associate(connection.models);
Active.associate(connection.models);

module.exports = connection;

