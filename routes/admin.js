const express = require("express");
const { auth } = require("firebase-admin");

const adminController = require('../controllers/admin');

const router = express.Router();

const authCheck = (req, res, next) => {

    if(req.params.adminId == "1" && req.params.admin2Id == "2" && req.params.admin3Id == "3"){
        next();
    }
    else{
        res.redirect("/")
    }
}

router.get("/:adminId/:admin2Id/:admin3Id", authCheck, adminController.getAdmin);

router.get("/:adminId/:admin2Id/:admin3Id/add", authCheck, adminController.getAddCourses);

router.post("/:adminId/:admin2Id/:admin3Id/training", authCheck, adminController.postAddTraining)
router.post("/:adminId/:admin2Id/:admin3Id/header", authCheck, adminController.postAddHeader)
router.post("/:adminId/:admin2Id/:admin3Id/batch", authCheck, adminController.postAddBatch)
router.post("/:adminId/:admin2Id/:admin3Id/exam", authCheck, adminController.postAddExam)
router.post("/:adminId/:admin2Id/:admin3Id/faq", authCheck, adminController.postAddFaq)
router.post("/:adminId/:admin2Id/:admin3Id/trainer", authCheck, adminController.postAddTrainer)
router.post("/:adminId/:admin2Id/:admin3Id/placement", authCheck, adminController.postAddPlacement)





module.exports = router;
