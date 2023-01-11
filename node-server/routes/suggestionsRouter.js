const Router = require('express');
const router = new Router()
const suggestionsController = require('../controllers/suggestionsController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/post_suggestions', suggestionsController.post_suggestions)
router.post('/all_suggestions', checkRole('ADMIN'), suggestionsController.all_suggestions)
router.post('/get_selected_suggestions', checkRole('ADMIN'), suggestionsController.get_selected_suggestions)
router.get('/all_suggestions_for_user/:userId', suggestionsController.all_suggestions_for_user)
router.get('/all_suggestions_accepted_for_user/:userId', suggestionsController.all_suggestions_accepted_for_user)
router.get('/:id', suggestionsController.getOne)

module.exports = router