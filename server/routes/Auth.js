const express = require('express');
const router = express.Router();
const authController = require('../controllers/Auth');
// const middlewareAuth = require("../middleware/auth");


router.get('/', authController.List);
// router.post('/', auth.checkAdmin, Users.Create);
// router.put('/', auth.checkAdmin, Users.Edit);
// router.delete('/', auth.checkAdmin, Users.Delete);
router.post('/login', authController.Login);
router.get('/logout', authController.Logout);



module.exports = router;