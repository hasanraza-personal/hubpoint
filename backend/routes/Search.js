const express = require('express');
const router = express.Router();
const userModel = require('../models/User');

// Route 1: Get searched user using: GET '/api/search/'
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page)
    let success = false;
    const limit = 10;
    const startIndex = (page - 1) * limit;

    try {
        let users = await userModel.find({
            "$or": [
                { name: { $regex: `^${req.query.q.trim()}`, $options: 'i' } },
                { username: { $regex: `^${req.query.q.trim()}`, $options: 'i' } },
            ]
        }).select('photo name username').limit(limit).skip(startIndex);
        success = true;
        res.json({ success, users });
    } catch (error) {
        return res.status(400).json({ success, error: 'Something went wrong. Please try again', message: error.message });
    }
})

module.exports = router;