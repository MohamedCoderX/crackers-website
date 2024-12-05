const products = require("../data/products.json")
const Product = require("../models/productmodel")
const dotenv = require('dotenv')
const connectDatabase = require('../config/database')

dotenv.config({path:'backend/config/config.env'});
connectDatabase();

const seedProducts = async ()=>{
    try{
   await Product.deleteMany();
   console.log("deleted products")
   await Product.insertMany(products);
   console.log("inserted")
    }
    catch(error){
        console.log(error.message);
    }
    process.exit();
}

seedProducts();