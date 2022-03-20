import CenterRepository from '../repositories/CenterRepository';
import Logger from '../config/logger';
const LOG = new Logger('CenterController.js');


class CenterController {

  /**
   * Function to get all vaccine centers
   * @function getAllCenters
   * @param {Object} req - ExpressJS req
   * @param {Object} res - ExpressJS res
   * @param {requestCallback} next - Callback that handles request
   */
  static async getAllCenters  (req, res, next) {
    try {
      LOG.info('Requesting all the vaccine centers');
      let result = await CenterRepository.getAllCenters();
      return res.json(result);
    } catch (error) {
      LOG.error(error);
      next(error);
    }
  }

}
export default CenterController;