const express = require("express");
const router = express.Router();
const userModel = require("../models/User");
const productModel = require("../models/Product");
const fetchUser = require("../middleware/FetchUser");

// Route 1: Get all user using: GET '/api/home/'
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page);
  let success = false;
  const limit = 5;
  const startIndex = (page - 1) * limit;
  let totalPages = null;

  try {
    let totalDocuments = await userModel.countDocuments();
    totalPages = Math.ceil(totalDocuments / 5);
  } catch (error) {
    return res.status(400).json({
      success,
      error: error.message,
      message: "Something went wrong. Please try again",
    });
  }

  try {
    let users = await userModel
      .find({
        $and: [{ isLocked: false }, { isBlock: false }, { isPublic: true }],
      })
      .select("-accounts")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);
    success = true;
    res.json({ success, users, totalPages });
  } catch (error) {
    return res.status(400).json({
      success,
      error: error.message,
      message: "Something went wrong. Please try again",
    });
  }
});

module.exports = router;
