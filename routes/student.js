const router = require('express').Router();

const { Student, Test } = require('../models');


router.get('/', async (req, res, next) => {
  res.json(await Student.findAll());
});

router.get('/top', async (req, res, next) =>{
  try {
    const tests = await Test.findAll({include:[{model:Student}]});

    const topScores = {};

    const top = tests.reduce((obj, test) => {
      if (topScores[test.subject] === undefined || topScores[test.subject] < test.score) {
        topScores[test.subject] = test.score;
        obj[test.subject] = test.student;
      }
      return obj;
    }, {});

    res.json(top);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student !== null) {
      res.json(student);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});

router.get('/:id/tests', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student === null) { return next(); }

    const tests = await student.getTests();
    res.json(tests);
  } catch (err) {
    next(err);
  }
});

router.get('/:id/mean', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student === null) { return next(); }

    const tests = await student.getTests();
    const subjects = {};
    tests.forEach(test => {
      subjects[test.subject] = subjects[test.subject] || {sum:0, count:0};
      let sum = subjects[test.subject].sum || 0;
      subjects[test.subject].sum = test.score + sum;
      subjects[test.subject].count++;
    });

    const means = Object.keys(subjects).reduce((obj, key) => {
      obj[key] = subjects[key].count !== 0 ? subjects[key].sum / subjects[key].count : 0;
      return obj;
    }, {});

    res.json(means);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const created = await Student.create(req.body);
    if (created !== null) {
      res.status(201).json(created);
    } else {
      next({success: false, error: 'Failed to create student'});
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const [numChanged, tests] = await Student.update(req.body, {
      where: {id: req.params.id}
    });
    if (numChanged > 0) {
      res.json(tests);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const numDeleted = await Student.destroy({where:{id: req.params.id}});
    if (numDeleted > 0) {
      res.status(204);
      res.end();
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});


module.exports = router;
