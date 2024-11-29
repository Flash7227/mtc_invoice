const express = require('express');
const router = express.Router();
const Invoice = require('../controllers/Invoice');
const InvoiceCreate = require('../controllers/InvoiceCreate');

router.post('/calculate',  InvoiceCreate.Calculate);

module.exports = router;