const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    accounts: [
        {
            accountName: {
                type: String
            },
            accountIcon: {
                type: String,
            },
            fieldname: {
                type: String
            },
            accountUsername: {
                type: String
            },
        }
    ],
    isPublic: {
        type: Boolean,
        default: true
    },
    isSearchable: {
        type: Boolean,
        default: true
    },
    isLocked: {
        type: Boolean,
        default: false
    },
    isBlock: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('user', UserSchema);