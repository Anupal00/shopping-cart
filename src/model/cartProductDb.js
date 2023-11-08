import DataTypes from "sequelize";
import { sequalizeInstance } from "../config/mysqlConnection.js";
import { productDb } from "./productDb.js";
import { cartDb } from "./cartDb.js";

export const cartProductDb = await sequalizeInstance.define("CartProduct", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  cartId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: cartDb,
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: productDb,
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}).sync();

productDb.belongsToMany(cartDb, {
  through: cartProductDb,
  foreignKey: 'productId'
});

cartDb.belongsToMany(productDb, {
  through: cartProductDb,
  foreignKey: 'cartId'
});