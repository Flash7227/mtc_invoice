const express = require('express');
const router = express.Router();
const Users = require('../controllers/Users');
const auth = require("../middleware/auth");


router.get('/list', Users.List);
// router.post('/login', Users.Login);
// router.post('/', auth.checkAdmin, Users.Create);
// router.put('/', auth.checkAdmin, Users.Edit);
// router.delete('/', auth.checkAdmin, Users.Delete);


module.exports = router;