const catchAsyncErrors = require('./catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return next(new ErrorHandler('Login first to access this resource', 401));
    }
    const decodededData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodededData.id);
    next();
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403));
        }
        next();
    };
};