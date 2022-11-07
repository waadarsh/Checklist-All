const express = require("express");
var router = express.Router();

const reportController = require("../controller/report");

router.get("/report", reportController.getReports);
router.post("/report", reportController.postReports);


module.exports = router;