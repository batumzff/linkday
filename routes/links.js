const express = require('express');
const { 
  getLinks, 
  createLink, 
  updateLink, 
  deleteLink, 
  reorderLinks, 
  incrementClick 
} = require('../controllers/linkController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getLinks);
router.post('/', auth, createLink);
router.put('/:id', auth, updateLink);
router.delete('/:id', auth, deleteLink);
router.patch('/reorder', auth, reorderLinks);

module.exports = router;