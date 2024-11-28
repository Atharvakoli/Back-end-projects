# 1. Importing Required Modules

> import multer from "multer";
> import path from "path";
> import { fileTypeValidator } from "../utils/fileTypeValidator.js";
> import { UNEXPECTED_FILE_TYPE } from "../constants/file.js";

multer: A middleware for handling multipart/form-data, commonly used for uploading files in Node.js applications.
path: A Node.js module for handling file paths and extensions.
fileTypeValidator: A utility function that checks whether the uploaded file type is allowed. It's imported from a local file.
UNEXPECTED_FILE_TYPE: A constant (presumably an object) containing error information related to invalid file types. Imported from a local constants file.

#2. Configuring Storage for Uploaded Files

> const storage = multer.diskStorage({
> destination: (req, file, cb) => {
> cb(null, "uploads");
> },
> filename: (req, file, cb) => {
> cb(null, Date.now() + path.extname(file.originalname));
> },
> });
> multer.diskStorage(): Configures how and where files are stored on disk.
>
> destination Field
> Specifies the folder where files should be stored.
> cb(null, "uploads"): Calls the callback with:
> null: Indicates no error.
> "uploads": Directory for saving uploaded files. If the folder doesn’t exist, it must be created beforehand.
> filename Field
> Specifies how the file should be named after being uploaded.
> Date.now(): Generates a unique timestamp to avoid filename conflicts.
> path.extname(file.originalname): Extracts the original file's extension (e.g., .jpg, .png) and appends it to the filename.
> The callback (cb) ensures the file is saved with the format: <timestamp>.<extension>.

# 3. Creating the Upload Middleware

> const upload = multer({
> storage: storage,
> fileFilter: (req, file, cb) => {
> const isFileTypeAllowed = fileTypeValidator(file);
> if (isFileTypeAllowed) {
> return cb(null, true);
> } else {
> cb(
> new multer.MulterError(
> UNEXPECTED_FILE_TYPE.code,
> UNEXPECTED_FILE_TYPE.message
> ));}},}).array("file", 1);

storage: storage
Uses the storage configuration defined earlier for file uploads.
fileFilter Field
Purpose: Filters files based on their type before storing them.
fileTypeValidator(file): Validates the file type using the custom fileTypeValidator function.
Returns true if the file type is allowed.
Returns false if the file type is not allowed.
cb(null, true): Allows the upload if the file type is valid.
cb(new multer.MulterError(...)): Rejects the upload with a custom MulterError if the file type is invalid.
UNEXPECTED_FILE_TYPE.code: Error code (e.g., "LIMIT_FILE_TYPE").
UNEXPECTED_FILE_TYPE.message: A descriptive error message.
.array("file", 1)
Specifies that the middleware should handle an array of files:
"file": The key in the form-data where the files are uploaded.
1: Maximum number of files allowed (in this case, only one file).

# 4. Exporting the Upload Middleware

> export default upload;

Exports the upload middleware for use in other parts of the application, typically in route handlers.
How It Works
Storage Configuration:

Files are stored in the "uploads" directory.
Files are named with a timestamp and their original extension.
File Validation:

Files are validated using the fileTypeValidator function.
If the file type is allowed, the upload proceeds.
If not, an error is thrown using multer.MulterError with a specific code and message.
Handling Multiple Files:

The middleware accepts an array of files but limits the number of files to 1.
Usage:

When a request is made with file uploads, this middleware processes the files based on the configuration.
Example Usage in an Express.js Route

> import express from "express";
> import upload from "./middleware/uploadMiddleware.js";

> const router = express.Router();

> router.post("/upload", (req, res) => {
> upload(req, res, (err) => {
> if (err instanceof multer.MulterError) {
> return res.status(400).json({ error: err.message });
> } else if (err) {
> return res.status(500).json({ error: "An unknown error occurred." });
> }
> res.status(200).json({ message: "File uploaded successfully!", files: req.files });
> });});

> export default router;
> Summary:
> This code provides a robust file upload solution with:

Disk-based storage with unique filenames.
File type validation for security.
Support for single-file uploads using form-data.
It is modular, secure, and integrates seamlessly into Express.js routes.
