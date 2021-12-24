const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const config = require("./config");

const app = initializeApp(config.firebaseConfig);
module.exports.db = getFirestore(app);
