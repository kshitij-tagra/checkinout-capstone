const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
const prompt = require("prompt-sync")({ sigint: true });

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
});

const db = admin.firestore();
const auth = admin.auth();

async function getSupervisorDetails() {
  const name = prompt("Enter supervisor name: ");
  const corpsID = prompt("Enter corps ID: ");
  const email = prompt("Enter email: ");
  const phoneNumber = prompt("Enter phone number: ");
  return { name, corpsID: parseInt(corpsID, 10), email, phoneNumber };
}

async function addSupervisor(supervisor) {
  const password = `${supervisor.name.split(" ")[0]}@123`;
  try {
    // Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email: supervisor.email,
      password: password,
    });

    // Add supervisor data to Firestore
    await db.collection("supervisors").doc(userRecord.uid).set({
      name: supervisor.name,
      corpsID: supervisor.corpsID,
      email: supervisor.email,
      phoneNumber: supervisor.phoneNumber,
    });

    console.log(`Successfully added supervisor: ${supervisor.name}`);
  } catch (error) {
    console.error(`Error adding supervisor ${supervisor.name}:`, error);
  }
}

async function main() {
  const supervisorCount = prompt("How many supervisors do you want to add? ");
  for (let i = 0; i < parseInt(supervisorCount, 10); i++) {
    const supervisor = await getSupervisorDetails();
    await addSupervisor(supervisor);
  }
  console.log("Finished adding supervisors");
  process.exit(0);
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
