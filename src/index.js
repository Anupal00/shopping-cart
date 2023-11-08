import express from 'express';
import helmet from 'helmet';
import 'dotenv/config';
import logger from './logger/logger.js';
import userController from './controller/userController.js';
import categoryController from './controller/categoryController.js';
import productController from './controller/productController.js';
import cartController from './controller/cartController.js';
import orderController from './controller/orderController.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './config/swagger-output.json' assert { type: "json" };
import requireAuth from './middleware/authMiddleware.js';
import cookieParser from 'cookie-parser';

const app = express();

const port = process.env.PORT;

app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());


// sequelize.init();

app.use('/user', userController);
app.use('/category', requireAuth, categoryController);
app.use('/product', requireAuth, productController);
app.use('/cart', requireAuth, cartController);
app.use('/order', requireAuth, orderController);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  logger.info(`Server is running at port ${port}`);
})