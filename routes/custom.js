const express = require("express");
const { app } = require("firebase-admin");

const customController = require('../controllers/custom');

const router = express.Router();

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect("/it");
    }
    else{
        next();
    }
}

router.get("/", customController.getIndex)

router.get("/about", customController.getAbout)

router.get("/staff", customController.getStaff)

router.get("/solution", customController.getSolution)

router.get("/train", customController.getTrain)

router.get("/contact", customController.getContact)

router.post("/contact", customController.postContact)


router.get("/job", customController.getJob)
router.get("/register", customController.getRegister)

router.post("/register", customController.postRegister)

router.get("/train/:trainId", customController.getCourses)

router.get("/train/:trainId/payment", authCheck, customController.getPayment);

router.get("/train/:trainId/:syllabusId", customController.getSyllabus);

router.get("/success", customController.getSuccess);

router.post("/create-checkout-session", customController.postCreateSession)

router.get("/EnrollNow", function(req, res) {
    res.redirect("https://docs.google.com/forms/d/e/1FAIpQLSeUSKH3ACHFNvrxXFgGJAZQdZWFfbNwTlnL5lJyESgf6EXvJQ/viewform")
})

module.exports = router;
