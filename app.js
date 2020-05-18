var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var admin = require('firebase-admin');
var serviceAccount = require("./capztone-214f8-firebase-adminsdk-hjiug-fe9e84fb2f.json")
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key:
          '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'
      }
    })
  );

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
    let addDoc = db.collection('Record').add(body)
    .then(ref => {
        res.redirect("/");
    })
})
app.get("/kid", function(req, res) {
    res.render("kid")
})
app.get("/train/data", function(req, res) {
    res.render("data")
})
app.get("/job", function(req, res) {
    res.render("job")
})
app.get("/register", function(req, res) {
    res.render("register")
})
app.post("/register", (req, res) => {
    const body = req.body;
    
    let addDoc = db.collection('Register').add(body)
    .then(ref => {
        return ref;
    })
    .then(doc => {
        res.redirect("/");
        console.log("Hello")
        transporter.sendMail({
            to: "jell@capztone.com",
            from: "info@capztone.com",
            subject: 'New Mail',
            html: `
                <h1>This is the new Enqiry</h1>
                <p> Name - ${body.Name}</p>
                <p> Number - ${body.num}</p>
                <p> Address - ${body.Address}</p>
                <p> Country - ${body.Country}</p>
                <p> Course - ${body.Course}</p>
                <p> DOB - ${body.Dateofbirth}</p>
                <p> Email - ${body.Email}</p>
                <p> Message - ${body.Message}</p>
                <p> StartDate - ${body.startDate}</p>
            `
        }, (err, info) => {
            if(err){
                console.log(err);
                res.redirect("/")
            }
            
        });
    })
    .catch(err => {
        console.log(err)
        res.redirect("/")
    })
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