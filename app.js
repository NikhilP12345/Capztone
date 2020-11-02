const path = require('path');

const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const errorController = require('./controllers/error');
const cookieSession = require('cookie-session');
const passport = require('passport')

app.set("view engine", "ejs")
app.set('views', 'views');


const adminRoutes = require('./routes/admin');
const customRoutes = require('./routes/custom');
const authRoutes = require('./routes/auth');
const kidRoutes = require('./routes/kid')
const indexRoute = require('./routes/index')


app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: ['thecapztoneisawsomeiguess']
}))

app.use(passport.initialize());
app.use(passport.session())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

var myLogger = function (req, res, next) {
    console.log('LOGGED')
    next()
}
app.use(indexRoute)
app.use('/admin', adminRoutes);
app.use('/it',customRoutes);
app.use('/kid', kidRoutes)
app.use(authRoutes);
// app.use(errorController.get404);

const PORT = process.env.PORT || 5000
app.listen(PORT, process.env.IP, function() {
    console.log("Product started")
})