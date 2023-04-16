const express = require('express');
const { createPaypalOrder , capturePaypalOrder} = require('../controllers/paypalController');
const router = express.Router();

router.post('/create-paypal-order' , createPaypalOrder);
router.post('/capture-paypal-order' ,capturePaypalOrder);
// router.route('/createPatent').post( createPatent);

module.exports = router;