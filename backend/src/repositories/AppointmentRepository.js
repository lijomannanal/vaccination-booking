import  executeQuery  from '../config/database';
import { ADD_RESIDENT, GET_USER_APPOINTMENT, CREATE_APPOINTMENT,
  GET_ALL_APPOINTMENTS, GET_APPOINTMENT_INFO, UPDATE_RESIDENT, UPDATE_APPOINTMENT,
  DELETE_RESIDENT, DELETE_APPOINTMENT } from './Query';

export class AppointmentRepository {

  /**
    * Function to add resident
    * @function addResident
    * @param {Array} inputArray resident info 
    */
  static async addResident (inputArray)  {
    return new Promise((resolve, reject) => {
      (async() => {
        try {
          const result = await executeQuery(ADD_RESIDENT, inputArray);
          resolve(result);
        } catch(error) {
          reject(error);
        }
      })();

    });
  }

  /**
    * Function to update resident details
    * @function updateResident
    * @param {Array} inputArray resident info 
    */
  static async updateResident (inputArray)  {
    return new Promise((resolve, reject) => {
      (async() => {
        try {
          const result = await executeQuery(UPDATE_RESIDENT, inputArray);
          resolve(result);
        } catch(error) {
          reject(error);
        }
      })();

    });
  }
  /**
    * Function to create appointment
    * @function createAppointment
    * @param {Array} inputArray appointment info 
    */
  static async createAppointment (inputArray)  {
    return new Promise((resolve, reject) => {
      (async() => {
        try {
          const result = await executeQuery(CREATE_APPOINTMENT, inputArray);
          resolve(result);
        } catch(error) {
          reject(error);
        }
      })();

    });
  } 

  /**
    * Function to update appointment
    * @function updateAppointment
    * @param {Array} inputArray appointment info 
    */
  static async updateAppointment (inputArray)  {
    return new Promise((resolve, reject) => {
      (async() => {
        try {
          const result = await executeQuery(UPDATE_APPOINTMENT, inputArray);
          resolve(result);
        } catch(error) {
          reject(error);
        }
      })();

    });
  } 

  /**
    * Function to check if the appointment already exist for the user
    * @function checkUserAppointmentExists
    * @param {String} nric NRIC of the resident 
    * @param {String} apptId Appointment id
    */
  static checkUserAppointmentExists (nric, apptId = 0 )  {
    return new Promise((resolve, reject) => {
      (async() => {
        try {
          const result = await executeQuery(GET_USER_APPOINTMENT, [nric, apptId]);
          resolve(result);
        } catch(error) {
          reject(error);
        }
      })();

    });

  } 


  /**
    * Function to get all appointments
    * @function getAllAppointments
    */
  static getAllAppointments ()  {
    return new Promise((resolve, reject) => {
      (async() => {
        try {
          const res = await executeQuery(GET_ALL_APPOINTMENTS);
          resolve(res);
        } catch(error) {
          reject(error);
        }
      })();

    });

  } 


  /**
    * Function to get the appointment by booking id
    * @function fetchAppointmentInfo
    * @param {Number} bookingId 
    */
  static fetchAppointmentInfo (bookingId)  {
    return new Promise((resolve, reject) => {
      (async() => {
        try {
          const result = await executeQuery(GET_APPOINTMENT_INFO, [ bookingId ]);
          resolve(result);
        } catch(error) {
          reject(error);
        }
      })();

    });

  } 

  /**
    * Function to delete resident
    * @function deleteResident
    * @param {Number} id
    */
  static deleteResident (id)  {
    return new Promise((resolve, reject) => {
      (async() => {
        try {
          const result = await executeQuery(DELETE_RESIDENT, [ id ]);
          resolve(result);
        } catch(error) {
          reject(error);
        }
      })();

    });

  }
    
  /**
    * Function to delete appointment
    * @function deleteAppointent
    * @param {Number} id
    */
  static deleteAppointent (id)  {
    return new Promise((resolve, reject) => {
      (async() => {
        try {
          const result = await executeQuery(DELETE_APPOINTMENT, [ id ]);
          resolve(result);
        } catch(error) {
          reject(error);
        }
      })();

    });

  }

}
export default AppointmentRepository;