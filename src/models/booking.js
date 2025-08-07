const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Booking', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'properties', key: 'id' },
      onDelete: 'CASCADE',
    },
    user_name: { type: DataTypes.STRING, allowNull: false },
    start_date: { type: DataTypes.DATEONLY, allowNull: false },
    end_date: { type: DataTypes.DATEONLY, allowNull: false },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  }, {
    tableName: 'bookings',
    timestamps: false,
  });
};
