const admin = require('../models/firebase')

var db = admin.firestore();

exports.getIndex = (req, res, next) => {
    res.render('kid/home/index')
}