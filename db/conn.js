const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/the_acme_item_tracker_db');

module.exports = {conn};