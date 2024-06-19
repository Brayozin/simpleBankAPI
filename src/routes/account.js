const express = require("express");

const accountController = require("../controllers/accountController");

const router = express.Router();

router.get('/balance', accountController.getBalance);

router.post('/event', accountController.handleEvents);

router.post('/reset', accountController.resetAccounts);
module.exports = router;
