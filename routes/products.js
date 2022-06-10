const router = require('express').Router();
const controller = require('../controllers/products');
router.get('/products', controller.selectAll);
router.patch('/products/:id', controller.patch);
router.post('/products', controller.insert);
router.put('/products/:id', controller.delete);
router.delete('/products/:id', controller.delete);

module.exports = router;