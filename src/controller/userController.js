import express from 'express';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repository/userRepository.js';
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  if (! await userRepository.existByEmail({ email })) {
    return userRepository.create({ firstName, lastName, email, password, phone })
      .then((user) => {
        const token = createToken(user.id, user.email);
        res.cookie('jwt', token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
        res.status(200).json({ userName: email })
      }).catch((error) => {
        res.status(500).json(error);
      })
  } else {
    res.status(400).json({ 'message': `email is already exist ${email}` });
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const ifUserExist = await userRepository.existByEmail({email});
    if(! ifUserExist) {
      throw({'message': 'Email not found'})
    }
    const user = await userRepository.findByEmail({email});
    if(user.password !== password) {
      throw({'message': 'Incorrect password'})
    }
    const token = createToken(user.id, user.email);
    res.cookie('jwt', token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
    res.status(200).json({ userName: email })
  } catch(error) {
    res.status(400).json(error);
  }
})

router.get('/get/:id', async (req, res) => {
  const id = req.params?.id;
  return userRepository.get({ id })
    .then((userData) => {
      res.status(200).json({ user: userData })
    }).catch((error) => {
      res.status(500).json(error);
    })
})

router.put('/update', async (req, res) => {
  const { id, firstName, lastName, phone, password } = req.body;
  return userRepository.update({ id, firstName, lastName, password, phone })
    .then((updatedDate) => {
      res.status(200).json({ user: updatedDate })
    }).catch((error) => {
      res.status(500).json(error);
    })
})

router.delete('/delete/:id', async (req, res) => {
  const id = req.params?.id;
  return userRepository.delete({ id })
    .then(() => {
      res.status(202)
    }).catch((error) => {
      res.status(500).json(error);
    })
})

export default router;

const MAX_AGE = 3 * 24 * 60 * 60;
const jwtSecret = process.env.JWT_SECRET;
const createToken = (id, email) => {
  return jwt.sign({ id, email }, jwtSecret, {
    expiresIn: MAX_AGE,
    algorithm: 'HS512'
  });
}