const express = require('express');
const router = express.Router();
const utils = require('../controllers/utils');
const authController = require("../controllers/authController");

router.route('/image')
    .get(authController.protect, utils.getImage);

module.exports = router;