const express = require('express');
const router = express.Router();
const logsController = require('../controller/logs.controller.js');
const authMiddleware = require('../middleware/authMiddleware.js')

/**
 * @swagger
 * /logs:
 *   get:
 *     tags:
 *     - Logs
 *     summary: Get Logs (authentication required)
 *     description: Retrieve a list of all Logs (authentication required)
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         description: "Start date for filtering (format: YYYY-MM-DD)"
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: endDate
 *         description: "End date for filtering (format: YYYY-MM-DD)"
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: action_type_name
 *         description: "Action type name"
 *         schema:
 *           type: string
 *       - in: query
 *         name: action_status
 *         description: "Action status"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the list of all Logs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalLogs:
 *                   type: integer
 *                   example: 1
 *                 logs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       log_id:
 *                         type: integer
 *                         example: 21
 *                       action_type:
 *                         type: string
 *                         example: "updateuser"
 *                       pin:
 *                         type: string
 *                         example: "1"
 *                       citizen_id:
 *                         type: string
 *                         example: "1"
 *                       firstname:
 *                         type: string
 *                         example: "admin"
 *                       log_status:
 *                         type: string
 *                         example: "User data updated successfully id: 9"
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-12-01T20:02:16.558Z"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.get('/', authMiddleware.isAdmin, logsController.getlogs);

module.exports = router;