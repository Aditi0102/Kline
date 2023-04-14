const express = require('express');
const { createPaypalOrder , capturePaypalOrder} = require('../controllers/paypalController');
const router = express.Router();


router.route('/create-paypal-order').post(createPaypalOrder);
router.route('/capture-paypal-order').post(capturePaypalOrder);
// router.route('/createPatent').post( createPatent);

module.exports = router;