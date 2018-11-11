const router = require('express').Router();

const { Test } = require('../models');


const getTestById = (id) => tests.find(s => s.id === Number(id));

const getTestIndexById = (id) => tests.findIndex(s => s.id === Number(id));


router.get('/', async (req, res, next) => {
  try {
    const tests = await Test.findAll();
    res.json(tests);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const test = await Test.findById(req.params.id);
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

  const {id, ...test} = req.body;
  try {
    const created = await Test.create(test);
    if (created !== null) {
      res.status(201).json(created);
    } else {
      next({success: false, error: 'Failed to create test'});
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const [numChanged, tests] = await Test.update(req.body, {
      where: {id: req.params.id}
    });
    if (numChanged > 0) {
      res.json(tests);
    } else {
      res.status(400).json({success:false, error: 'No test with id:' + req.params.id});
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const numDeleted = await Test.destroy({where:{id:req.params.id}});
    if (numDeleted > 0) {
      res.status(204);
      res.end();
    } else {
      res.status(400).json({success:false, error: 'No test with id:' + req.params.id});
    }
  } catch (err) {
    next(err);
  }
});


module.exports = router;
