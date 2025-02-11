const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Review = sequelize.define("Review", {
  reviewerId: { type: DataTypes.INTEGER, allowNull: false },
  reviewedId: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, allowNull: false },
  comment: { type: DataTypes.TEXT },
});

module.exports = Review;
