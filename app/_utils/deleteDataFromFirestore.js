import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

// Function to delete all documents in a given collection
const deleteCollection = async (collectionName) => {
  // Reference to the collection
  const collectionRef = collection(db, collectionName);

  // Fetch all documents from the collection
  const snapshot = await getDocs(collectionRef);

  // Delete each document
  for (const docSnapshot of snapshot.docs) {
    await deleteDoc(doc(db, collectionName, docSnapshot.id));
  }
};

// Function to delete data from multiple collections
export const deleteAllDataFromFirestore = async () => {
  const collectionsToDelete = [
    "checkedInGuards",
    "checkedOutGuards",
    "checkedOutErrors",
  ];

  for (const collectionName of collectionsToDelete) {
    await deleteCollection(collectionName);
  }
};
