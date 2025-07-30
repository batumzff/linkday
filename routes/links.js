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

/**
 * @swagger
 * /api/links:
 *   get:
 *     summary: Get all user links
 *     tags: [Links]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user links
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 links:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Link'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', auth, getLinks);

/**
 * @swagger
 * /api/links:
 *   post:
 *     summary: Create a new link
 *     tags: [Links]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - url
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 100
 *                 example: My Portfolio
 *               url:
 *                 type: string
 *                 format: uri
 *                 example: https://johndoe.dev
 *               description:
 *                 type: string
 *                 maxLength: 300
 *                 example: Check out my latest projects
 *               icon:
 *                 type: string
 *                 example: portfolio
 *     responses:
 *       201:
 *         description: Link created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Link created successfully
 *                 link:
 *                   $ref: '#/components/schemas/Link'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', auth, createLink);

/**
 * @swagger
 * /api/links/{id}:
 *   put:
 *     summary: Update a link
 *     tags: [Links]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Link ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 100
 *                 example: Updated Portfolio
 *               url:
 *                 type: string
 *                 format: uri
 *                 example: https://newportfolio.dev
 *               description:
 *                 type: string
 *                 maxLength: 300
 *                 example: Updated description
 *               icon:
 *                 type: string
 *                 example: new-icon
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Link updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Link updated successfully
 *                 link:
 *                   $ref: '#/components/schemas/Link'
 *       404:
 *         description: Link not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', auth, updateLink);

/**
 * @swagger
 * /api/links/{id}:
 *   delete:
 *     summary: Delete a link
 *     tags: [Links]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Link ID
 *     responses:
 *       200:
 *         description: Link deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Link deleted successfully
 *       404:
 *         description: Link not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', auth, deleteLink);

/**
 * @swagger
 * /api/links/reorder:
 *   patch:
 *     summary: Reorder links
 *     tags: [Links]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - linkIds
 *             properties:
 *               linkIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["64f1b2c3e4b0c5d6e7f8g9h0", "64f1b2c3e4b0c5d6e7f8g9h1"]
 *     responses:
 *       200:
 *         description: Links reordered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Links reordered successfully
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch('/reorder', auth, reorderLinks);

module.exports = router;