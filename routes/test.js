const router = require('express').Router();

const tests = [{id:1, name:'Dan'}, {id:2, name:'Karen'}, {id:3, name:'George'}, {id:4, name:'Janice'}];
let nextId = 5;


const getTestById = (id) => tests.find(s => s.id === Number(id));

const getTestIndexById = (id) => tests.findIndex(s => s.id === Number(id));


router.get('/', (req, res, next) => {
  res.json(tests);
});

router.get('/:id', (req, res, next) => {
  const test = getTestById(req.params.id);
  if (test !== undefined) {
    res.json(test);
  } else {
    next();
  }
});

router.post('/', (req, res, next) => {
  const test = req.body;
  test.id = nextId++;
  tests.push(test);
  res.status(201).json({success:true, test});
});

router.put('/:id', (req, res, next) => {
  const idx = getTestIndexById(req.params.id);
  if (idx !== -1) {
    tests[idx].name = req.body.name;
    res.json(tests[idx]);
  } else {
    res.status(400).json({success:false, error: 'No test with id:' + req.params.id});
  }
});

router.delete('/:id', (req, res, next) => {
  const idx = getTestIndexById(req.params.id);
  if (idx !== -1) {
    tests.splice(idx, 1);
    res.status(204);
    res.end();
  } else {
    res.status(400).json({success:false, error: 'No test with id:' + req.params.id});
  }
});


module.exports = router;
