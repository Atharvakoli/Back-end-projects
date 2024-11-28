const isFilePresent = (req, res, next) => {
  if (!req.files) {
    return res
      .status(400)
      .json({ error: { description: "File Not present in req body" } });
  }

  if (Array.isArray(req.files) && req.files.length === 0) {
    return res.status(400).json({ error: { description: "No file Uploaded" } });
  }
  next();
};

export default isFilePresent;
