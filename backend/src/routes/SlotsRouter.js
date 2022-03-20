import Express from 'express';
import SlotsController from '../controllers/SlotsController';


const router = Express.Router();

/**
 * @swagger
 * /slots:
 *   get:
 *     summary:  API to fetch all available slots for the day
 *     description: API to fetch all available slots for the day
 *     tags:
 *       - Centers
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: selectedDate
 *         description: date.
 *         in: query
 *         example: "2022-03-20"
 *         type: string
 *       - name: selectedCenter
 *         description: Vaccination center id.
 *         in: query
 *         example: 1
 *         type: int
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           $ref: '#/definitions/slotsData'  
 *       400:
 *         description: Invalid input
 *         schema: 
 *           $ref: '#/definitions/invalidInputError' 
 *       500:
 *         schema: 
 *           $ref: '#/definitions/serverError'       
 */ 

 

router.get('/', SlotsController.getAllAvailableSlots);

/**
 * @swagger
 *  definitions:
 *      slotsData:
 *        type: array
 *        items:
 *          type: object
 *          properties: 
 *             slotId:
 *                type: int
 *                example: 1
 *             time:
 *                type: string
 *                example: 08:00
 * 
 */

export default router;





