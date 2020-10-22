const admin = require('../models/firebase')
var db = admin.firestore();

exports.getAdmin = (req, res, next) => {
    res.render("admin/admin", {
        id1: req.params.adminId,
        id2: req.params.admin2Id,
        id3: req.params.admin3Id
    })
}
exports.getAddCourses = (req, res, next) => {
    res.render("admin/add", {
        id1: req.params.adminId,
        id2: req.params.admin2Id,
        id3: req.params.admin3Id
    })
}
exports.postAddTraining =  (req, res, next) => {
    console.log(req.body)
}
exports.postAddHeader =  (req, res, next) => {
    console.log(req.body)
}
exports.postAddBatch =  (req, res, next) => {
    console.log(req.body)
}
exports.postAddExam =  (req, res, next) => {
    console.log(req.body)
}
exports.postAddFaq =  (req, res, next) => {
    console.log(req.body)
}
exports.postAddTrainer =  (req, res, next) => {
    console.log(req.body)
}
exports.postAddPlacement =  (req, res, next) => {
    console.log(req.body)
}
