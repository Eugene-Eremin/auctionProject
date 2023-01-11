const Router = require('express');
const router = new Router()
const suggestions_acceptedsController = require('../controllers/suggestions_acceptedsController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/post_suggestions_accepteds', checkRole('ADMIN'), suggestions_acceptedsController.post_suggestions_accepteds)
router.get('/all_suggestions_accepteds', checkRole('ADMIN'), suggestions_acceptedsController.all_suggestions_accepteds)
router.get('/:id', suggestions_acceptedsController.getOne)

module.exports = router