const express = require('express');
const { regBook, getAllBooks, updateBookInfo, deleteBook, uploadImage } = require('../controllers/book.controller');
const { auth } = require('../middleware/Auth');
const router  = express.Router();

router.post('/regBook',auth,regBook);
router.get('/getAllBooks',auth,getAllBooks);
router.put('/updateBookInfo',updateBookInfo);
router.delete('/deleteBook',deleteBook);
router.post('/uploadImage',uploadImage)
module.exports = router;