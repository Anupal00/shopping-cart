import logger from "../logger/logger.js";
import { cartProductDb } from "../model/cartProductDb.js";
import { productDb } from "../model/productDb.js";

export const cartProductRepository = {
  create: async ({
    cartId,
    productId,
    quantity
  }) => {
    logger.info(`request to create a entry of cartProduct where cartId : ${cartId} and productId : ${productId}`);

    const result = await cartProductDb.create({
      cartId: cartId,
      productId: productId,
      quantity: quantity
    });
    return result;
  },
  
  update: async({
    id,
    cartId,
    productId,
    quantity
  }) => {
    logger.info(`request to create a entry of cartProduct where cartId : ${cartId} and productId : ${productId}`);

    const result = await cartProductDb.upsert({
      id: id,
      cartId: cartId,
      productId: productId,
      quantity: quantity
    });
    return result;
  },

  get: async({
    cartId
  }) => {
    logger.info(`reqest to get cart info where cartId : ${cartId}`);
    const result = await cartProductDb.findAll({
      where: {
        cartId: cartId
      }
    })
    return result;
  },

  delete: async({
    id,
    cartId,
    productId
  }) => {
    logger.info(`request to delete an entry from cartProduct where cartId: ${cartId} and productId: ${productId}`);
    const result = await cartProductDb.destroy({
      where: {
        id: id,
        cartId: cartId,
        productId: productId
      }
    })
  }

}