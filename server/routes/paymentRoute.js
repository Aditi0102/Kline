const express = require('express');
const { processPayment, sendStripeApiKey , sendClientSecretKey, createPatent} = require('../controllers/paymentController');
const router = express.Router();
const { isAuthenticatedUser } = require('../middleware/auth');

router.route('/payment/process').post(processPayment);

router.route('/stripeapikey').get(sendStripeApiKey);
router.route('/stripeclientsecret').get(sendClientSecretKey);
// router.route('/createPatent').post( createPatent);

module.exports = router;
