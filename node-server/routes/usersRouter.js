const Router = require('express');
const router = new Router()
const usersController = require('../controllers/userController')
const checkRole = require('../middleware/checkRoleMiddleware')

// для того чтобы тут не писать всю логику, мы ее перенесли в controllers
router.post('/registration', checkRole('ADMIN'), usersController.registration)
router.post('/login', usersController.login)
router.get('/all_users', checkRole('ADMIN'), usersController.all_users)
router.post('/get_one_user', checkRole('ADMIN'), usersController.get_one_user)
router.get('/auth', checkRole('ADMIN'), usersController.check)
router.get('/:login', usersController.checkMyRole)
router.get('/checkId/:login', usersController.checkMyId)


module.exports = router