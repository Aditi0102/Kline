const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
//Register a User

exports.registerUser = catchAsyncErrors( async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'sample id',
            url: 'profilepic',
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