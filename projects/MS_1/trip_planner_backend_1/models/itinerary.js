module.exports = (sequelize, DataTypes) => {
  const itinerary = sequelize.define(
    "itinerary",
    {
      name: DataTypes.STRING,
    },
    {
      timestamps: true,
    }
  );
  // model association
  // to connect to which data we use foreignKey
  // we should define the itineraryId in itineraryItem model
  itinerary.associate = (models) => {
    itinerary.hasMany(models.itineraryItem, {
      foreignKey: "itineraryId",
    });
  };

  return itinerary;
};
