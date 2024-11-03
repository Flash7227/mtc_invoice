const express = require('express');
const router = express.Router();
const Cust = require('../controllers/Cust');

router.get('/',  Cust.Cust);
router.get('/info', Cust.CustInfo);
router.get('/subs', Cust.Subs);
router.get('/products', Cust.Products);

module.exports = router;