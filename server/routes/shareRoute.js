const express = require('express');
const { shareImage } = require('../controllers/shareImageController.js')

const router = express.Router();


router.post('/', shareImage)

module.exports = router;