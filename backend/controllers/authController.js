const catchAsyncError = require('../middleware/catchAsyncError')
const User = require('../models/userModel')
const sendToken = require('../utils/jwt')
const ErrorHandler = require('../utils/errorHandler')
const sendEmail = require('../utils/email')
const crypto = require('crypto')


exports.registerUser = catchAsyncError(async (req, res, next) => {
    const {name, email, password } = req.body
    
    const user = await User.create({
        name,
        email,
        password,
    })

   sendToken(user,201,res)
})

exports.loginUser = catchAsyncError(async (req,res,next) =>{
    const {email,password} = req.body
    if(!email || !password ){
        return next (new ErrorHandler("please enter email & password",400))
    }
    //finding the user database
    const user = await User.findOne({email}).select('+password');

    if(!user){
        return next (new ErrorHandler("invalid email or password",401))
    }

    if(!await user.isValidPassword(password)){
return next(new ErrorHandler('Invlaid email or password',401))
    }

sendToken(user,201,res)
    
})

exports.logoutUser = (req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        htttpOnly:true
    }).status(200)
    .json({
        succes:true,
        message:"loggeout"
    })
}

exports.forgotPassword = catchAsyncError(async(req,res,next) =>{
    const user = await User.findOne({email: req.body.email});

    if(!user){
        return next(new ErrorHandler('user not found with this email Try Your registered email id',404))
    }
    const resetToken = user.getResetToken();
    await user.save({validateBeforeSave:false})
    let BASE_URL = process.env.FRONTEND_URL;
    if(process.env.NODE_ENV === "Production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    //Create rest url
    const resetUrl = `${BASE_URL}/password/reset/${resetToken}`;
    const message = `your password reset url is  as follows \n\n
    ${resetUrl}\n\n If you have not requested thsi email,then ignore it`

    try{
 sendEmail({
    email:user.email,
    subject:"SNCrackers password recovery",
    message
 })
res.status(200).json({
    success:true,
    message:`email send to ${user.email}`
})
    }catch(error){
user.resetPasswordToken = undefined;
user.resetPasswordTokenExpire = undefined
await user.save({validateBeforeSave:false})
return next(new ErrorHandler(error.message),500)
    }

})

exports.resetPassword = catchAsyncError(async(req,res,next)=>{

    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
const user = await User.findOne({
    resetPasswordToken,
resetPasswordTokenExpire:{
    $gt:Date.now()
}
})

if(!user){
    return next(new ErrorHandler('password reset token is invalid or expired'))
}
if(req.body.password!==req.body.confirmPassword){
    return next(new ErrorHandler('password does not match'))
}
user.password = req.body.password
user.resetPasswordToken = undefined
user.resetPasswordTokenExpire = undefined
await user.save({validateBeforeSave:false})

sendToken(user,201,res)


})

//get user profile

exports.getUserProfile = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id)
    res.status(200).json({
        sucees:true,
        user
    })
})

//Admin:get all users
exports.getAllUsers = catchAsyncError(async(req,res,next)=>{
    const users = await User.find()
    res.status(200).json({
        sucess:true,
        users
    })
})

//admin :get specific user
exports.getUser = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        return next(new ErrorHandler(`user not found with this id ${req.params.id}`))
    }
    res.status(200).json({
        sucess:true,
        user
    })
});

//admin:update roles
exports.updateUser = catchAsyncError(async(req,res,next)=>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        success: true,
        user
    })
});

//Admin: Delete User - api/v1/admin/user/:id
exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user) {
        return next(new ErrorHandler(`User not found with this id ${req.params.id}`))
    }
    await user.deleteOne();
    res.status(200).json({
        success: true,
    })
});
