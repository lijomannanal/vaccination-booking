import executeQuery from '../config/database';
import {  GET_AVAILABLE_RESOURCES, GET_OCCUPIED_SLOTS, GET_ALL_SHIFTS,
  GET_ALL_SLOTS } from './Query';

export class SlotsRepository {
  /**
    * Function to fetch all the work schedules of the nurses
    * @function getAllWorkShifts
    */
  static getAllWorkShifts() {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const result = await executeQuery(GET_ALL_SHIFTS);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      })();
    });

  }

  /**
    * Function to fetch the available resources(nurses) count in a center for a date
    * @function getAvailableResources
    * @param {Array} queryArray 
    */
  static getAvailableResources(queryArray) {
    return new Promise((resolve, reject) => {
      (async() => {
        try {
          const result = await executeQuery(GET_AVAILABLE_RESOURCES, queryArray);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      })();

    });

  }

  /**
    * Function to fetch all available slots
    * @function getAllSlots
    * @param {Array} queryArray 
    */
  static getAllSlots(queryArray) {
    return new Promise( (resolve, reject) => {
      (async() => {
        try {
          const result = await executeQuery(GET_ALL_SLOTS, queryArray);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      })();
    
    });
    
  }

  /**
* Function to fetch all  booked slots for the date in a center
* @function getBookedSlots
* @param {Array} queryArray 
*/
  static getBookedSlots(queryArray) {
    return new Promise((resolve, reject) => {
      (async() => {
        try {
          const result = await executeQuery(GET_OCCUPIED_SLOTS, queryArray);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      })();

    });

  }


}
export default SlotsRepository;