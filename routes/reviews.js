const { Router } = require('express');
const { create, listAll, listForTarget, adminList, update, remove } = require('../controllers/reviewController');
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken');
const requireAdmin = require('../middleware/requireAdmin');

const router = Router();

router.get('/all', listAll);
router.get('/admin', verifyFirebaseToken, requireAdmin, adminList);
router.get('/:targetType/:targetId', listForTarget);
router.post('/', verifyFirebaseToken, create);
router.put('/:id', verifyFirebaseToken, requireAdmin, update);
router.delete('/:id', verifyFirebaseToken, requireAdmin, remove);

module.exports = router;
