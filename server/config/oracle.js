const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_ORACLE_DATABASE,
  process.env.DB_ORACLE_USER,
  process.env.DB_ORACLE_PASSWORD,
  {
    host: process.env.DB_ORACLE_HOST,
    dialect: "oracle"
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Oracle connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

module.exports = sequelize;
