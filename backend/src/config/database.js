const mysql = require('mysql');

const {
  DB_HOST = '127.0.0.1',
  DB_PORT = '3306',
  DB_SCHEMA = 'demodb',
  DB_USER = 'root',
  DB_PW = 'password',
  DB_CONNECTION_LIMIT = '5'
} = process.env;

const pool = mysql.createPool({
  host: DB_HOST, 
  port: Number(DB_PORT),
  user: DB_USER, 
  password: DB_PW,
  database: DB_SCHEMA,
  connectionLimit: DB_CONNECTION_LIMIT
});

const executeQuery = (sql, inputArray = []) => {
  return new Promise(function(resolve,reject){
    pool.getConnection((err,connection) => {
      if(err) {
        reject(err);
      } else {
        if(connection) {
          connection.query(sql, inputArray, (error, results) => {
            connection.release();
            if (error) {
              reject(error);
            } 
            resolve(results)
          });
        }
      }
    });
  });
}
// const getConnection = () => {
//   console.log('calling every time');
//   return new Promise(function(resolve,reject){
//     try {
//       pool.getConnection(function(err, connection) {
//         resolve(connection);
//       });

//     } catch (error) {
//       reject(error)
//     }
//   });
// }
export default executeQuery;
