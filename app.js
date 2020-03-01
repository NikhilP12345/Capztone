var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var admin = require('firebase-admin');
var serviceAccount = require("./capztone-214f8-firebase-adminsdk-hjiug-fe9e84fb2f.json")
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

app.get("/", function(req, res) {
    res.render("index")
})

app.get("/about", function(req, res) {
    res.render("about")
})
app.get("/staff", (req, res) => {
    res.render("staff")
})
app.get("/solution", (req, res) => {
    res.render("solution")
})
app.get("/train", function(req, res) {
    res.render("train")
})
app.get("/contact", function(req, res) {
    res.render("contact")
})
app.post("/contact", function(req, res) {
    const body = req.body;
    let addDoc = db.collection('Record').add(body).then(ref => {
        res.redirect("/");
    });
})
app.get("/kid", function(req, res) {
    res.render("kid")
})
app.get("/train/data", function(req, res) {
    res.render("data")
})
app.get("/train/bi", function(req, res) {
    res.render("bi")
})
app.get("/train/bi/powerbi", function(req, res) {
    res.render("powerbi")
})
app.get("/train/bi/qlik", function(req, res) {
    res.render("qlik")
})
app.get("/train/bi/tableau", function(req, res) {
    res.render("tableau")
})
app.get("/train/data/syllabus", function(req, res) {
    res.render("syllabus")
})
const PORT = process.env.PORT || 5000
app.listen(PORT, process.env.IP, function() {
    console.log("Product started")
})