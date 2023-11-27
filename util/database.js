const Sequelize = require("sequelize");

// const sequelize = new Sequelize('node-complete', 'root', 'nodecomplete', {
//   dialect: 'mysql',
//   host: 'localhost'
// });

const sequelize = new Sequelize(
  "node_complete",
  "root",
  process.env.DATABASE_PASS,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

// sequelize.authenticate();

module.exports = sequelize;
