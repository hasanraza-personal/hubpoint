const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel = require('../models/User');
const path = require('path');
const fs = require('fs');
const maleAvatars = require('../Avatar/maleAvatars');
const femaleAvatars = require('../Avatar/femaleAvatars');

let APP_URL = ''
if (process.env.APP_ENV === 'production') {
    APP_URL = process.env.PRODUCTION_URL
} else {
    APP_URL = process.env.LOCAL_URL
}

let account = 'exist';
const uploadPath = path.join(__dirname, '../public/images/profile_photo');
const newPhoto = new Date().getTime() + '.png';
const savePath = path.join(uploadPath, newPhoto);

// Route 1: Verify user using: POST '/api/auth/login';
router.post('/login', async (req, res) => {
    let success = false;
    let user = null;
    let photo = null;
    let avatarPath = null;

    if (req.body.gender === 'male') {
        photo = maleAvatars[Math.floor(Math.random() * maleAvatars.length)];
    } else {
        photo = femaleAvatars[Math.floor(Math.random() * femaleAvatars.length)];
    }
    avatarPath = path.join(__dirname, `../public/images/avatar/${req.body.gender}/${photo}`);

    // Check whether this email exists or not
    try {
        user = await userModel.findOne({ email: req.body.googleUser.email });
        if (!user) {
            account = 'new';
            // Save user in database
            user = await userModel.create({
                googleId: req.body.googleUser.googleId,
                email: req.body.googleUser.email,
                username: req.body.googleUser.username,
                name: req.body.googleUser.name,
                gender: req.body.gender,
                photo: `${APP_URL}/images/profile_photo/${newPhoto}`
            });

            // Compy file from one folder to another
            fs.copyFile(avatarPath, savePath, (err) => {
                if (err) {
                    return res.status(400).json({ success, error: 'Something went wrong while copying. Please try again' });
                }
            });
        }
    } catch (err) {
        return res.status(400).json({ success, error: 'Something went wrong while saving. Please try again' });
    }

    let userData = {
        email: req.body.googleUser.email,
        username: req.body.googleUser.username,
        name: req.body.googleUser.name,
        photo: `${APP_URL}/images/profile_photo/${newPhoto}`
    }

    success = true;
    res.json({ success, userData, account, msg: 'Your account has been created' });
});

module.exports = router;