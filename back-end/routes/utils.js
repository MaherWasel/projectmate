const express = require('express');
const router = express.Router();
const utils = require('../controllers/utils');

router.route('/image')
    .get(utils.getImage);

module.exports = router;