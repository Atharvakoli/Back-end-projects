module.exports = (sequelize, DataTypes) => {
  const tourItems = sequelize.define(
    "tourItem",
    {
      tourId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "tours", key: "id" },
      },
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  tourItems.associate = (models) => {
    tourItems.belongsTo(models.tour, { foreignKey: "itemId" });
  };
  return tourItems;
};
