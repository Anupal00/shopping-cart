import express from 'express';
import { categoryRepository } from '../repository/categoryRepository.js';
const router = express.Router();

router.post('/create', async (req, res) => {
	const {details, type} = req.body;
  return categoryRepository.create({details, type})
  .then((category) => {
    res.status(200).json({category : category})
  }).catch((error) => {
    res.status(500).json(error);
  })
})

router.get('/get/:id', async (req, res) => {
	const id = req.params?.id;
  return categoryRepository.get({id})
  .then((category) => {
    res.status(200).json({category : category})
  }).catch((error) => {
    res.status(500).json(error);
  })
})

router.put('/update', async (req, res) => {
	const {id, details, type} = req.body;
  return categoryRepository.update({id, details, type})
  .then((updatedDate) => {
    res.status(200).json({user : updatedDate})
  }).catch((error) => {
    res.status(500).json(error);
  })
})

router.delete('/delete/:id', async (req, res) => {
  const id = req.params?.id;
  return categoryRepository.delete({id})
  .then(() => {
    res.status(202)
  }).catch((error) => {
    res.status(500).json(error);
  })
})

export default router;