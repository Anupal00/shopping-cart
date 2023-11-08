import express from 'express';
import { productRepository } from '../repository/productRepository.js';
const router = express.Router();

router.post('/create', async (req, res) => {
	const { title, price, description, available, categoryId } = req.body;
  return productRepository.create({title, price, description, available, categoryId})
  .then((product) => {
    res.status(200).json({product : product})
  }).catch((error) => {
    res.status(500).json(error);
  })
})

router.get('/get/:id', async (req, res) => {
	const id = req.params?.id;
  return productRepository.get({id})
  .then((product) => {
    res.status(200).json({product : product})
  }).catch((error) => {
    res.status(500).json(error);
  })
})

router.put('/update', async (req, res) => {
	const {id, title, price, description, available, categoryId } = req.body;
  return productRepository.update({id, title, price, description, available, categoryId})
  .then((product) => {
    res.status(200).json({product : product})
  }).catch((error) => {
    res.status(500).json(error);
  })
})

router.delete('/delete/:id', async (req, res) => {
  const id = req.params?.id;
  return productRepository.delete({id})
  .then(() => {
    res.status(202)
  }).catch((error) => {
    res.status(500).json(error);
  })
})

export default router;