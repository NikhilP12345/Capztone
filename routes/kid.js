const express = require("express");
const { app } = require("firebase-admin");

const kidController = require('../controllers/kid');

const router = express.Router();

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect("/kid");
    }
    else{
        next();
    }
}

router.get("/", kidController.getIndex)
