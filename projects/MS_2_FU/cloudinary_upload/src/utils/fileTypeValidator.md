# 1. Importing the path Module

> import path from "path";

path: A built-in Node.js module that provides utilities for working with file and directory paths.
This module is used here to extract the file extension from a file's name.

# 2. Exporting the fileTypeValidator Function

> export const fileTypeValidator = (file) => {
> fileTypeValidator:
> A function that checks whether the uploaded file is of a valid type.
> It takes a file object as input, which represents the uploaded file.
> export: Makes this function available for import in other files.

# 3. Defining the Allowed File Types

> const fileTypes = /jpeg|jpg|png|gif/;
> fileTypes:
> A regular expression (regex) that lists valid file types/extensions.
> In this case, the valid file extensions are jpeg, jpg, png, and gif.

# 4. Extracting and Validating the File Extension

> const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

file.originalname: Represents the original name of the uploaded file (e.g., example.jpg).
path.extname(file.originalname):
Extracts the file extension from the original file name (e.g., .jpg).
.toLowerCase(): Converts the extracted extension to lowercase for case-insensitive comparison.
fileTypes.test(...):
Uses the regex (fileTypes) to check if the file extension matches one of the allowed types.
Returns true if the extension is valid, otherwise false.
extname: A boolean indicating whether the file extension is valid.

# 5. Validating the File MIME Type

> const mimeType = fileTypes.test(file.mimeType);
> file.mimeType: Represents the MIME type of the uploaded file (e.g., image/jpeg).
> This property is typically set by middleware like multer.
> fileTypes.test(file.mimeType):
> Uses the regex (fileTypes) to check if the MIME type matches one of the allowed types.
> Returns true if the MIME type is valid, otherwise false.
> mimeType: A boolean indicating whether the file's MIME type is valid.

# 6. Returning the Validation Result

> return extname && mimeType;
> Combines the results of extname and mimeType using the logical AND operator (&&):
> If both the file extension and MIME type are valid, the function returns true.
> If either check fails, it returns false.

Summary of the Function Workflow
Takes a file object as input.
Extracts the file's extension using path.extname and checks if it matches the allowed file types.
Checks the file's MIME type to ensure it is valid.
Returns true if both the extension and MIME type are valid, otherwise false.
Use Case
This function is used to validate uploaded files to ensure:

They have the correct format.
They are not malicious or unsupported.
It is typically called during the file upload process, often within a middleware like multer.

Example Usage
Here’s how the fileTypeValidator might be used in a file upload flow:

> import multer from "multer";
> import { fileTypeValidator } from "./utils/fileTypeValidator.js";

> const upload = multer({
> fileFilter: (req, file, cb) => {
> if (fileTypeValidator(file)) {
> cb(null, true); // Accept the file
> } else {
> cb(new Error("Unsupported file type!")); // Reject the file
> }
> },
> }).single("file");

> app.post("/upload", (req, res) => {
> upload(req, res, (err) => {
> if (err) {
> return res.status(400).json({ error: err.message });
> }
> res.status(200).json({ message: "File uploaded successfully!" });
> });
> });

In this example:

The fileTypeValidator ensures that only files with valid extensions and MIME types are accepted.
Invalid files are rejected, and an error is sent to the client.
