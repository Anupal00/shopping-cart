import { Sequelize } from "sequelize";
import logger from "../logger/logger.js";

const host = process.env.MYSQL_HOST
const port = process.env.MYSQL_PORT
const user = process.env.MYSQL_USER
const password = process.env.MYSQL_PASSWORD
const database = process.env.MYSQL_DATABASE

const sequelize = () => {
  const sequalizeInstance = new Sequelize(
    database,
    user,
    password,
    {
      host: host,
      port: port,
      dialect: 'mysql'
    }
  );

  sequalizeInstance.authenticate().then(() => {
    logger.info('MySql Connection has been established successfully.');
  }).catch((error) => {
    logger.error('Unable to connect to the database: ', error);
  });
  return sequalizeInstance;
}

export const sequalizeInstance = sequelize();