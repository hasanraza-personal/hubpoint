const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./models/User");

dotenv.config();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:3000",
  "https://hubpoint.me",
  // 'https://www.googleapis.com'
];
const corsOptions = {
  origin: "*",
  // origin: (origin, callback) => {
  //     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
  //         callback(null, true)
  //     } else {
  //         callback(new Error('Not allowed by CORS'))
  //     }
  // }
};
app.use(cors(corsOptions));

let mongoURI = "";
if (process.env.APP_ENV === "production") {
  mongoURI = process.env.PRODUCTION_DB;
} else {
  mongoURI = process.env.LOCAL_DB;
}

// app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use(express.json());
// app.use(express.urlencoded({limit: '25mb', extended: false}));
app.use(express.static(__dirname + "/public"));

// Available routes
app.use("/api/auth", require("./routes/Authentication"));
app.use("/api/profile", require("./routes/Profile"));
app.use("/api/social", require("./routes/Social"));
app.use("/api/others", require("./routes/Others"));
app.use("/api/user", require("./routes/Visitor"));
app.use("/api/home", require("./routes/Home"));
app.use("/api/search", require("./routes/Search"));
app.use("/api/product", require("./routes/Product"));

// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
// });

app.listen(PORT, () => {
  try {
    mongoose.connect(mongoURI, () => {
      console.log("Connected to Mongo Successfully");
      console.log(`Listening to PORT ${PORT}`);
    });
  } catch (err) {
    console.log("Something went wrong, while connecting to Database");
  }
});
