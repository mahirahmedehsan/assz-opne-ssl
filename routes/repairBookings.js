const { Router } = require('express');
const { create, createGuest, track, adminList, update } = require('../controllers/repairBookingController');
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken');
const optionalAuth = require('../middleware/optionalAuth');
const requireAdmin = require('../middleware/requireAdmin');

const router = Router();

router.post('/guest', createGuest);
router.post('/', optionalAuth, create);
router.get('/admin', verifyFirebaseToken, requireAdmin, adminList);
router.get('/:ticketId', track);
router.put('/:id', verifyFirebaseToken, requireAdmin, update);

module.exports = router;
