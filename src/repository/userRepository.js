import { userDb } from "../model/userDb.js";
import logger from "../logger/logger.js";

export const userRepository = {
  create: async ({
    firstName,
    lastName,
    email,
    password,
    phone
  }) => {
    logger.info(`request to create a new user where email : ${email}, firstName : ${firstName}, lastName : ${lastName}, phone : ${phone}`);
    const result = await userDb.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone
    });
    return result;
  },

  update: async ({
    id,
    firstName,
    lastName,
    password,
    phone
  }) => {
    logger.info(`request to update a user where id : ${id}, firstName : ${firstName}, lastName : ${lastName}, phone : ${phone}`);
    const result = await userDb.upsert({
      id: id,
      firstName: firstName,
      lastName: lastName,
      password: password,
      phone: phone
    });
    return result;
  },

  get: async ({
    id
  }) => {
    logger.info(`request to find a user where id: ${id}`);
    const result = await userDb.findOne({
      where: {
        id: id
      }
    });
    return result;
  },

  delete: async ({
    id
  }) => {
    logger.info(`request to find a user where id: ${id}`);
    const result = await userDb.destroy({
      where: {
        id: id
      }
    });
    return result;
  },

  existByEmail: async ({
    email
  }) => {
    logger.info(`request to check if email id : ${email} is already exist or not`);
    const result = await userDb.findOne({
      where: {
        email: email
      }
    });
    logger.debug(`Got email user as ${JSON.stringify(result)}`);
    if (result !== null) {
      return true;
    } else {
      return false;
    }
  },

  findByEmail: async({
    email
  }) => {
    logger.info(`request to get user details from email : ${email}`);
    const result = await userDb.findOne({
      where: {
        email: email
      }
    });
    return result;
  }
}