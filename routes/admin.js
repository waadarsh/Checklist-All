const express = require("express");
var router = express.Router();

const adminController = require("../controller/admin");

router.get("/admin", adminController.getAdmin);
router.post("/admin", adminController.postAdmin);

module.exports = router;