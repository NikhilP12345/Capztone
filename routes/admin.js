const express = require("express");

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

router.get("/:adminId/:admin2Id/:admin3Id", authCheck, adminController.getAdmin)


module.exports = router;
