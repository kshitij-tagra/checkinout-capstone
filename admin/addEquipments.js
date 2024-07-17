const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
const prompt = require("prompt-sync")({ sigint: true });

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
});

const db = admin.firestore();

function isValidNumber(input, length) {
  const numberPattern = new RegExp(`^\\d{${length}}$`);
  return numberPattern.test(input);
}

async function getEquipmentDetails(deviceType) {
  deviceType = deviceType.toUpperCase();
  let deviceNumber, devicePouchNumber;

  if (deviceType === "CAM") {
    deviceNumber = prompt("Enter CAMSAT# (3 digit number): ");
    while (!isValidNumber(deviceNumber, 3)) {
      console.log("Invalid input. Please enter a 3 digit number.");
      deviceNumber = prompt("Enter CAMSAT# (3 digit number): ");
    }
    devicePouchNumber = prompt("Enter CAMSAT pouch# (2 digit number): ");
    while (!isValidNumber(devicePouchNumber, 2)) {
      console.log("Invalid input. Please enter a 2 digit number.");
      devicePouchNumber = prompt("Enter CAMSAT pouch# (2 digit number): ");
    }
  } else if (deviceType === "RAD") {
    deviceNumber = prompt("Enter radio# (3 digit number): ");
    while (!isValidNumber(deviceNumber, 3)) {
      console.log("Invalid input. Please enter a 3 digit number.");
      deviceNumber = prompt("Enter radio# (3 digit number): ");
    }
    devicePouchNumber = prompt("Enter radio pouch# (2 digit number): ");
    while (!isValidNumber(devicePouchNumber, 2)) {
      console.log("Invalid input. Please enter a 2 digit number.");
      devicePouchNumber = prompt("Enter radio pouch# (2 digit number): ");
    }
  } else if (deviceType === "CUF") {
    deviceNumber = prompt("Enter cuff# (2 digit number): ");
    while (!isValidNumber(deviceNumber, 2)) {
      console.log("Invalid input. Please enter a 2 digit number.");
      deviceNumber = prompt("Enter cuff# (2 digit number): ");
    }
    devicePouchNumber = null; // No pouch for cuffs
  } else {
    console.log("Invalid device type");
    return null;
  }

  return { deviceType, deviceNumber, devicePouchNumber };
}

async function addEquipment(equipment) {
  try {
    // Add equipment data to Firestore
    await db.collection("equipments").add({
      deviceType: equipment.deviceType,
      "device#": equipment.deviceNumber,
      "devicePouch#": equipment.devicePouchNumber,
    });

    console.log(
      `Successfully added equipment: ${equipment.deviceType} #${equipment.deviceNumber}`
    );
  } catch (error) {
    console.error(
      `Error adding equipment ${equipment.deviceType} #${equipment.deviceNumber}:`,
      error
    );
  }
}

async function main() {
  const deviceCount = prompt("How many devices do you want to add? ");
  for (let i = 0; i < parseInt(deviceCount, 10); i++) {
    const deviceType = prompt(
      "Enter device type (CAM for camsat, RAD for radio, CUF for cuff): "
    );
    const equipment = await getEquipmentDetails(deviceType);
    if (equipment) {
      await addEquipment(equipment);
    }
  }
  console.log("Finished adding equipments");
  process.exit(0);
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
