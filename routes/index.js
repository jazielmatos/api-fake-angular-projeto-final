const express = require('express');
const router = express.Router();
const HomeController = require('../controller/homeController');
/* GET home page. */
router.get('/', HomeController.index);

module.exports = router;
