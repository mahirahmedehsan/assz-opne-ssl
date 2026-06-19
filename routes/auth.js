const { Router } = require('express');
const { syncUser } = require('../controllers/authController');
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken');

const router = Router();
router.post('/sync', verifyFirebaseToken, syncUser);

module.exports = router;
