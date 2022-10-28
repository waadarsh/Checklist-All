const express = require("express");
var router = express.Router();

const operatorController = require("../controller/operator");

router.get("/templateList", operatorController.getTemplateList);
router.post("/templateList", operatorController.postTemplateList);

router.get("/executeInspection", operatorController.getExecuteInspection);
router.post("/executeInspection", operatorController.postExecuteInspection);

module.exports = router;