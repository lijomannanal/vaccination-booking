import moment from 'moment';
import Logger from '../config/logger';
import ErrorBase from '../errors/ErrorBase';
import ErrorCodes from '../errors/ErrorCodes';
import AppointmentRepository from '../repositories/AppointmentRepository';
const LOG = new Logger('AppointmentController.js');

class AppointmentController {

  /**
   * Function to create appointments
   * @function createAppointment
   * @param {Object} req - ExpressJS req
   * @param {Object} res - ExpressJS res
   * @param {requestCallback} next - Callback that handles request
   */

  static async createAppointment (req, res, next)  {
    try {
      const { nric, fullname, selectedCenter, selectedDate, selectedSlot, selectedTime } = req.body;
      const apptInfo = await AppointmentRepository.checkUserAppointmentExists(nric);
      if (apptInfo && apptInfo.length) {
        throw new ErrorBase('An appointment already exists for this user NRIC', ErrorCodes.INVALID_INPUT, 400);
      }

      const bookedTime = new Date(`${selectedDate} ${selectedTime}`);
      if (moment(bookedTime,'HH:mm').isBefore(moment(new Date(),'HH:mm'), 'minutes')) {
        throw new ErrorBase('You cannot book appointment with past timeslots', ErrorCodes.INVALID_INPUT, 400);
      }
    
      const input = [ nric, fullname];
      const { insertId: residentId } = await AppointmentRepository.addResident(input);
      const now = new Date();
      const apptInput = [selectedDate, residentId, selectedCenter, selectedSlot, now, now];
      await AppointmentRepository.createAppointment(apptInput);
      return res.sendStatus(201);
    } catch (error) {
      LOG.error(error);
      next(error);
    }

  }

  /**
   * Function to get all appointments
   * @function getAllAppointments
   * @param {Object} req - ExpressJS req
   * @param {Object} res - ExpressJS res
   * @param {requestCallback} next - Callback that handles request
   */
  static async getAllAppointments  (req, res, next) {
    try {
      LOG.info('Requesting all the appointments');
      let result = await AppointmentRepository.getAllAppointments();
      result = result.map(item => {
        const slot = item.slot.split(':').slice(0,2).join(':');
        return { ...item, slot}});
      return res.json(result);
    } catch (error) {
      LOG.error(error);
      next(error);
    }
  }

  /**
   * Function to get appointment details by apptId
   * @function getAppointmentInfo
   * @param {Object} req - ExpressJS req
   * @param {Object} res - ExpressJS res
   * @param {requestCallback} next - Callback that handles request
   */
  static async getAppointmentInfo  (req, res, next) {
    try {
      const { apptId } = req.params;
      LOG.info(`Requesting the appointment with id: ${apptId}`);
      let result = await AppointmentRepository.fetchAppointmentInfo(apptId);
      if(result.length) {
        result = { ...result[0], selectedTime: result[0].selectedTime.split(':').slice(0,2).join(':')};
      } else {
        result = {};
      }
     
      return res.json(result);
    } catch (error) {
      LOG.error(error);
      next(error);
    }
  }

  /**
   * Function to update appointment details by apptId
   * @function updateAppointmentInfo
   * @param {Object} req - ExpressJS req
   * @param {Object} res - ExpressJS res
   * @param {requestCallback} next - Callback that handles request
   */  
  static async updateAppointmentInfo (req, res, next)  {
    try {
      const { nric, residentId, fullname, selectedCenter, selectedDate, selectedSlot, selectedTime } = req.body;
      const { apptId } = req.params;
      const apptInfo = await AppointmentRepository.checkUserAppointmentExists(nric, apptId);
      if (apptInfo && apptInfo.length) {
        throw new ErrorBase('An appointment already exists for this user NRIC', ErrorCodes.INVALID_INPUT, 400);
      }
      const bookedTime = new Date(`${selectedDate} ${selectedTime}`);
      if (moment(bookedTime,'HH:mm').isBefore(moment(new Date(),'HH:mm'), 'minutes')) {
        throw new ErrorBase('You cannot update your past booking', ErrorCodes.INVALID_INPUT, 400);
      }
      const input = [ nric, fullname, residentId ];
      await AppointmentRepository.updateResident(input);
      const now = new Date();
      const apptInput = [selectedDate, selectedCenter, selectedSlot, now, apptId];
      await AppointmentRepository.updateAppointment(apptInput);
      return res.sendStatus(201);
    } catch (error) {
      LOG.error(error);
      next(error);
    }

  }

  /**
   * Function to delete appointment details by apptId
   * @function deleteAppointmentInfo
   * @param {Object} req - ExpressJS req
   * @param {Object} res - ExpressJS res
   * @param {requestCallback} next - Callback that handles request
   */  
  static async deleteAppointmentInfo (req, res, next)  {
    try {
      const { apptId } = req.params;
      LOG.info(`Requesting to delete the appointment with id: ${apptId}`);
      const apptInfo = await AppointmentRepository.fetchAppointmentInfo(apptId);
      if (!apptInfo) {
        throw new ErrorBase('Appointment does not exist', ErrorCodes.INVALID_INPUT, 400);
      }
      const { residentId } = apptInfo[0];
      await Promise.all(
        [
          AppointmentRepository.deleteResident(residentId),
          AppointmentRepository.deleteAppointent(apptId), 
        ]
      );
      return res.sendStatus(200);
    } catch (error) {
      LOG.error(error);
      next(error);
    }

  }
}
export default AppointmentController;