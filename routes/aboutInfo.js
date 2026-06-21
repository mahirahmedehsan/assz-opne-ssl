const { Router } = require('express');
const { get, update } = require('../controllers/aboutInfoController');
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken');
const requireAdmin = require('../middleware/requireAdmin');

const router = Router();

router.get('/', get);
router.put('/', verifyFirebaseToken, requireAdmin, update);

module.exports = router;
