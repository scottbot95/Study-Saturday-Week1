const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('student', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
};
