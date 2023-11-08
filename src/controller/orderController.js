import express from 'express';
import { orderRepository } from '../repository/orderRepository.js';
import { cartRepository } from '../repository/cartRepository.js';
import logger from '../logger/logger.js';

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { userId, cartId, details } = req.body;
    const cartInfo = await cartRepository.getPending({ userId: userId });
    logger.debug(`got cartInfo : ${JSON.stringify(cartInfo)}`);
    let response;
    if (typeof cartInfo !== 'undefined' && cartInfo.id === cartId) {
      await cartRepository.update({userId: userId, cartId: cartId, type: 'completed'});
      response = await orderRepository.create({ userId: userId, cartId: cartId, details: details });
    } else {
      logger.info(`cart not found for userId : ${userId} and cartId : ${cartId}`);
      response = { "message": `cart not found for userId : ${userId} and cartId : ${cartId}` };
      throw (response);
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/update', async (req, res) => {
  const { userId, orderId, status } = req.body;
  const orderInfo = await orderRepository.get({ userId: userId, orderId: orderId });
  logger.debug(`got orderInfo : ${JSON.stringify(orderInfo)}`);
    let response;
    if (typeof orderInfo !== 'undefined' && orderInfo.id === orderId) {
      response = await orderRepository.update({ userId: userId, orderId: orderId, status: status });
    } else {
      logger.info(`order not found for userId : ${userId} and orderId : ${orderId}`);
      response = { "message": `order not found for userId : ${userId} and orderId : ${orderId}` };
      throw (response);
    }
    res.status(200).json(response);
})

router.get('/get', async (req, res) => {
  const { userId, orderId } = req.body;
  return orderRepository.get({ userId: userId, orderId: orderId })
    .then((order) => {
      res.status(200).json({ order: order })
    }).catch((error) => {
      res.status(500).json(error);
    })
});

router.get('/getAll', async (req, res) => {
  const { userId } = req.body;
  return orderRepository.getAll({ userId: userId })
    .then((order) => {
      res.status(200).json({ order: order })
    }).catch((error) => {
      res.status(500).json(error);
    })
});

export default router;