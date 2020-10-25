const admin = require('../models/firebase')
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY 
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

var db = admin.firestore();
const stripe = require('stripe')(stripeSecretKey)

const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key:
          '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'
      }
    })
  );

exports.getIndex = (req, res, next) => {
    let Authenticated = false;
    let user = {}
    if(!req.user){
        Authenticated = false;
    }
    else{
        Authenticated = true;
        user = req.user
    }
    
    res.render("home/index",{
        Authenticated: Authenticated,
        user: user
    })
}

exports.getAbout = (req, res, next) => {
    let Authenticated = false;
    let user = {}
    if(!req.user){
        Authenticated = false;
    }
    else{
        Authenticated = true;
        user = req.user
    }
    res.render("home/about",{
        Authenticated: Authenticated,
        user: user
    })
}

exports.getStaff = (req, res, next) => {
    let Authenticated = false;
    let user = {}
    if(!req.user){
        Authenticated = false;
    }
    else{
        Authenticated = true;
        user = req.user
    }
    res.render("home/staff",{
        Authenticated: Authenticated,
        user: user
    })
}
exports.getSolution = (req, res, next) => {
    let Authenticated = false;
    let user = {}
    if(!req.user){
        Authenticated = false;
    }
    else{
        Authenticated = true;
        user = req.user
    }
    res.render("home/solution",{
        Authenticated: Authenticated,
        user: user
    })
}

exports.getTrain = async (req, res, next) => {
    let Authenticated = false;
    let user = {}
    if(!req.user){
        Authenticated = false;
    }
    else{
        Authenticated = true;
        user = req.user
    }
    const trainRef = db.collection('Training');
    const snapshot = await trainRef.get();
    if (snapshot.empty) {
        console.log('No matching documents.');
        return;
    }
    res.render("course/train",{
        snapshot: snapshot,
        Authenticated: Authenticated,
        user: user
    })
}

exports.getContact = (req, res, next) => {
    let Authenticated = false;
    let user = {}
    if(!req.user){
        Authenticated = false;
    }
    else{
        Authenticated = true;
        user = req.user
    }
    res.render("home/contact",{
        Authenticated: Authenticated,
        user: user
    })
}

exports.getStaff = (req, res, next) => {
    let Authenticated = false;
    let user = {}
    if(!req.user){
        Authenticated = false;
    }
    else{
        Authenticated = true;
        user = req.user
    }
    res.render("home/staff",{
        Authenticated: Authenticated,
        user: user
    })
}


exports.getJob = (req, res, next) => {
    let Authenticated = false;
    let user = {}
    if(!req.user){
        Authenticated = false;
    }
    else{
        Authenticated = true;
        user = req.user
    }
    res.render("home/job",{
        Authenticated: Authenticated,
        user: user
    })
}

exports.getRegister = (req, res, next) => {
    let Authenticated = false;
    let user = {}
    if(!req.user){
        Authenticated = false;
    }
    else{
        Authenticated = true;
        user = req.user
    }
    res.render("register",{
        Authenticated: Authenticated,
        user: user
    })
}
exports.getEnrollNow = (req, res, next) => {
    res.redirect("https://docs.google.com/forms/d/e/1FAIpQLSeUSKH3ACHFNvrxXFgGJAZQdZWFfbNwTlnL5lJyESgf6EXvJQ/viewform")
}

