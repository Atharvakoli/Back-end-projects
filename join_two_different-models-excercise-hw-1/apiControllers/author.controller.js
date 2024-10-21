let { authorModel } = require("../models/author.model.js");

async function getAllAuthors(res, res) {
  try {
    let authors = await authorModel.findAll();

    console.log(authors);

    if (authors.length === 0) {
      return res.status(404).json({ authors: "Authors, NOT FOUND" });
    }

    res.status(200).json({ authors });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function addAuthor(req, res) {
  try {
    let authorDetails = req.body.newAuthor;

    if (!authorDetails) {
      return res.status(404).json({ message: "Details, NOT FOUND" });
    }

    let { name, birthYear } = authorDetails;

    if (!name || !birthYear) {
      return res.status(404).json({ message: "Credentials are missing :) " });
    }

    let newAuthor = await authorModel.create(authorDetails);

    res
      .status(200)
      .json({ message: "Author is Created successfully", newAuthor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateAuthorById(req, res) {
  let id = req.params.id;
  try {
    let authorDetailsToUpdate = req.body;

    if (!authorDetailsToUpdate) {
      return res.status(404).json({ message: "Details required :) " });
    }

    let findAuthorById = await authorModel.findOne({ where: { id } });

    if (!findAuthorById) {
      return res.status(404).json({ message: "Author, NOT FOUND" });
    }

    findAuthorById.set(authorDetailsToUpdate);
    let updatedAuthor = await findAuthorById.save();

    res
      .status(200)
      .json({ message: "Author Updated successfully :) ", updatedAuthor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getAllAuthors, addAuthor, updateAuthorById };
