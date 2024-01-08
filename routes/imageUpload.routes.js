const express = require("express");

const { upload } = require("../middleware/imageUploadMiddleware");

const router = express.Router();

/**
 * Handles POST request for image upload.
 * @route POST /
 * @param {Object} req - Express request object. The image file should be attached in the 'image' field of the request.
 * @param {Object} res - Express response object.
 * @returns {Object} Response object containing the filename of the uploaded image.
 */
router.post("", upload.single("image"), (req, res) => {
  res.json({
    filename: req.file.filename,
  });
});

module.exports = router;
