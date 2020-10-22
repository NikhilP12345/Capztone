var express = require('express');
var router = express.Router();
var passport = require('passport');
const admin = require('../models/firebase');
const db = admin.firestore();
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const usersRef = db.collection('Users');
    const snapshot = await usersRef.where('id', '==',id).get();
    let data = {};
    snapshot.forEach(doc => {
        data = doc.data();
    })
    done(null, data)
})
// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
        clientID: '51084394084-6dcdeq0ichbg0as0u3e7s82b4vto06h7.apps.googleusercontent.com',
        clientSecret: 'e-UPMNHYQHmj8FXG8cVnytGr',
        callbackURL: "http://localhost:5000/auth/google/redirect"
    },
    async (accessToken, refreshToken, profile, done) => {
        const dummyProfile = {
            id: profile.id,
            displayName: profile.displayName,
            Name: profile.name,
            Image: profile.photos,
            Payment: []
        };
        const usersRef = db.collection('Users');
        const snapshot = await usersRef.where('id', '==', profile.id).get();
        if(snapshot.empty){
            const newFieldRef = await db.collection('Users').add(dummyProfile)
        }
        return done(null, dummyProfile)
    }
));

router.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/redirect',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // res.send(req.user)
        res.redirect("/")
    });

router.get("/logout", (req,res) => {
    req.logout();
    res.redirect("/")
})

module.exports = router;