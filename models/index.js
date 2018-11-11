const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost/study_sat_week1', {
  logging: false
});

const Test = require('./test')(db);
const Student = require('./student')(db);

const init = async () => {
  try {
    await db.authenticate();
    console.log('Database connected');

    await Test.belongsTo(Student);
    await Student.hasMany(Test);

    await db.sync({force: false});
  } catch (err) {
    console.error('Failed to connect to database');
    return err;
  }
};

module.exports = { db, init, Test, Student };
