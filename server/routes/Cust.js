const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const Info = require('../controllers/Info');

router.get('/', auth.check, Info.Cust);
router.get('/info', Info.Info);
router.get('/subs', auth.check, Info.Subs);

module.exports = router;