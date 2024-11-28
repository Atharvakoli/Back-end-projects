import { cloudinaryUpload } from "../service/fileService.js";

export const fileController = async (req, res) => {
  try {
    if (!req.files) {
      return res
        .status(400)
        .json({
          error: { description: "File not present in the request body" },
        });
    }

    if (Array.isArray(req.files) && req.files.length === 0) {
      return res
        .status(400)
        .json({ error: { description: "No File Uploaded" } });
    }

    const file = req.files[0];
    const response = await cloudinaryUpload(file);
    res.status(200).json({
      message: "File Uploaded succesfully :)",
      uploadResult: response,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
