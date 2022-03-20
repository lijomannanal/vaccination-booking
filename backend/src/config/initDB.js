import mysql from 'mysql';
import * as path from 'path';
import fs from 'fs';
import 'dotenv/config';

const {
  DB_HOST = '127.0.0.1',
  DB_PORT = '3306',
  DB_SCHEMA = 'appointmentDB',
  DB_USER = 'root',
  DB_PW = 'password',
} = process.env;

class DBManager {
  constructor() {
    this.connection = mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PW,
      port: DB_PORT,
    });
    console.log('here');
    this.connection.connect((err) => {
      console.log('dfdfd');
      if (err) {
        console.log(err);
        console.log('Mysql Database connection error');
      } else {
        (async() => {
          console.log('Connected to the DB server');
          try {
            await this.createDB();
            await this.setCurrentDB();
            let queries = fs.readFileSync(path.join(__dirname, 'database/initDB.sql'), { encoding: 'UTF-8' }).split(';\n');
            for (let query of queries) {
              query = query.trim();
              if (query.length !== 0 && !query.match(/\/\*/)) {
                this.connection.query(query, function (err) {
                  if (err) {
                    console.log(`Importing failed for Mysql Database  - Query:${query}`);
                  } 
                });
              }
            }
            console.log('Database import completed successfully');
          } catch (error) {
            console.log('Database import failed!!!');
            console.log(error);
          }
  
        })();
      }
    });
  }

  createDB() {
    return new Promise((resolve, reject) => {
      this.connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_SCHEMA}`, function (err) {
        if (err) {
          console.log(`Failed to create the DB ${DB_SCHEMA}`);
          reject(err);
        } else {
          console.log(`Successfully created the DB ${DB_SCHEMA}`)
          resolve();
        }
      });
    });
  }

  setCurrentDB() {
    return new Promise((resolve, reject) => {
      this.connection.query(`USE ${DB_SCHEMA}`, function (err) {
        if (err) {
          if (err.errno == 1049) {
            console.log(`${err.sqlMessage} : Failed to connect MySql database`);
            reject('refused')
          } else {
            console.log('Mysql Database connection error');
            reject('refused')
          }
        } else {
          resolve('connected');
        }
      });
    });
  }

}

new DBManager();