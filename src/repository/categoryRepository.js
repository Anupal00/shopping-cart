import { categoryDb } from "../model/categoryDb.js";
import logger from "../logger/logger.js";

export const categoryRepository = {
  create: async ({
    details,
    type
  }) => {
    logger.info(`request to create a new category where details : ${details}, type : ${type}`);
    const result = await categoryDb.create({
      details: details,
      type: type
    });
    return result;
  },

  update: async ({
    id,
    details,
    type
  }) => {
    logger.info(`request to update a category where id : ${id}, details : ${details}, type : ${type}`);
    const result = await categoryDb.upsert({
      id: id,
      details: details,
      type: type
    });
    return result;
  },

  get: async ({
    id
  }) => {
    logger.info(`request to find a category where id: ${id}`);
    const result = await categoryDb.findAll({
      where: {
        id: id
      }
    });
    return result;
  },

  delete: async ({
    id
  }) => {
    logger.info(`request to delete a category where id: ${id}`);
    const result = await categoryDb.destroy({
      where: {
        id: id
      }
    });
    return result;
  },
}