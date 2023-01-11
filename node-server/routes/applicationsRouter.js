const Router = require('express');
const router = new Router()
const applicationsController = require('../controllers/applicationsController')
const checkRole = require('../middleware/checkRoleMiddleware')
const auth = require('../middleware/authMiddleware')


router.post('/post_application', checkRole('ADMIN'), applicationsController.post_application)
router.post('/update_application_status', checkRole('ADMIN'), applicationsController.update_application_status)
router.post('/all_applications', auth, applicationsController.all_application)
router.get('/:id',applicationsController.getOne)

module.exports = router