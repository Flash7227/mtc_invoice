const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  areas: {
    type: DataTypes.STRING,
    allowNull: true,
    default: JSON.stringify([])
  },
  menu:{
    type: DataTypes.STRING,
    allowNull: true,
    default: JSON.stringify([])
  }
});

module.exports = User;
