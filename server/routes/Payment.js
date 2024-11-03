const express = require('express');
const router = express.Router();
const Payment = require('../controllers/Payment');

router.get('/other',  Payment.OtherList);


module.exports = router;