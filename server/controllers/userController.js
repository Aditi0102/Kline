const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
// const cloudinary = require('cloudinary').v2;
//Register a User

exports.registerUser = catchAsyncErrors( async (req, res, next) => {

    // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //     folder: 'avatars',
    //     width: 150,  
    //     crop: "scale"
    // });


    const { name, email, password } = req.body;
    
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "",
            url: "",
        },
    });

    sendToken(user, 201, res);
});

//Login User 
exports.loginUser = catchAsyncErrors( async (req, res, next) => {
    const { email, password } = req.body;

    //Checks if email and password is entered by user
    if(!email || !password){
        return next(new ErrorHandler('Please enter email and password', 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if(!user){
        return next(new ErrorHandler("user not found",401));
    }
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401));
    }
    sendToken(user, 200, res);
});

//Logout User
exports.logout = catchAsyncErrors( async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
});


//forgot password

exports.forgotPassword = catchAsyncErrors( async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if(!user){
        return next(new ErrorHandler("user not found",404));
    }
    //get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    //create reset password url
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const message = "Your password reset token is as follows:\n\n" + resetPasswordUrl + "\n\nIf you have not requested this email, then ignore it.";

    try{
        await sendEmail({
            email: user.email,
            subject: "ShopIT Password Recovery",
            message,
        });
        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        });
    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
});

exports.resetPassword = catchAsyncErrors( async (req, res, next) => {
    //hash url token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()},
    });
    if(!user){
        return next(new ErrorHandler("Reset Password token is invalid or is expired",404));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password doestnot match", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user,200,res);
})


// get user Detail

exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);

     res.status(200).json({
        success: true,
        user,
     });
});

//update User password 
exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old password is incorrect",400));

    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("password doest not match",400));
    }

    user.password = req.body.newPassword;
    await user.save();
    sendToken(user,200,res);
}); 

//update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };
  
    if (req.body.avatar !== "") {
      const user = await User.findById(req.user.id);
  
      const imageId = user.avatar.public_id;
  
      await cloudinary.v2.uploader.destroy(imageId);
  
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: "scale",
      });
  
      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
  
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  }); 

//get all users(admin)

exports.getAllUser = catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find();
    res.status(200).json({
        success: true,
        users,
    });
});

//get single user details(admin)
exports.getSingleUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`,404));
    }
    res.status(200).json({
        success: true,
        user,
    });
});

//update user role --admin
exports.updateUserRole = catchAsyncErrors(async(req,res,next)=>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
        });
    res.status(200).json({
        success: true,
    });
   
}); 

//delete user --admin
exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{
   
    const user = await User.findById(req.params.id);
     if(!user){
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`,404));
     }
    await user.remove();  
    res.status(200).json({
        success: true,
    });
   
}); 