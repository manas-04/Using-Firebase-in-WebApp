require("dotenv").config();
const assert = require("assert");

const {
  PORT,
  HOST,
  HOST_URL,
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGE_SENDING_ID,
  APP_ID,
} = process.env;

assert(PORT, "Port is required");
assert(HOST, "Host is required");

module.exports = {
  port: PORT,
  host: HOST,
  hostUrl: HOST_URL,
  firebaseConfig: {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messageSendingId: MESSAGE_SENDING_ID,
    appId: APP_ID,
  },
};
