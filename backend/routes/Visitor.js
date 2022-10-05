const express = require('express');
const router = express.Router();
const userModel = require('../models/User');

// Route 1: Get user profile using: GET '/api/user/:username'
router.get('/:username', async (req, res) => {
    let success = false;
    let username = req.params.username;

    try {
        let user = await userModel.find({ username }).select('-googleId -email');;
        success = true;
        res.json({ success, user })
    } catch (error) {
        return res.status(400).json({ success, error: 'Something went wrong. Please try again' });
    }
})

module.exports = router;