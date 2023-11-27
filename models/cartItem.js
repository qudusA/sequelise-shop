const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const cartItems = sequelize.define(
  "cartProduct",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = cartItems;
