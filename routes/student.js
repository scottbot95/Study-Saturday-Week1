const router = require('express').Router();

const { Student } = require('../models');


router.get('/', async (req, res, next) => {
  res.json(await Student.findAll());
});

router.get('/:id', async (req, res, next) => {
  try {
    const test = await Student.findById(req.params.id);
    if (test !== null) {
      res.json(test);
    } else {
      next();
    }
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
