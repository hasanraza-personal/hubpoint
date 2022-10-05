const express = require('express');
const router = express.Router();
const userModel = require('../models/User');
const sharp = require('sharp');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const fetchUser = require('../middleware/FetchUser');

const uploadPath = path.join(__dirname, '../public/images/profile_photo');

let APP_URL = ''
if (process.env.APP_ENV === 'production') {
    APP_URL = process.env.PRODUCTION_URL
} else {
    APP_URL = process.env.LOCAL_URL
}

// Route 1: Delete account using: POST '/api/profile/deleteaccount'
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
        return res.status(400).json({ success, error: 'Something went wrong while deleting your account. Please try again' });
    }
})


// Route 2: Get user using: GET '/api/profile/getuser'
router.get('/getuser', fetchUser, async (req, res) => {
    let success = false;

    try {
        let user = await userModel.findById(req.user.id);
        success = true;
        res.json({ success, user });
    } catch (err) {
        return res.status(400).json({ success, error: 'Something went wrong. Please try again' });
    }
})


// Route 3: Update user profile using: POST '/api/profile/updateprofile'
router.post('/updateprofile', fetchUser, async (req, res) => {
    let newPhoto = new Date().getTime() + '.png';
    let savePath = path.join(uploadPath, newPhoto);
    let success = false;

    let form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        // Check if username is available
        let checkUsername = await userModel.findOne({ username: fields.username }).select('username');
        if (checkUsername && checkUsername.id !== req.user.id) {
            return res.status(400).json({ success, error: 'Sorry, username not available' });
        }

        // Update photo if exist
        if (files.photo) {
            let imgTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            // Return -1 of index of array in string not found in array
            if (imgTypes.indexOf(files.photo.mimetype) === -1) {
                return res.status(400).json({ success, error: 'Only jpeg, jpg and png format are allowed' });
            }

            if (files.photo.size > 5242880) {
                return res.status(400).json({ success, error: 'Please upload the photo below 5MB' });
            }

            // Fetch previous user photo and delete it from folder and database
            try {
                let user = await userModel.findById(req.user.id).select('photo');

                if (user) {
                    let oldPhoto = user.photo.split("/").pop();
                    let oldPhoto_path = path.join(uploadPath, oldPhoto);

                    if (fs.existsSync(oldPhoto_path)) {
                        fs.unlinkSync(oldPhoto_path)
                    }
                }
            } catch (err) {
                return res.status(400).json({ success, error: 'Something went wrong while deleting the previous photo. Please try again' });
            }

            // Update photo in database and folder
            try {
                await userModel.findByIdAndUpdate(req.user.id, { photo: `${APP_URL}/images/profile_photo/${newPhoto}` }, { new: true });

                // Upload image in folder 
                if (files.photo) {
                    sharp(files.photo.filepath).jpeg({
                        quality: 70
                    }).withMetadata().toFile(savePath, (error, info) => {
                        if (error) {
                            return res.status(400).json({ success, err: 'Something went wrong during compression. Please try again' });
                        }
                    });
                }
            } catch (err) {
                return res.status(400).json({ success, error: 'Something went wrong while saving the photo. Please try again' });
            }
        }

        // Update gender, name, username
        if (fields.name === '') {
            return res.status(400).json({ success, error: 'Name cannot be blank' });
        }

        if (fields.username === '') {
            return res.status(400).json({ success, error: 'Username cannot be blank' });
        }

        if (fields.gender === '') {
            return res.status(400).json({ success, error: 'Please provide your gender' });
        }

        try {
            let newUser = await userModel.findByIdAndUpdate((req.user.id), {
                name: fields.name,
                username: fields.username,
                gender: fields.gender
            }, { new: true })

            let user = {
                name: newUser.name,
                username: newUser.username,
                photo: newUser.photo
            }
            success = true;
            res.json({ success, user, msg: 'Your profile details has been updated' });
        } catch (err) {
            return res.status(400).json({ success, error: 'Something went wrong while updating user details. Please try again' });
        }
    })
})


// Route 4: Get profile visibility using: GET '/api/profile/getaccountstatus'
router.get('/getaccountstatus', fetchUser, async (req, res) => {
    let success = false;

    try {
        let status = await userModel.findById(req.user.id).select('-_id isPublic isSearchable isLocked');
        success = true;
        res.json({ success, status });
    } catch (err) {
        console.log('err: ', err);
        return res.status(400).json({ success, error: 'Something went wrong. Please try again' });
    }
})


// Route 5: Change profile visibility using: POST '/api/profile/changevisibility'
router.post('/changestatus', fetchUser, async (req, res) => {
    let success = false;
    console.log(req.body);
    // let field = req.body.fieldname

    try {
        await userModel.findByIdAndUpdate(req.user.id, { [req.body.fieldname]: req.body.status });
        success = true;
        res.json({ success, msg: 'Profile status updated' });
    } catch (err) {
        return res.status(400).json({ success, error: 'Something went wrong. Please try again' });
    }
})

module.exports = router;