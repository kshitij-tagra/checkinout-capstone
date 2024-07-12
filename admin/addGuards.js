const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
const prompt = require("prompt-sync")({ sigint: true });

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
});

const db = admin.firestore();

async function getGuardDetails() {
  const name = prompt("Enter guard name: ");
  const corpsID = prompt("Enter corps ID: ");
  return { name, corpsID: parseInt(corpsID, 10) };
}

async function addGuard(guard) {
  try {
    // Add guard data to Firestore
    await db.collection("guards").add({
      name: guard.name,
      corpsID: guard.corpsID,
    });

    console.log(`Successfully added guard: ${guard.name}`);
  } catch (error) {
    console.error(`Error adding guard ${guard.name}:`, error);
  }
}

async function main() {
  const guardCount = prompt("How many guards do you want to add? ");
  for (let i = 0; i < parseInt(guardCount, 10); i++) {
    const guard = await getGuardDetails();
    await addGuard(guard);
  }
  console.log("Finished adding guards");
  process.exit(0);
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
