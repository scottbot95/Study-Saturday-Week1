const router = require('express').Router();

const student = require('./student');
const test = require('./test');

router.use('/students', student);

router.use('/tests', test);

module.exports = router;
