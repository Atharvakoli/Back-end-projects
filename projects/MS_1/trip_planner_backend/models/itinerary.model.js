module.exports = (sequelize, DataTypes) => {
  const itinerary = sequelize.define(
    "itinerary",
    {
      name: DataTypes.STRING,
    },
    { timestamps: true }
  );
  itinerary.associate = (models) => {
    // establishing a one to many relationship => Where each itinerary can have multiple itinerary items
    // which data to connect with => {foriegnKey: "itineraryId"}
    itinerary.hasMany(models.itineraryItem, { foreignKey: "itineraryId" });
  };

  return itinerary;
};
