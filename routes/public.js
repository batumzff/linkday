const express = require('express');
const { incrementClick } = require('../controllers/linkController');

const router = express.Router();

/**
 * @swagger
 * /api/click/{linkId}:
 *   post:
 *     summary: Record a click on a link and get redirect URL
 *     tags: [Public]
 *     parameters:
 *       - in: path
 *         name: linkId
 *         required: true
 *         schema:
 *           type: string
 *         description: Link ID to track click
 *         example: 64f1b2c3e4b0c5d6e7f8g9h0
 *     responses:
 *       200:
 *         description: Click recorded successfully
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
 *                   example: Click recorded
 *                 redirectUrl:
 *                   type: string
 *                   format: uri
 *                   example: https://johndoe.dev
 *       404:
 *         description: Link not found or inactive
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/click/:linkId', incrementClick);

module.exports = router;