exports.getCourses = async (req, res, next) => {
    let Authenticated = false;
    let user = {}
    if(!req.user){
        Authenticated = false;
    }
    else{
        Authenticated = true;
        user = req.user
    }
    let course = "";
    const courseId = req.params.trainId;
    const trainRef = db.collection('MainContent');
    const snapshot = await trainRef.get();
    if (snapshot.empty) {
        console.log('No matching drgdocuments.');
        return;
    }
    snapshot.forEach(doc => {
        if(doc.id == courseId){
            course = doc.id
        }
    })
    if(course == "" ){
        console.log("no Such Course")
    }
    else{
        const head = db.collection('MainContent').doc(courseId)
        const about = db.collection('MainContent').doc(courseId).collection('About')
        const batch = db.collection('MainContent').doc(courseId).collection('Batch Schedule')
        const certification = db.collection('MainContent').doc(courseId).collection('Certification')
        const placements = db.collection('MainContent').doc(courseId).collection('Placements').doc('dTBEhnN43IUmGkw4a1bJ')
        const tProfle = db.collection('MainContent').doc(courseId).collection('Trainer Profile').doc('udonYFeb7YQT7WRmokU5')
        const syllabus = db.collection('MainContent').doc(courseId).collection('Syllabus')
        const faq = db.collection('MainContent').doc(courseId).collection('FAQ');

        const Head = await head.get();
        const About = await about.get();
        const Batch = await batch.get();
        const Certification = await certification.get();
        const Placements = await placements.get();
        const TProfile = await tProfle.get();
        const Syllabus = await syllabus.get();
        const Faq = await faq.get();

        if( (!Placements.exists)&&(!TProfile.exists)&&(!Head.exists )&&(About.empty || Batch.empty || Certification.empty ||  Syllabus.empty || Faq.empty)){
            console.log("No matching document")
        }
        else{
            res.render('course/course', {
                Head: Head,
                About: About,
                Batch: Batch,
                Certification: Certification,
                Placements: Placements,
                TProfile: TProfile,
                Syllabus:Syllabus,
                Faq:Faq,
                Name:courseId,
                Authenticated:Authenticated,
                user: user
            })

        }
    }






}

exports.getSyllabus = async (req, res, next) => {
    let Authenticated = false;
    let user = {}
    if(!req.user){
        Authenticated = false;
    }
    else{
        Authenticated = true;
        user = req.user
    }
    const trainId = req.params.trainId;
    const syllabusId = req.params.syllabusId;
    console.log(syllabusId)
    const temp = db.collection('MainContent').doc(trainId).collection('Syllabus');
    const snapshot = await temp.where('Name', '==', syllabusId).get();
    if (snapshot.empty) {
        console.log('No matching documents.');
        return;
    }
    let s = ""
    snapshot.forEach(doc => {
        s = doc.id;
    })
    if(s == ""){
        console.log("No Such Syllabus")
        return;
    }
    else{
        const syllabusT = db.collection('MainContent').doc(trainId).collection('Syllabus').doc(s);
        const SyllabusTrain = await syllabusT.get();
        // console.log(SyllabusTrain.data())
        res.render('course/syllabusTrain', {
            SyllabusTrain:SyllabusTrain,
            Authenticated: Authenticated,
            user: user
        })
    }


}

exports.getPayment = async (req, res, next) => {
    const productId = req.params.trainId;
    let Authenticated = false;
    let user = {}
    if(!req.user){
        Authenticated = false;
    }
    else{
        Authenticated = true;
        user = req.user
    }
    const paymentRef = db.collection('Training');
    const paymentDoc = await paymentRef.get();
    let trainDoc = {};
    paymentDoc.forEach(doc => {
        if(doc.data().Name == productId){
            trainDoc = doc.data()
        }
    })
    res.render('course/payment', {
        Authenticated: Authenticated,
        user: user,
        trainDoc: trainDoc,
        key: stripePublicKey
    })
}

exports.getSuccess = (req, res, next) => {
    console.log(req.query.id)
    res.render("home/success")
}
exports.postCreateSession = async(req, res, next) => {
    const trainRef = db.collection('Training');
    const trainDoc = await trainRef.where("Name", "==", req.body.name).get();
    let constId = "";
    trainDoc.forEach((doc) => {
        constId = doc.data().stripePaymentId;
    })
    console.log(constId)
    const session = await stripe.checkout.sessions.create({
        success_url: 'http://localhost:5000/success?id={CHECKOUT_SESSION_ID}',
        cancel_url:'http://localhost:5000/cancel',
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [{
             price:constId,
            quantity: 1
        }]
    });

    res.json({
        id: session.id 
    })
}
exports.postRegister = (req, res, next) => {
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
                <p> Payment - Google Pay </p>   
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
}

exports.postContact = (req, res, next) => {
    const body = req.body;
    let addDoc = db.collection('Record').add(body)
    .then(ref => {
        res.redirect("/");
    })
}

