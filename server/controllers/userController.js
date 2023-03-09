const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');

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