const express = require('express');
const { createPaypalorder , capturePaypalOrder} = require('../controllers/paymentController');
const router = express.Router();


router.route('/create-paypal-order').post(createPaypalorder);
router.route('/capture-paypal-order').post(capturePaypalOrder);
// router.route('/createPatent').post( createPatent);

module.exports = router;