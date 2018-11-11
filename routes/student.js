const router = require('express').Router();

const students = [{id:1, name:'Dan'}, {id:2, name:'Karen'}, {id:3, name:'George'}, {id:4, name:'Janice'}];
let nextId = 5;


const getStudentById = (id) => students.find(s => s.id === Number(id));

const getStudentIndexById = (id) => students.findIndex(s => s.id === Number(id));


router.get('/', (req, res, next) => {
  res.json(students);
});

router.get('/:id', (req, res, next) => {
  const student = getStudentById(req.params.id);
  if (student !== undefined) {
    res.json(student);
  } else {
    next();
  }
});

router.post('/', (req, res, next) => {
  const student = req.body;
  student.id = nextId++;
  students.push(student);
  res.status(201).json({success:true, student});
});

router.put('/:id', (req, res, next) => {
  const idx = getStudentIndexById(req.params.id);
  if (idx !== -1) {
    students[idx].name = req.body.name;
    res.json(students[idx]);
  } else {
    res.status(400).json({success:false, error: 'No student with id:' + req.params.id});
  }
});

router.delete('/:id', (req, res, next) => {
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
