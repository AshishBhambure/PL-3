const express = require('express');
const { signUp, login } = require('../controllers/Auth');
const { route } = require('./bookroutes');
const router  = express.Router();

router.post('/signup',signUp);
router.post('/login',login);
module.exports = router;