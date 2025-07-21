const express = require('express');
const { getUserProfile, updateProfile, updateUsername } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/:username', getUserProfile);
router.put('/profile', auth, updateProfile);
router.put('/username', auth, updateUsername);

module.exports = router;