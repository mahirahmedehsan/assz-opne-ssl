const { Router } = require('express');
const {
  listFeatured, listAll, adminList,
  create, update, remove, reorder,
} = require('../controllers/socialMediaController');
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken');
const requireAdmin = require('../middleware/requireAdmin');

const router = Router();

router.get('/featured', listFeatured);
router.get('/', listAll);
router.get('/admin', verifyFirebaseToken, requireAdmin, adminList);
router.post('/', verifyFirebaseToken, requireAdmin, create);
router.put('/reorder', verifyFirebaseToken, requireAdmin, reorder);
router.put('/:id', verifyFirebaseToken, requireAdmin, update);
router.delete('/:id', verifyFirebaseToken, requireAdmin, remove);

module.exports = router;
