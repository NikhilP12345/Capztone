const admin = require('firebase-admin');
const serviceAccount = require("../capztone-13f68-firebase-adminsdk-m18dv-8f8ab0e673")
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
// var db = admin.firestore();
//
// class Firebase{
//     constructor(collection) {
//         this.collection = collection;
//     }
//     static async findDocumentByCollection() {
//         const trainRef = db.collection(this.collection);
//         const snapshot = await trainRef.get();
//         if (snapshot.empty) {
//             console.log('No matching documents.');
//             return
//         }
//         else{
//             return snapshot
//         }
//     }
// }