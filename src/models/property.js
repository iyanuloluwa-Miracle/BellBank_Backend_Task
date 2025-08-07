const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Property', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price_per_night: { type: DataTypes.FLOAT, allowNull: false },
    available_from: { type: DataTypes.DATEONLY, allowNull: false },
    available_to: { type: DataTypes.DATEONLY, allowNull: false },
  }, {
    tableName: 'properties',
    timestamps: false,
  });
};
