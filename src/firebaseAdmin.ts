import * as admin from 'firebase-admin';

const serviceAccount = require('./config/service-account.json');

// Initialize Firebase Admin SDK.
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  // Specify the storage bucket URL here. This is used for Firebase Storage operations.
  storageBucket: 'gs://weather-app-f801d.appspot.com',
});

export default admin;
