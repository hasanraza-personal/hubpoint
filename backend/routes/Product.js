const express = require('express');
const router = express.Router();
const productModel = require('../models/Product');
const sharp = require('sharp');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

const uploadPath = path.join(__dirname, '../public/images/product');

let APP_URL = ''
if (process.env.APP_ENV === 'production') {
    APP_URL = process.env.PRODUCTION_URL
} else {
    APP_URL = process.env.LOCAL_URL
}


// Route 1: Add product using: POST '/api/product/addproduct'
router.post('/addproduct', async (req, res) => {
    let newPhoto = new Date().getTime() + '.jpeg';
    let savePath = path.join(uploadPath, newPhoto);
    let success = false;

    let form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        // Check if user has selected photo
        if (files.photo) {
            // console.log('files.photo: ', files.photo);
            let imgTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            // Return -1 of index of array in string not found in array
            if (imgTypes.indexOf(files.photo.mimetype) === -1) {
                return res.status(400).json({ success, error: 'Only jpeg, jpg and png format are allowed' });
            }

            if (files.photo.size > 5242880) {
                return res.status(400).json({ success, error: 'Please upload the photo below 5MB' });
            }

            // Store photo in folder
            try {
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

        // Check if fields are empty
        if (fields.productname === '') {
            return res.status(400).json({ success, error: 'Product name cannot be blank' });
        }

        if (fields.productdesc === '') {
            return res.status(400).json({ success, error: 'Product desc cannot be blank' });
        }

        if (fields.productlink === '') {
            return res.status(400).json({ success, error: 'Product link cannot be blank' });
        }

        try {
            let product = await productModel.create({
                productName: fields.productname,
                productDesc: fields.productdesc,
                productLink: fields.productlink,
                productPhoto: `${APP_URL}/images/product/${newPhoto}`,
            });

            success = true;
            res.json({ success, product, msg: 'Product has been added' });
        } catch (err) {
            return res.status(400).json({ success, error: err.message, msg: 'Something went wrong while adding the product. Please try again' });
        }
    })
})


// Route 2: Delete product using: POST '/api/product/deleteproduct'
router.post('/deleteproduct', async (req, res) => {
    let success = false;

    let product = await productModel.findById(req.body.productid).select('-_id productPhoto');
    console.log('product: ', product);
    // Delete photo from folder
    try {
        let productphoto = product.productPhoto.split("/").pop();
        productphoto = path.join(uploadPath, productphoto)

        if (fs.existsSync(productphoto)) {
            fs.unlinkSync(productphoto)
        }
    } catch (err) {
        return res.status(400).json({ success, error: err.message, msg: 'Something went wrong while deleting file. Please try again' });
    }

    // Delete product from database
    try {
        await productModel.findByIdAndDelete(req.body.productid).select('-_id photo');
        res.json({ success, msg: 'Your product has been deleted' });
    } catch (err) {
        return res.status(400).json({ success, error: 'Something went wrong while deleting product. Please try again' });
    }
})


// Route 3: Get all product: GET '/api/product/'
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page)
    let success = false;
    const limit = 5;
    const startIndex = (page - 1) * limit;
    let totalPages = null;

    try {
        let totalDocuments = await productModel.countDocuments();
        totalPages = Math.ceil(totalDocuments / 5)
    } catch (error) {
        return res.status(400).json({ success, error: error.message, message: 'Something went wrong while counting. Please try again' });
    }

    try {
        let products = await productModel.find().sort({ createdAt: -1 }).limit(limit).skip(startIndex);
        success = true;
        res.json({ success, products, totalPages });
    } catch (error) {
        return res.status(400).json({ success, error: error.message, message: 'Something went wrong. Please try again' });
    }
})

module.exports = router;