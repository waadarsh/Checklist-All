const express = require("express");
var router = express.Router();

const adminController = require("../controller/admin");

router.get("/adminPanel", adminController.getAdmin);
router.post("/adminPanel", adminController.postAdmin);

module.exports = router;