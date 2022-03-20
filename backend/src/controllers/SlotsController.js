import SlotsRepository from '../repositories/SlotsRepository';
import Logger from '../config/logger';
import moment from 'moment';
const LOG = new Logger('SlotsController.js');


class SlotsController {

  /**
   * Function to get all available slots for a date in a center
   * @function getAllAvailableSlots
   * @param {Object} req - ExpressJS req
   * @param {Object} res - ExpressJS res
   * @param {requestCallback} next - Callback that handles request
   */
  static async getAllAvailableSlots  (req, res, next) {
    try {
      const { selectedDate, selectedCenter } = req.query;
      LOG.info(`Requesting all the availabe slots at ccId ${selectedCenter} for the date ${selectedDate}`);
      if(moment(selectedDate).isBefore(moment(), 'day')) {
        return res.json([]);
      } else {
        let result = await SlotsRepository.getAllWorkShifts();
        let promises = [];
        for (const schedule of result) {
          promises.push(SlotsController.computeAvailableSlots({...schedule, selectedDate, selectedCenter} ));
        }
        let data = await Promise.all(promises);
        data = [].concat.apply([], data).map(item => ({ ...item, time: item.time.split(':').slice(0,2).join(':'), resourceCount: undefined}));
        // const ids = data.map(o => o.slotId);
        // data = data.filter(({ slotId }, index) => !ids.includes(slotId, index + 1));
        return res.json(data);
      }
    } catch (error) {
      LOG.error(error);
      next(error);
    }
  }

  static async getAllSlots(queryArray) {
    try {
      const allSlots = await SlotsRepository.getAllSlots(queryArray);
      return allSlots;
    } catch (error) {
      LOG.error(error);
      throw new Error(error);
    }
  }

  /**
   * Function to compute available slots in the vaccine center on a date 
   * based on alreday booked slots and the work schedule of the nurses
   * @function computeAvailableSlots
   * @param {Object} request - ExpressJS req
   */
  static async computeAvailableSlots  (request) {
    try {
      const { startTime, endTime, selectedDate, selectedCenter } = request;
      const selectedDay = moment(selectedDate).weekday() ? moment(selectedDate).weekday() : 7;
      const { PERSON_PER_NURSE_PER_SLOT } = process.env; // Assuming a nurse can handle 1 person per slot.
      let resourceInfo = await SlotsRepository.getAvailableResources([ selectedCenter, startTime,
        endTime, selectedDay ]);

      //Computing all the available resources based on the work day schedule
      const resourceCount = resourceInfo[0]['resourceCount'] * PERSON_PER_NURSE_PER_SLOT;
      let allSlots = await SlotsController.getAllSlots([startTime,
        endTime]);
      allSlots = allSlots.map(data => ({...data, resourceCount}));

      //Fetching all the booked slots in a center for the selected date
      const bookedSlots = await SlotsRepository.getBookedSlots([selectedDate, selectedCenter, startTime, endTime]);
      let bookedTimings = {};
      bookedSlots.forEach((slot) => {
        bookedTimings[slot['time']] = slot['bookedCount'];
      });
      allSlots = allSlots.filter((item) => {
        let freeSlot = item['resourceCount'];
        if (bookedTimings[item.time]) {
          freeSlot = freeSlot - bookedTimings[item.time];
        }
        return freeSlot > 0;
      })
      return allSlots;
    } catch (error) {
      LOG.error(error);
      throw new Error(error);
    }
  }


}
export default SlotsController;