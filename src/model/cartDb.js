import DataTypes from "sequelize";
import { sequalizeInstance } from "../config/mysqlConnection.js";
import { userDb } from "./userDb.js";

export const cartDb = await sequalizeInstance.define("Cart", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  type: {
    type: DataTypes.ENUM('pending', 'completed'),
    defaultValue: 'pending',
  },
  userId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: userDb,
      key: 'id'
    }
   }
}).sync();

