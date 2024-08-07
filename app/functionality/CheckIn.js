import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import GuardCheckInForm from "../components/GuardCheckInForm";
import GuardList from "../components/GuardList";
import GuardSearch from "../components/GuardSearch";
import ConfirmationBox from "../components/ConfirmationBox";

const CheckIn = () => {
  const [guards, setGuards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGuard, setSelectedGuard] = useState(null);
  const [guardDetails, setGuardDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const db = getFirestore();

  const fetchGuards = async () => {
    const guardCollection = collection(db, "guards");
    const guardSnapshot = await getDocs(guardCollection);
    const guardList = guardSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Fetch checked-in guards
    const checkedInCollection = collection(db, "checkedInGuards");
    const checkedInSnapshot = await getDocs(checkedInCollection);
    const checkedInList = checkedInSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const checkedInGuardIds = checkedInList
      .filter((guard) => !guard.checkedOut) // Filter out guards who are not checked out
      .map((guard) => guard.guard.id);

    const filteredGuards = guardList.filter((guard) => {
      const nameMatch = guard.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const corpsIDMatch = guard.corpsID.toString().includes(searchQuery);
      const notCheckedIn = !checkedInGuardIds.includes(guard.id);
      return (nameMatch || corpsIDMatch) && notCheckedIn;
    });

    setGuards(filteredGuards);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleGuardSelect = (guard) => {
    setSelectedGuard(guard);
    setSearchQuery("");
  };

  const handleCancel = () => {
    setSelectedGuard(null);
  };

  const handleSubmit = async (checkInData) => {
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);

    await addDoc(collection(db, "checkedInGuards"), {
      guard: selectedGuard,
      ...checkInData,
      checkedOut: false,
      borrowedItems: {
        camsat: checkInData.camsatNumber ? "true" : "false",
        radio: checkInData.radioNumber ? "true" : "false",
        cuff: checkInData.cuffNumber ? "true" : "false",
        vest: checkInData.casualVest === "yes" ? "true" : "false",
        earplugs: checkInData.casualEarplugs === "yes" ? "true" : "false",
      },
    });
    if (checkInData.selectedCuffID) {
      await updateDoc(doc(db, "equipments", checkInData.selectedCuffID), {
        available: false,
      });
    }
    await updateDoc(doc(db, "equipments", checkInData.selectedCamsetID), {
      available: false,
    });
    await updateDoc(doc(db, "equipments", checkInData.selectedRadioID), {
      available: false,
    });

    setGuardDetails(selectedGuard);
    setSelectedGuard(null);
    setShowPopup(true);
    setIsSubmitting(false); // Re-enable submission for future check-ins
  };

  useEffect(() => {
    if (searchQuery) {
      fetchGuards();
    } else {
      setGuards([]);
    }
  }, [searchQuery]);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold text-center mb-4">
        - Check In Guard -
      </h1>
      <GuardSearch
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      {searchQuery && !selectedGuard && (
        <GuardList guards={guards} onSelectGuard={handleGuardSelect} />
      )}
      {selectedGuard && (
        <GuardCheckInForm
          guard={selectedGuard}
          onCheckInFormSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting} // Pass isSubmitting to the form
        />
      )}
      {showPopup && (
        <ConfirmationBox
          guard={guardDetails}
          onClose={closePopup}
          heading="Check In Successful"
          message={`"${guardDetails.name} (#${guardDetails.corpsID})" has been checked in!`}
        />
      )}
    </div>
  );
};

export default CheckIn;
