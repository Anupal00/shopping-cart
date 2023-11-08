import logger from "../logger/logger.js";
import { cartDb } from "../model/cartDb.js";

export const cartRepository = {
  create: async ({
    userId
  }) => {
    logger.info(`request to create new cart where userId : ${userId}`);
    const result =  await cartDb.create({
      userId : userId
    });
    return result;
  },

  getPending: async({
    userId,
  }) => {
    logger.info(`request to get cart for userId : ${userId}`);
    const result = await cartDb.findAll({
      where: {
        userId: userId,
        type: 'pending',
      }
    });
    return result[0];
  },

  update: async({
    userId,
    cartId,
    type
  }) => {
    logger.info(`request to update cart where id : ${cartId}, userId: ${userId} and type: ${type}`);
    const result = await cartDb.upsert({
      id: cartId,
      userId: userId,
      type: type
    })
    return result;
  }
}