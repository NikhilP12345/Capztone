const admin = require('../models/firebase')
var db = admin.firestore();

exports.getAdmin = (req, res, next) => {
    res.render("admin/starter")
}