const { Router } = require('express');
const { create, getById, adminList, update, getMyOrders } = require('../controllers/orderController');
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken');
const optionalAuth = require('../middleware/optionalAuth');
const requireAdmin = require('../middleware/requireAdmin');

const router = Router();

router.post('/', optionalAuth, create);
router.get('/my', verifyFirebaseToken, getMyOrders);
router.get('/admin', verifyFirebaseToken, requireAdmin, adminList);
router.get('/:id', optionalAuth, getById);
router.put('/:id', verifyFirebaseToken, requireAdmin, update);

module.exports = router;
