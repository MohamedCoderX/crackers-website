const product = require('../models/productmodel');
const ErrorHanlder = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const APIFeatures = require('../utils/apiFeatures');


//get products - {{base_url}}/api/v1/products
exports.getProducts =catchAsyncError(async(req,res,next)=>{

    const resPerPage = 12;
    let buildQuery = () => {
        return new APIFeatures(product.find(), req.query).search().filter()
    }
    const filteredProductsCount = await buildQuery().query.countDocuments({})
    const totalProductsCount = await product.countDocuments({});
    // const apifeatures = new APIFeatures(product.find(),req.query).search().filter().paginate(resPerPage);


//    const products =  await apifeatures.query;
   
let productsCount = totalProductsCount;
if(filteredProductsCount!==totalProductsCount){
    productsCount = filteredProductsCount
}
//    await new Promise(resolve=> setTimeout(resolve,3000))
// return next(new ErrorHanlder('unable to send products',400)
// )
 const products = await buildQuery().paginate(resPerPage).query;
res.status(200).json({
    sucess:true,
    count:productsCount,
    resPerPage,
    products
})
})



//Create product - api/v1/products/new
exports.newProduct = catchAsyncError(async(req,res,next)=>{    
    let images  = []
    let BASE_URL = process.env.BACKEND_URL;
       
        
    if(req.files.length > 0){
      req.files.forEach(file => {
        let url = `${BASE_URL}/uploads/product/${file.originalname}`;
        images.push({image:url})
    });
    }
    req.body.images = images;
    req.body.user = req.user.id;
    
        const Product = await product.create(req.body);
    res.status(201).json({
        sucess:true,
        Product
    })
    });
    

//get single product -{{base_url}}/api/v1/product/:id
exports.getSingleProduct = catchAsyncError(async(req,res,next) => {
   const Product = await product.findById(req.params.id);

if(!Product){
return next(new ErrorHanlder('product not found',400))
}

res.status(201).json({
    sucess:true,
    Product
})
})


//update product - {{base_url}}/api/v1/product/:id

exports.updateProduct  =async (req,res,next)=>{
    let Product = await product.findById(req.params.id);

    if(!Product){
        return res.status(404).json({
            success:false,
            message:"product not found"
         });
    }
    
    Product = await product.findByIdAndUpdate(req.params.id,req.body ,{
new:true,
runValidators:true
    })

    res.status(200).json({
        sucess:true,
        Product
    })
}

//delete product 
// exports.deleteProduct = async (req,res,next)=>{
//     const Product = await product.findById(req.params.id);
// if(!Product){
//  return res.status(404).json({
//     success:false,
//     message:"product not found"
//  });
// }
//   await Product.findByIdAndDelete(Product)

// res.status(200).json({
//     sucess:true,
//     message:"succesfully deleted"
// })
// }

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;  // Assuming you're getting the product ID from the request parameters
        const deletedProduct = await product.findByIdAndDelete(productId);
        
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};


// get admin products  - api/v1/admin/products
exports.getAdminProducts = catchAsyncError(async (req, res, next) =>{
    const products = await product.find();
    res.status(200).send({
        success: true,
        products
    })
});