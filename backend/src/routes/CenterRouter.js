import Express from 'express';
import CenterController from '../controllers/CenterController';


const router = Express.Router();

/**
 * @swagger
 * /centers:
 *   get:
 *     summary:  API to get all vaccine centers
 *     description: API to get all vaccine centers
 *     tags:
 *       - Centers
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         schema:
 *           type: array
 *           items:
 *            $ref: '#/definitions/centerData'  
 *       400:
 *         description: Invalid input
 *         schema: 
 *           $ref: '#/definitions/invalidInputError' 
 *       500:
 *         schema: 
 *           $ref: '#/definitions/serverError'       
 */ 

 

router.get('/', CenterController.getAllCenters);

/**
 * @swagger
 *  definitions:
 *      centerData:
 *        type: object
 *        properties: 
 *          ccId:
 *            type: string
 *            example: 1
 *          name:
 *            type: string
 *            example: Bukit Timah CC
 */

export default router;





