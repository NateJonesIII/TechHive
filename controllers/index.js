const router = require('express').Router();

//routes implementation 
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const dashboardRoutes = require('./dashboardRoutes.js');

//url for router to utilize
router.use('/', homeRoutes);

router.use('/api', apiRoutes);

router.use('/dashboard', dashboardRoutes);


module.exports = router;