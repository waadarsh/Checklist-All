const express = require("express");
var router = express.Router();

const landingController = require("../controller/landing");

router.get("/home", landingController.getHome);
router.get("/main", landingController.getlanding);
router.post("/main", landingController.postlanding);


module.exports = router;