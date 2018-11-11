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
      next({success: false, error: 'Failed to create test'});
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  const idx = getStudentIndexById(req.params.id);
  if (idx !== -1) {
    const {id, ...student} = req.body;
    student.id = req.params.id;
    students[idx] = student;
    res.json(students[idx]);
  } else {
    res.status(400).json({success:false, error: 'No student with id:' + req.params.id});
  }
});

router.delete('/:id', async (req, res, next) => {
  const idx = getStudentIndexById(req.params.id);
  if (idx !== -1) {
    students.splice(idx, 1);
    res.status(204);
    res.end();
  } else {
    res.status(400).json({success:false, error: 'No student with id:' + req.params.id});
  }
});


module.exports = router;
