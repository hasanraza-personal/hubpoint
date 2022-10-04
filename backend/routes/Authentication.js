const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel = require('../models/User');
const path = require('path');
const fs = require('fs');
const maleAvatars = require('../Avatar/maleAvatars');
const femaleAvatars = require('../Avatar/femaleAvatars');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET_KEY;

let APP_URL = ''
if (process.env.APP_ENV === 'production') {
    APP_URL = process.env.PRODUCTION_URL
} else {
    APP_URL = process.env.LOCAL_URL
}

const uploadPath = path.join(__dirname, '../public/images/profile_photo');

// Route 1: Verify user using: POST '/api/auth/login';
router.post('/login', async (req, res) => {
    let success = false;
    let loggedIn = false;
    let authToken = null;

    try {
        let user = await userModel.findOne({ email: req.body.email });
        if (user) {
            loggedIn = true;

            // Store user id in jsonwebtoken
            let data = {
                user: {
                    id: user.id
                }
            }
            authToken = jwt.sign(data, JWT_SECRET);

            user = {
                email: user.email,
                username: user.username,
                name: user.name,
                photo: user.photo
            }
        }
        success = true;
        res.json({ success, loggedIn, user, authToken, msg: 'Logged in successfull' });
    } catch (err) {
        return res.status(400).json({ success, error: 'Something went wrong. Please try again' });
    }
});


// Route 2: Create user using: POST '/api/auth/create'
router.post('/signup', [
    body('username', 'Username cannot be black').trim().not().isEmpty().escape().toLowerCase().isLength({ max: 20 }),
], async (req, res) => {
    let newPhoto = new Date().getTime() + '.png';
    let savePath = path.join(uploadPath, newPhoto);
    let success = false;
    let photo = null;
    let avatarPath = null;

    // If there are errors, return bad request and the errors
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, error: errors.errors[0].msg });
    }

    let username = req.body.username.split(" ").join("");
    let user = await userModel.findOne({ username }).count();

    if(user > 0){
        return res.status(400).json({ success, error: 'Username already exist' });
    }

    if (req.body.gender === 'male') {
        photo = maleAvatars[Math.floor(Math.random() * maleAvatars.length)];
    } else {
        photo = femaleAvatars[Math.floor(Math.random() * femaleAvatars.length)];
    }
    avatarPath = path.join(__dirname, `../public/images/avatar/${req.body.gender}/${photo}`);

    // Save user details in database
    try {
        let user = await userModel.create({
            googleId: req.body.googleUser.googleId,
            email: req.body.googleUser.email,
            username: username,
            name: req.body.googleUser.name,
            gender: req.body.gender,
            photo: `${APP_URL}/images/profile_photo/${newPhoto}`
        });
        // Copy file from one folder to another
        fs.copyFile(avatarPath, savePath, (err) => {
            if (err) {
                return res.status(400).json({ success, error: 'Something went wrong while copying. Please try again' });
            }
        });

        // Store user id in jsonwebtoken
        let data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        user = {
            email: user.email,
            username: user.username,
            name: user.name,
            photo: user.photo
        }
        success = true;
        res.json({ success, user, authToken, msg: 'Your account has been created' });
    } catch (err) {
        return res.status(400).json({ success, error: 'Something went wrong while saving. Please try again' });
    }
})

module.exports = router;