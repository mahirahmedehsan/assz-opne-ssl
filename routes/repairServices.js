const { Router } = require('express');
const { list, create, update, remove } = require('../controllers/repairServiceController');
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken');
const requireAdmin = require('../middleware/requireAdmin');

const router = Router();

router.get('/', list);
router.post('/', verifyFirebaseToken, requireAdmin, create);
router.put('/:id', verifyFirebaseToken, requireAdmin, update);
router.delete('/:id', verifyFirebaseToken, requireAdmin, remove);

module.exports = router;
