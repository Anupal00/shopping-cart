import DataTypes from "sequelize";
import { sequalizeInstance } from "../config/mysqlConnection.js";
import { categoryDb } from "./categoryDb.js";

export const productDb = await sequalizeInstance.define("Product", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  available: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  categoryId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: categoryDb,
      key: 'id'
    }
  }
}).sync();

