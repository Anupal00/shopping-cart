import logger from "../logger/logger.js";
import { cartDb } from "../model/cartDb.js";
import { orderDb } from "../model/orderDb.js";

export const orderRepository = {
  create: async ({
    userId,
    cartId,
    details
  }) => {
    logger.info(`request to create a new order where userId : ${userId}, cartId: ${cartId}, details: ${details}`);
    const result = await orderDb.create({
      userId: userId,
      cartId: cartId,
      details: details
    });
    return result;
  },

  update: async ({
    userId,
    orderId,
    status
  }) => {
    logger.info(`request to update an order status where userId : ${userId}, orderId : ${orderId} and status : ${status}`);
    const result = await orderDb.upsert({
      userId: userId,
      id: orderId,
      status: status
    });
    return result;
  },

  get: async ({
    userId,
    orderId
  }) => {
    logger.info(`request to get a order where userId : ${userId} and orderId : ${orderId}`);
    const result = await orderDb.findAll({
      where: {
        id: orderId,
        userId: userId
      }
    });
    return result;
  },

  getAll: async ({
    userId
  }) => {
    logger.info(`request to get all order where userId : ${userId}`);
    const result = await orderDb.findAll({
      where: {
        userId: userId
      }
    });
    return result;
  }
}