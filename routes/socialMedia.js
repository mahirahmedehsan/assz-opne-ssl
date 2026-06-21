const express = require('express');
const router = express.Router();
const { authenticate, isAdmin } = require('../middleware/auth');
const { listFeatured, list, adminList, create, update, remove, reorder } = require('../controllers/socialMediaController');

router.get('/featured', listFeatured);
router.get('/', list);
router.get('/admin', authenticate, isAdmin, adminList);
router.post('/', authenticate, isAdmin, create);
router.put('/reorder', authenticate, isAdmin, reorder);
router.put('/:id', authenticate, isAdmin, update);
router.delete('/:id', authenticate, isAdmin, remove);

module.exports = router;
