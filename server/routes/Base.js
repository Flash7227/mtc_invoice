const express = require('express');
const router = express.Router();
const Base = require('../controllers/Base');

router.get('/send',  Base.Send);
router.get('/banks',  Base.Banks);
router.get('/addresscode',  Base.addressCodeList);
router.put('/addresscode',  Base.addressCodeUpdate);
router.get('/locations', Base.Locations);

module.exports = router;