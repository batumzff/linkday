const express = require('express');
const { incrementClick } = require('../controllers/linkController');

const router = express.Router();

router.post('/click/:linkId', incrementClick);

module.exports = router;