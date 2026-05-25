import admin from "firebase-admin";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

// If serviceAccountKey.json is inside src folder:
// const serviceAccount = require("../serviceAccountKey.json");

let serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_JSON);

// Fix newlines in private_key
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');

// If serviceAccountKey.json is in the root Server folder, use this instead:
// const serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const auth = admin.auth();
export const db = admin.firestore();