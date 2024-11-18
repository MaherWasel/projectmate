const express = require('express');
const router = express.Router();
const project = require('../controllers/project');


router.route('/:id')
    .get(project.getProject);

module.exports = router;