const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');

dotenv.config();
const PORT = 5000;

let mongoURI = ''
if (process.env.APP_ENV === 'production') {
    mongoURI = process.env.PRODUCTION_DB
} else {
    mongoURI = process.env.LOCAL_DB
}

mongoose.connect(mongoURI, () => {
    console.log('Connected to Mongo Successfully');
})

// app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use(express.json());
// app.use(express.urlencoded({limit: '25mb', extended: false}));
app.use(express.static(__dirname + '/public'));

// Available routes
app.use('/api/auth', require('./routes/Authentication'));
app.use('/api/profile', require('./routes/Profile'));
app.use('/api/social', require('./routes/Social'));
app.use('/api/others', require('./routes/Others'));
app.use('/api/user', require('./routes/Visitor'));
app.use('/api/home', require('./routes/Home'));
app.use('/api/search', require('./routes/Search'));
app.use('/api/product', require('./routes/Product'));

// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
// });

app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
})