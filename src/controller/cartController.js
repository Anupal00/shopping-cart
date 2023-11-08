import express from 'express';
import { cartRepository } from "../repository/cartRepository.js";
import { cartProductRepository } from "../repository/cartProductRepository.js";
import logger from '../logger/logger.js';

const router = express.Router();

router.post('/addProduct', async (req, res) => {
  try {
    const { userId, cartId, product: { id, quantity } } = req.body;
    const cartInfo = await cartRepository.getPending({ userId: userId });
    logger.info(`got cartInfo : ${JSON.stringify(cartInfo)}`);
    let response;
    if (typeof cartInfo !== 'undefined' && cartInfo.id === cartId) {
      response = await cartProductRepository.create({ cartId: cartId, productId: id, quantity: quantity })
    } else {
      logger.info(`creating a new cart for user : ${userId}`);
      const cart = await cartRepository.create({ userId: userId });
      response = await cartProductRepository.create({ cartId: cart.id, productId: id, quantity: quantity })
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
})

router.get('/getProduct', async(req, res) => {
  try {
    const {userId, cartId} = req.body;
    const cartInfo = await cartRepository.getPending({ userId: userId });
    logger.info(`got cartInfo : ${JSON.stringify(cartInfo)}`);
    let response;
    if (typeof cartInfo !== 'undefined' && cartInfo.id === cartId) {
      response = await cartProductRepository.get({ cartId: cartId })
    } else {
      logger.info(`cart not found for userId : ${userId} and cartId : ${cartId}`);
      response = {"message" : `cart not found for userId : ${userId} and cartId : ${cartId}`};
      throw(response);
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
})

router.delete('/removeProduct', async(req, res) => {
  try {
    const {userId, cartId, productId } = req.body;
    const cartInfo = await cartRepository.getPending({ userId: userId });
    logger.info(`got cartInfo : ${JSON.stringify(cartInfo)}`);
    let response;
    if (typeof cartInfo !== 'undefined' && cartInfo.id === cartId) {
      response = await cartProductRepository.delete({ cartId: cartId, productId: productId });
    } else {
      logger.info(`cart not found for userId : ${userId} and cartId : ${cartId}`);
      response = {"message" : `cart not found for userId : ${userId} and cartId : ${cartId}`};
      throw(response);
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
})

router.post('/create', (req, res) => {
  const { userId } = req.body;
  return cartRepository.create({ userId: userId })
    .then((cart) => {
      res.status(200).json({ cart: cart })
    }).catch((error) => {
      res.status(500).json(error)
    });
})

router.get('/get', (req, res) => {
  const { userId } = req.body;
  return cartRepository.getPending({ userId: userId })
    .then((cart) => {
      res.status(200).json({ cart: cart })
    }).catch((error) => {
      res.status(500).json(error)
    });
})

export default router;