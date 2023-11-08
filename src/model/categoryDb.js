import DataTypes from "sequelize";
import { sequalizeInstance } from "../config/mysqlConnection.js";

export const categoryDb = await sequalizeInstance.define("Category", {
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
  type: {
    type: DataTypes.STRING,
    allowNull: false
  }
}).sync();