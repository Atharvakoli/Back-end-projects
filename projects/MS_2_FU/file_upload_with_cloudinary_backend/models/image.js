module.exports = (sequelize, DataTypes) => {
  Image.init(
    {
      url: DataTypes.STRING,
      secureUrl: DataTypes.STRING,
      tags: DataTypes.STRING,
      uploadedAt: DataTypes.DATE,
      userId: DataTypes.INTEGER,
      isDeleted: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize, modelName: "Image" }
  );
  return Image;
};
