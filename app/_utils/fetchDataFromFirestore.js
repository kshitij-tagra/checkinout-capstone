import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export const fetchDataFromFirestore = async () => {
  try {
    const checkedInGuardsSnapshot = await getDocs(
      collection(db, "checkedInGuards")
    );
    const checkedOutGuardsSnapshot = await getDocs(
      collection(db, "checkedOutGuards")
    );
    const checkedOutErrorsSnapshot = await getDocs(
      collection(db, "checkedOutErrors")
    );

    const checkedInGuardsData = checkedInGuardsSnapshot.docs.map((doc) =>
      doc.data()
    );
    const checkedOutGuardsData = checkedOutGuardsSnapshot.docs.map((doc) =>
      doc.data()
    );
    const checkedOutErrorsData = checkedOutErrorsSnapshot.docs.map((doc) =>
      doc.data()
    );

    return { checkedInGuardsData, checkedOutGuardsData, checkedOutErrorsData };
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
    throw error;
  }
};
