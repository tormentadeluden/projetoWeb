const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite", // Caminho do banco de dados SQLite
  logging: false, // Opcional: desativa logs no console
});

module.exports = sequelize;
