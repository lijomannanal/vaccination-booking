import Express from 'express';
import AppointmentController from '../controllers/AppointmentController';


const router = Express.Router();

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary:  API to all the appointments
 *     description: API to all the appointments
 *     tags:
 *       - Appointment
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/appointmentInfo'  
 *       400:
 *         description: Invalid input
 *         schema: 
 *           $ref: '#/definitions/invalidInputError' 
 *       500:
 *         description: Internal Server Error
 *         schema: 
 *           $ref: '#/definitions/serverError'
 */ 
router.get('/', AppointmentController.getAllAppointments);


/**
 * @swagger
 * /appointments/createBooking:
 *   post:
 *     summary:  API to create appointment
 *     description: API create appointment
 *     tags:
 *       - Appointment
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Input
 *         description: Appointment details
 *         in: body
 *         type: object
 *         properties: 
 *           fullname:
 *             type: string
 *             example: John
 *           nric:
 *             type: string
 *             example: G45354535
 *           selectedCenter:
 *             type: int
 *             example: 1
 *           selectedDate:
 *             type: string
 *             example: 2022-03-20
 *           selectedSlot:
 *             type: int
 *             example: 2
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Invalid input
 *         schema: 
 *           $ref: '#/definitions/invalidInputError' 
 *       500:
 *         description: Internal Server Error
 *         schema: 
 *           $ref: '#/definitions/serverError'  
         
    */ 
router.post('/createBooking', AppointmentController.createAppointment);

/**
 * @swagger
 * /appointments/{apptId}:
 *   get:
 *     summary:  API to get appointment details
 *     description: API to get appointment details
 *     tags:
 *       - Appointment
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: apptId
 *         description: Appointment Id
 *         in: path
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Invalid input
 *         schema: 
 *           $ref: '#/definitions/invalidInputError' 
 *       500:
 *         description: Internal Server Error
 *         schema: 
 *           $ref: '#/definitions/serverError'         
 */ 
router.get('/:apptId', AppointmentController.getAppointmentInfo);

/**
 * @swagger
 * /appointments/{apptId}:
 *   put:
 *     summary:  API to update appointment details
 *     description: API to update appointment details
 *     tags:
 *       - Appointment
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: apptId
 *         description: Appointment Id
 *         in: path
 *         type: string
 *       - name: Input
 *         description: Appointment details
 *         in: body
 *         type: object
 *         properties: 
 *           fullname:
 *             type: string
 *             example: John
 *           nric:
 *             type: string
 *             example: G45354535
 *           selectedCenter:
 *             type: int
 *             example: 1
 *           selectedDate:
 *             type: string
 *             example: 2022-03-20
 *           selectedSlot:
 *             type: int
 *             example: 2
 *     responses:
 *       201:
 *         description: Updated
 *       400:
 *         description: Invalid input
 *         schema: 
 *           $ref: '#/definitions/invalidInputError' 
 *       500:
 *         description: Internal Server Error
 *         schema: 
 *           $ref: '#/definitions/serverError'         
 */ 
router.put('/:apptId', AppointmentController.updateAppointmentInfo);

/**
 * @swagger
 * /appointments/{apptId}:
 *   delete:
 *     summary:  API to delete appointment details
 *     description: API to delete appointment details
 *     tags:
 *       - Appointment
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: apptId
 *         description: Appointment Id
 *         in: path
 *         type: string
 *     responses:
 *       200:
 *         description: Deleted
 *       400:
 *         description: Invalid input
 *         schema: 
 *           $ref: '#/definitions/invalidInputError' 
 *       500:
 *         description: Internal Server Error
 *         schema: 
 *           $ref: '#/definitions/serverError'         
 */

router.delete('/:apptId', AppointmentController.deleteAppointmentInfo);

export default router;

/**
 * @swagger
 *  definitions:
 *      appointmentInfo:
 *        type: object
 *        properties: 
 *          apptId:
 *            type: int
 *            example: 1
 *          residentName:
 *            type: string
 *            example: John
 *          centerName:
 *            type: string
 *            example: Bukit Timah CC
 *          date:
 *            type: string
 *            example: 2022-03-19T16:00:00.000Z
 *          slot:
 *            type: string
 *            example: 16:45
 *      serverError:
 *        type: object
 *        properties: 
 *          errorCode:
 *            type: integer
 *            example: 99
 *          message:
 *            type: string
 *            example: Internal Server Error
 *      invalidInputError:
 *        type: object
 *        properties: 
 *          errorCode:
 *            type: integer
 *            example: 215
 *          message:
 *            type: string
 *            example: Invalid input!
 */




