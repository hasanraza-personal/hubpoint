const express = require('express');
const router = express.Router();
const FeedbackModel = require('../models/Feedback');
const { body, validationResult } = require('express-validator');

let APP_URL = ''
if (process.env.APP_ENV === 'production') {
    APP_URL = process.env.PRODUCTION_URL
} else {
    APP_URL = process.env.LOCAL_URL
}

// Route 1: subit feedback using: POST '/api/others/submitfeedback'
router.post('/submitfeedback', [
    body('feedback', 'Feedback cannot be empty').trim().not().isEmpty().escape().isLength({ max: 200 }),
], async (req, res) => {
    let success = false;

    // Submit feedback
    try {
        await FeedbackModel.create({
            feedback: req.body.feedback,
        });

        res.json({ success, msg: 'Your feedback has been submitted' });
    } catch (err) {
        return res.status(400).json({ success, error: 'Something went wrong while submitting your feedback. Please try again' });
    }
})


module.exports = router;