const express = require("express");
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, getAdminProducts } = require("../controllers/productController");
const { model } = require("mongoose");
const router = express.Router();
const {isAunthenticatedUser, authorizeRoles} = require('../middleware/authenticate')
const path = require('path')
const multer = require('multer')

const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join( __dirname,'..','uploads/product' ) )
    },
    filename: function(req, file, cb ) {
        cb(null, file.originalname)
    }
}) })

router.route('/products').get(getProducts);
router.route('/products/new').post(isAunthenticatedUser,authorizeRoles('admin'),newProduct);
router.route('/product/:id').get(getSingleProduct)
router.route('/product/:id').put(updateProduct)



//admin routes
// router.route('/admin/products/new').post()
router.route('/admin/products').get(isAunthenticatedUser,authorizeRoles('admin'),getAdminProducts)
router.route('/admin/product/new').post(isAunthenticatedUser, authorizeRoles('admin'),upload.array('images'), newProduct);
router.route('/admin/product/:id').delete(isAunthenticatedUser,authorizeRoles('admin'),deleteProduct)
module.exports = router;