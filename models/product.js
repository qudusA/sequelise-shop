// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

// module.exports = Product;

const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Product = sequelize.define(
  "product",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    imageUrl: {
      type: Sequelize.STRING(14000),
      allowNull: false,
    },

    price: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },

    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    tit: {
      type: Sequelize.VIRTUAL,
      get() {
        return `${this.price} ${this.title}`;
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Product;
