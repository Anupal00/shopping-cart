import DataTypes from "sequelize";
import { sequalizeInstance } from "../config/mysqlConnection.js";
import { cartDb } from "./cartDb.js";
import { userDb } from "./userDb.js";

export const orderDb = await sequalizeInstance.define("Order", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  details: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('placed', 'delivered', 'cancelled'),
    defaultValue: 'placed'
  },
  cartId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: cartDb,
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: userDb,
      key: 'id'
    }
  },
}).sync();