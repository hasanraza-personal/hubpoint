const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel = require('../models/User');
const sharp = require('sharp');
const formidable = require('formidable');
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
    let newPhoto = new Date().getTime() + '.png';
    let savePath = path.join(uploadPath, newPhoto);
    let success = false;
    let photo = null;
    let avatarPath = null;

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


// Route 5: Update user social account using: POST '/api/auth/updatesocialaccount'
router.post('/updatesocialaccount', [
    body('facebook', 'Facebook username be less than 20 characters').trim().escape().isLength({ max: 20 }),
    body('instagram', 'Instagram must be less than 20 characters').trim().escape().isLength({ max: 20 }),
    body('snapchat', 'Snapchat must be less than 20 characters').trim().escape().isLength({ max: 20 }),
    body('twitter', 'Twitter must be less than 20 characters').trim().escape().isLength({ max: 20 }),
    body('linkedin', 'Linkedin must be less than 20 characters').trim().escape().isLength({ max: 20 }),
    body('youtube', 'Youtube must be less than 20 characters').trim().escape().isLength({ max: 20 }),
    body('cod', 'Call of Duty id must be less than 20 characters').trim().escape().isLength({ max: 20 }),
    body('coc', 'Clash of Clans id must be less than 20 characters').trim().escape().isLength({ max: 20 }),
    body('minecraft', 'Minecraft id must be less than 20 characters').trim().escape().isLength({ max: 20 }),
    body('pubg', 'PUBG id must be less than 20 characters').trim().escape().isLength({ max: 20 }),
    body('fortnite', 'Fortnite must be less than 20 characters').trim().escape().isLength({ max: 20 }),
    body('freefire', 'Freefire id must be less than 20 characters').trim().escape().isLength({ max: 20 }),
], fetchUser, async (req, res) => {
    let success = false;
    let accounts = []

    // Facebook
    accounts.push({
        accountName: 'Facebook',
        accountIcon: 'Facebook',
        fieldname: 'facebook',
        accountUsername: req.body.facebook
    })

    // Instagram
    accounts.push({
        accountName: 'Instagram',
        accountIcon: 'Instagram',
        fieldname: 'instagram',
        accountUsername: req.body.instagram
    })

    // Snapchat
    accounts.push({
        accountName: 'Snapchat',
        accountIcon: 'Snapchat',
        fieldname: 'snapchat',
        accountUsername: req.body.snapchat
    })

    // Twitter
    accounts.push({
        accountName: 'Twitter',
        accountIcon: 'Twitter',
        fieldname: 'twitter',
        accountUsername: req.body.twitter
    })

    // Linkedin
    accounts.push({
        accountName: 'Linkedin',
        accountIcon: 'Linkedin',
        fieldname: 'linkedin',
        accountUsername: req.body.linkedin
    })

    // Youtube
    accounts.push({
        accountName: 'Youtube',
        accountIcon: 'Youtube',
        fieldname: 'youtube',
        accountUsername: req.body.youtube
    })

    // coc
    accounts.push({
        accountName: 'Clash of Clans',
        accountIcon: 'Controller',
        fieldname: 'coc',
        accountUsername: req.body.coc
    })

    // cod
    accounts.push({
        accountName: 'Call of Duty',
        accountIcon: 'Controller',
        fieldname: 'cod',
        accountUsername: req.body.cod
    })

    // minecraft
    accounts.push({
        accountName: 'Minecraft',
        accountIcon: 'Controller',
        fieldname: 'minecraft',
        accountUsername: req.body.minecraft
    })

    // PUBG
    accounts.push({
        accountName: 'PUBG',
        accountIcon: 'Controller',
        fieldname: 'pubg',
        accountUsername: req.body.pubg
    })

    // Fortnite
    accounts.push({
        accountName: 'Fortnite',
        accountIcon: 'Controller',
        fieldname: 'fortnite',
        accountUsername: req.body.fortnite
    })

    // Free Fire
    accounts.push({
        accountName: 'Free Fire',
        accountIcon: 'Controller',
        fieldname: 'freefire',
        accountUsername: req.body.freefire
    })

    // Check if user has added account or not
    let accountCount = [];
    accounts.map((account) => {
        if (account.accountUsername !== '') {
            accountCount.push(account.accountUsername)
        }
    })
    if (accountCount.length === 0) {
        return res.status(400).json({ success, error: 'Please add atleast one social account' });
    }

    // Update social account
    try {
        let newAccounts = await userModel.findByIdAndUpdate((req.user.id), { accounts }, { new: true })

        success = true;
        res.json({ success, newAccounts, msg: 'Account updated successfully' });
    } catch (err) {
        console.log('err: ', err);
        return res.status(400).json({ success, error: 'Something went wrong while updating social account. Please try again' });
    }
})

// Route 6: Get user social account using: POST '/api/auth/getsocialaccount'
router.get('/getsocialaccount', fetchUser, async (req, res) => {
    let success = false;

    try {
        let userAccount = await userModel.findById(req.user.id).select('-_id accounts');
        res.json({ success, userAccount: userAccount });
    } catch (err) {
        return res.status(400).json({ success, error: 'Something went wrong while fetchng social account. Please try again' });
    }

})

module.exports = router;