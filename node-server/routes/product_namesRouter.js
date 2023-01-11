const Router = require('express');
const router = new Router()
const product_namesController = require('../controllers/product_namesController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/post_product_names', checkRole('ADMIN'), product_namesController.post_product_names)
router.get('/all_product_names', product_namesController.all_product_names)
router.post('/get_one_product_name', product_namesController.getOne)


module.exports = router