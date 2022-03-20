import Logger from '../config/logger';
import https from 'https';

const LOG = new Logger('ApiService.js');
/**
 * Function to invoke remote API calls
 * @function remoteCall
 * @param {String} url - Url fro which data needs to be accessed
 */
export const remoteCall = async (url) => {
    return new Promise((resolve, reject) => {
    https.get(`${url}`, res => {
        let data = [];
        res.on('data', chunk => {
          data.push(chunk);
        });
        res.on('end', () => {
            try {  
                data = JSON.parse(Buffer.concat(data).toString());
            } catch(e) {
                LOG.error(`Invalid data`, JSON.stringify(e));
                reject(e);
            }
            resolve(data);
        });
      }).on('error', err => {
            LOG.error(`Response ended:`, JSON.stringify(err));
            reject(err);
      });
    });
}
