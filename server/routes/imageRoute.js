const express = require('express');
const { createImage } = require('../controllers/createImageController.js');
const { getImage } = require('../controllers/getImageController.js');

const router = express.Router();


router.post('/', createImage)

router.get('/', getImage)


module.exports = router;