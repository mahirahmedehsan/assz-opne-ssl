const { Router } = require('express');
const { getMe, updateMe, adminList, adminUpdateUser, adminDeleteUser, adminCreateUser } = require('../controllers/userController');
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken');
const requireAdmin = require('../middleware/requireAdmin');

const router = Router();

router.get('/me', verifyFirebaseToken, getMe);
router.put('/me', verifyFirebaseToken, updateMe);
router.get('/admin', verifyFirebaseToken, requireAdmin, adminList);
router.put('/admin/:id', verifyFirebaseToken, requireAdmin, adminUpdateUser);
router.delete('/admin/:id', verifyFirebaseToken, requireAdmin, adminDeleteUser);
router.post('/admin', verifyFirebaseToken, requireAdmin, adminCreateUser);

module.exports = router;
