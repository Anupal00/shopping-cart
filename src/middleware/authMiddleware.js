import jwt from 'jsonwebtoken';
import logger from '../logger/logger.js';

const secret = process.env.JWT_SECRET;

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if(token) {
    jwt.verify(token, secret, (err, decode) => {
      if(err) {
        logger.error(err);
        res.send(401).json({'message': 'Unauthorized'});
      } else {
        next();
      }
    });
  } else {
    res.send(401).json({'message': 'Unauthorized'});
  }
}

export default requireAuth;