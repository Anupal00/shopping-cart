import { productDb } from "../model/productDb.js";
import logger from "../logger/logger.js";

export const productRepository = {
  create: async ({
    title,
    price,
    description,
    available,
    categoryId
  }) => {
    logger.info(`request to create a new product where title : ${title}, price : ${price}, description : ${description}, available : ${available}, categoryId: ${categoryId}`);
    const result = await productDb.create({
      title: title,
      price: price,
      description: description,
      available: available,
      categoryId: categoryId
    });
    return result;
  },

  update: async ({
    id,
    title,
    price,
    description,
    available,
    categoryId
  }) => {
    logger.info(`request to update a product where id : ${id}, title : ${title}, price : ${price}, description : ${description}, available : ${available}, categoryId: ${categoryId}`);
    const result = await productDb.upsert({
      id: id,
      title: title,
      price: price,
      description: description,
      available: available,
      categoryId: categoryId
    });
    return result;
  },

  get: async ({
    id
  }) => {
    logger.info(`request to find a product where id: ${id}`);
    const result = await productDb.findAll({
      where: {
        id: id
      }
    });
    return result;
  },

  delete: async ({
    id
  }) => {
    logger.info(`request to delete a product where id: ${id}`);
    const result = await productDb.destroy({
      where: {
        id: id
      }
    });
    return result;
  },
}