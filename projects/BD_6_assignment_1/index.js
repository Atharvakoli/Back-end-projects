const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("BD_6 Assignment_1");
});

let theatres = [
  { theatreId: 1, name: "Regal Cinemas", location: "Downtown" },
  { theatreId: 2, name: "AMC Theatres", location: "Midtown" },
  { theatreId: 3, name: "Cinemark", location: "Uptown" },
];

let shows = [
  { showId: 1, title: "The Lion King", theatreId: 1, time: "7:00 PM" },
  { showId: 2, title: "Hamilton", theatreId: 2, time: "8:00 PM" },
  { showId: 3, title: "Wicked", theatreId: 3, time: "9:00 PM" },
  { showId: 4, title: "Les Misérables", theatreId: 1, time: "6:00 PM" },
];

function getShows() {
  return shows;
}

function getShowById(id) {
  return shows.find((show) => show.showId === id);
}

function validateShow(show) {
  if (
    !show.title ||
    (typeof show.title !== "string" && !show.theatreId) ||
    (typeof show.theatreId !== "number" && !show.time) ||
    typeof show.time !== "string"
  ) {
    return "Credentials are required and should be specifc type";
  }
}

async function addShow(show) {
  let newShow = {
    showId: shows.length + 1,
    ...show,
  };
  shows.push(newShow);
  return newShow;
}

app.get("/shows", async (req, res) => {
  let shows = getShows();
  if (!shows) {
    return res.status(404).json({ error: shows });
  }
  res.status(200).json({ shows });
});

app.get("/shows/:id", async (req, res) => {
  let show = getShowById(parseInt(req.params.id));
  if (!show) {
    return res.status(404).json({ error: "Show, NOT FOUND" });
  }
  res.status(200).json({ show });
});

app.post("/shows", async (req, res) => {
  let newShowDetails = req.body;
  let show = validateShow(newShowDetails);

  if (show) {
    return res.status(400).json({ error: show });
  }

  let newShow = await addShow(newShowDetails);
  res.status(201).json(newShow);
});

module.exports = { app, getShows, getShowById, addShow, validateShow };
