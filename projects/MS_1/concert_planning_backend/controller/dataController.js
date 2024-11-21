const {
  concert: concertModel,
  afterParties: afterPartiesModel,
  merchandiseStalls: merchandiseStallsModel,
  tour: tourModel,
  tourItem: tourItemModel,
} = require("../models");

const createTour = async (req, res) => {
  try {
    const { concerts, merchandiseStalls, afterParties, name } = req.body;
    const newTour = await tourModel.create({ name });

    if (concerts && concerts.length > 0) {
      for (const concert of concerts) {
        const savedConcert = await concertModel.create(concert);
        await tourItemModel.create({
          tourId: newTour.id,
          itemId: savedConcert.id,
          type: "concert",
        });
      }
    }

    if (merchandiseStalls && merchandiseStalls.length > 0) {
      for (const merchandiseStall of merchandiseStalls) {
        const savedMerchandiseStall = await merchandiseStallsModel.create(
          merchandiseStall
        );
        await tourItemModel.create({
          tourId: newTour.id,
          itemId: savedMerchandiseStall.id,
          type: "merchandiseStalls",
        });
      }
    }

    if (afterParties && afterParties.length > 0) {
      for (const afterPartie of afterParties) {
        const savedAfterParties = await afterPartiesModel.create(afterPartie);
        await tourItemModel.create({
          tourId: newTour.id,
          itemId: savedAfterParties.id,
          type: "afterParties",
        });
      }
    }

    res.status(200).json({ message: "Tour Created.", newTour });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to Create, since ${error.message}` });
  }
};

const getTour = async (req, res) => {
  try {
    let id = req.params.id;
    let tour = await tourModel.findByPk(id);
    console.log(tour);

    if (!tour) {
      return res.status(404).json({ error: "Failed GET TOUR" });
    }

    let tourItems = await tourItemModel.findAll({ where: { itemId: tour.id } });

    let concerts = [];
    let merchandiseStalls = [];
    let afterParties = [];

    for (const tourItem of tourItems) {
      if (tourItem.type === "concert") {
        let concert = await concertModel.findByPk(tourItem.itemId);
        if (concert) concerts.push(concert);
      } else if (tourItem.type === "merchandiseStalls") {
        let ms = await merchandiseStallsModel.findByPk(tourItem.itemId);
        if (ms) merchandiseStalls.push(ms);
      } else {
        let ap = await afterPartiesModel.findByPk(tourItem.itemId);
        if (ap) afterParties.push(ap);
      }
    }

    res.status(200).json({ tour, concerts, afterParties, merchandiseStalls });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `Failed to retrieve Tour, since ${error.message}` });
  }
};

module.exports = { createTour, getTour };
