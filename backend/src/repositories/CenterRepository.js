import executeQuery from '../config/database';
import { GET_ALL_CENTERS } from './Query';

export class CenterRepository {

  /**
    * Function to get all vaccine centers
    * @function getAllCenters
    */
  static getAllCenters ()  {
    return new Promise((resolve, reject) => {
      (async() => {
        try {
          const result = await executeQuery(GET_ALL_CENTERS);
          resolve(result);
        } catch(error) {
          reject(error);
        } 
      })();

    });

  }
}
export default CenterRepository;