import express from "express";
import fs from "fs";
import { fileRouter } from "./src/router/fileRouter.js";
import { fileURLToPath } from "url";
import path from "path";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDirectory = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

app.use("/src/uploads", express.static("src/uploads"));

app.use("/files", fileRouter);

app.use("/", (req, res) => {
  res.send("Welcome to file/image upload");
});

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
