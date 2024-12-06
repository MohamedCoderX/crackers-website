const express = require('express');
const app = express();
const cookieParser = require("cookie-parser")
app.use(express.json());
app.use(cookieParser());
const errormiddleware = require('./middleware/error')
const uploadRoute = require("./routes/product");
const products = require('./routes/product')
const auth = require('./routes/auth');
const order = require('./routes/order')
const path = require('path')
const cors = require('cors');
const dotenv = require('dotenv');

const corsOptions = {
  origin:"https://crackers-website.onrender.com",
  credentials:"true"
}


app.use('/uploads', express.static(path.join(__dirname,'uploads') ) )
app.use(cors(corsOptions))
// Other routes
app.use("/api/v1", uploadRoute); // Add the upload route under the API path
// app.use('/uploads', express.static(path.join(__dirname,'uploads') ) )
app.use('/api/v1/',products);
app.use('/api/v1/',auth);
app.use('/api/v1/',order);
dotenv.config({path:path.join(__dirname,"config/config.env")});
if(process.env.NODE_ENV === "Production") {
    app.use(express.static(path.join(__dirname, '../frontend/build/')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
      });
}


app.use(errormiddleware)

module.exports = app;