
const express = require('express');
const router = express.Router();
const apiController = require('../controller/api.controller');

router.post('/setFormData', apiController.setFormData);
router.post('/getFormData', apiController.getFormData);

module.exports = router;