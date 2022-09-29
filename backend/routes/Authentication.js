const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel = require('../models/User');
const path = require('path');
const fs = require('fs');
const maleAvatars = require('../Avatar/maleAvatars');
const femaleAvatars = require('../Avatar/femaleAvatars');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/FetchUser');

const JWT_SECRET = process.env.JWT_SECRET_KEY;

let APP_URL = ''
if (process.env.APP_ENV === 'production') {
    APP_URL = process.env.PRODUCTION_URL
} else {
    APP_URL = process.env.LOCAL_URL
}

const uploadPath = path.join(__dirname, '../public/images/profile_photo');
const newPhoto = new Date().getTime() + '.png';
const savePath = path.join(uploadPath, newPhoto);

// Route 1: Verify user using: POST '/api/auth/login';
router.post('/login', async (req, res) => {
    let success = false;
    let account = 0;
    let authToken = null;

    try {
        let user = await userModel.findOne({ email: req.body.email });
        if (user) {
            account = 1;

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
        res.json({ success, account, user, authToken, msg: 'Logged in successfull' });
    } catch (err) {
        return res.status(400).json({ success, error: 'Something went wrong. Please try again' });
    }
});


// Route 2: Create user using: POST '/api/auth/create'
router.post('/signup', async (req, res) => {
    let success = false;
    let photo = null;
    let avatarPath = null;
    let authToken = null;

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

// Route 3: Delete deleteaccount using: POST '/api/auth/deleteaccount'
router.post('/deleteaccount', fetchUser, async (req, res) => {
    let success = false;

    let user = await userModel.findById(req.user.id).select('-_id photo');
    // Delete photo from folder
    try {
        let profilePhoto = user.photo.split("/").pop();
        profilePhoto = path.join(uploadPath, profilePhoto)

        if (fs.existsSync(profilePhoto)) {
            fs.unlinkSync(profilePhoto)
        }
    } catch (err) {
        return res.status(400).json({ success, error: 'Something went wrong while deleting file. Please try again' });
    }

    // Delete user account from database
    try {
        await userModel.findByIdAndDelete(req.user.id).select('-_id photo');
        res.json({ success, msg: 'Your account has been deleted' });
    } catch (err) {
        console.log('err: ', err);
        return res.status(400).json({ success, error: 'Something went wrong while deleting your account. Please try again' });
    }
})
module.exports = router;