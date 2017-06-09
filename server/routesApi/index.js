/*
 * GET home page.
 */

const express = require('express');

const userRoutes = require('./user');
const testRoutes = require('./test');
const jobsRoutes = require('./jobs');
const solveTestRoutes = require('./solveTest');
const testAnswersRoutes = require('./testAnswers');
const router = express.Router();
router.get('', function (request, response) {
    response.json({message: 'Welcome in API!!!'});
});
router.use('/users', userRoutes);
router.use('/tests', testRoutes);
router.use('/jobs', jobsRoutes);
router.use('/solveTest', solveTestRoutes);
router.use('/testAnswers', testAnswersRoutes);

module.exports = router;

