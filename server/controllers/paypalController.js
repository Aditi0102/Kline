const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.createPaypalOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    const order = await paypal.createOrder(req.body);
    res.json(order);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

exports.capturePaypalOrder = catchAsyncErrors( async (req, res, next) => {
  const { orderID } = req.body;
  try {
    const captureData = await paypal.capturePayment(orderID);
    res.json(captureData);
  } catch (err) {
    res.status(500).send(err.message);
  }
});