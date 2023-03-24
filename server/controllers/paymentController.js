const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.body , '')
  const shipping = {
    name: req.body.user.name,
    address: {
      line1: req.body.shippingInfo.address,
      postal_code: req.body.shippingInfo.pinCode,
      city: req.body.shippingInfo.city,
      state: req.body.shippingInfo.state,
      country: req.body.shippingInfo.country,
    },
  };
  
  // console.log('this api got hit')
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
    description: "Kline Decor Store",
    shipping: shipping,
    // metadata: { integration_check: "accept_a_payment" },
  });

  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});

exports.sendClientSecretKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_SECRET_KEY,
  });
});
