const admin = require('firebase-admin');
const serviceAccount = require("../capztone-13f68-firebase-adminsdk-m18dv-8f8ab0e673")
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;