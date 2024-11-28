# 1. Importing Required Modules

> import sharp from "sharp";
> import path from "path";
> sharp: A powerful image processing library for resizing, cropping, converting, and optimizing images. It is fast and efficient.
> path: A Node.js built-in module for working with file and directory paths.

# 2. Declaring the imageResize Middleware Function

> const imageResize = async (req, res, next) => {
> imageResize:
> A middleware function for resizing uploaded images.
> It modifies the uploaded image and updates the request object with the new file path.
> Parameters:
> req: The request object, which contains file data.
> res: The response object, used for sending error responses if resizing fails.
> next: A callback function to pass control to the next middleware or route handler.

# 3. Handling Errors with a try...catch Block

> try {
> A try block is used to handle potential errors during image processing.
> If an error occurs, it is caught in the catch block and a response is sent with a 500 status code.

# 4. Retrieving the Original File Path

> const originalFilePath = req.files[0].path;
> req.files:
> An array containing details about the uploaded files.
> Typically populated by middleware like multer.
> req.files[0].path: The path of the first uploaded file.

# 5. Parsing the Original File Path

> const parsedPath = path.parse(originalFilePath);
> path.parse(filePath):

Breaks a file path into components such as dir, base, name, and ext.
Example:
Input: /uploads/image.jpg
Output:

> {
> "root": "/",
> "dir": "/uploads",
> "base": "image.jpg",
> "ext": ".jpg",
> "name": "image"
> }

# 6. Generating the Output File Path

> const outputFilePath = path.join(
> parsedPath.dir,
> "resized-" + parsedPath.name + ".jpeg"
> );

path.join:
Constructs a new file path using the directory (parsedPath.dir) and a new file name.
New File Name:
Prefixes the original file name with "resized-".
Changes the extension to .jpeg.
Example:
Input: /uploads/image.jpg
Output: /uploads/resized-image.jpeg

# 7. Resizing the Image with Sharp

> await sharp(originalFilePath)
> .resize({ width: 1500 })
> .jpeg({
> quality: 100,
> mozjpeg: true,
> chromaSubsampling: "4:4:4",
> trellisQuantisation: true,
> overshootDeringing: true,
> optimiseScans: true,
> progressive: true,
> })
> .toFile(outputFilePath);

sharp(originalFilePath): Loads the original image file.
.resize({ width: 1500 }): Resizes the image to a width of 1500 pixels while maintaining the aspect ratio.
.jpeg(options): Converts the image to JPEG format with the following options:
quality: 100: Ensures the highest image quality.
mozjpeg: true: Uses the MozJPEG encoder for better compression.
chromaSubsampling: "4:4:4": Keeps full color information (no chroma subsampling).
trellisQuantisation: Improves compression by optimizing quantization tables.
overshootDeringing: Reduces ringing artifacts in the image.
optimiseScans: Optimizes the order of image scans for progressive rendering.
progressive: true: Creates a progressive JPEG, which loads in stages for a better user experience.
.toFile(outputFilePath):
Saves the resized image to the new file path (outputFilePath).

# 8. Updating the Request Object with the New File Path

> req.files[0].path = outputFilePath;
> req.originalFilePath = originalFilePath;
> req.files[0].path:
> Updates the file path of the uploaded image to the new, resized image.
> req.originalFilePath:
> Stores the original file path for reference, in case it is needed later.

# 9. Passing Control to the Next Middleware

> next();
> next():
> Signals that the middleware has completed its task.
> Passes control to the next middleware or route handler.

# 10. Handling Errors in the Catch Block

> catch (error) {
> return res.status(500).json({ error: { description: error.message } });
> }

If an error occurs during image processing:
Logs the error message to the console.
Sends a 500 response with an error description.

# 11. Exporting the Middleware

> export default imageResize;
> Makes the imageResize middleware available for use in other files.
> Summary
> This middleware:

Takes an uploaded image file.
Resizes it to a width of 1500 pixels while maintaining quality.
Saves the resized image to a new file path.
Updates the request object with the resized image path.
Passes control to the next middleware or route handler.
Example Usage

> import express from "express";
> import multer from "multer";
> import imageResize from "./middleware/imageResize.js";

> const upload = multer({ dest: "uploads/" });

> const app = express();

> app.post("/upload", upload.array("files"), imageResize, (req, res) => {
> res.status(200).json({
> message: "Image resized and uploaded successfully!",
> filePath: req.files[0].path,
> });
> });

> app.listen(3000, () => {
> console.log("Server running on port 3000");
> });
