const admin = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth');

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKeyRaw = process.env.FIREBASE_PRIVATE_KEY;

let initialized = false;

if (projectId && clientEmail && privateKeyRaw) {
  try {
    const privateKey = privateKeyRaw.replace(/\\n/g, '\n');

    if (!admin.apps || admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
    }
    initialized = true;
  } catch (err) {
    console.warn('Firebase Admin SDK initialization failed:', err.message);
    if (err.message.includes('private key') || err.message.includes('PEM')) {
      console.warn('  → FIREBASE_PRIVATE_KEY must be the full PEM block from Firebase Console (starts with "-----BEGIN PRIVATE KEY-----")');
    }
  }
} else {
  console.warn('Firebase Admin SDK: credentials not fully configured');
}

module.exports = admin;
module.exports.isInitialized = () => initialized;
module.exports.getAuth = () => initialized ? getAuth() : null;
