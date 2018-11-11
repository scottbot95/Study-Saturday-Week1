const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('test', {
    subject: {
      type: Sequelize.STRING,
      allowNull: false
    },
    score: {
      type: Sequelize.FLOAT
    }
  });
};
