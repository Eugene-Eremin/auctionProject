const Router = require('express');
const router = new Router();
const usersRouter = require('./usersRouter');
const applicationsRouter = require('./applicationsRouter');
const product_namesRouter = require('./product_namesRouter');
const suggestionsRouter = require('./suggestionsRouter');
const suggestions_acceptedsRouter = require('./suggestions_acceptedsRouter');

router.use('/users', usersRouter)
router.use('/applications', applicationsRouter)
router.use('/product_names', product_namesRouter)
router.use('/suggestions', suggestionsRouter)
router.use('/suggestions_accepteds', suggestions_acceptedsRouter)

module.exports = router