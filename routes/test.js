const router = require('express').Router();


router.get('/', (req, res, next) => {
  res.send('get all');
});

router.get('/:id', (req, res, next) => {
  res.send('get ' + req.params.id);
});

router.post('/', (req, res, next) => {
  res.send('create');
});

router.put('/:id', (req, res, next) => {
  res.send('put ' + req.params.id);
});

router.delete('/:id', (req, res, next) => {
  res.send('delete ' + req.params.id);
});


module.exports = router;
