import React, { useState, useEffect } from "react";
import GuardCheckOutForm from "../components/GuardCheckOutForm";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../_utils/firebase";
import ConfirmationBox from "../components/ConfirmationBox";

const CheckOut = () => {
  const [checkedInData, setCheckedInData] = useState([]);
  const [selectedCheckIn, setSelectedCheckIn] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [checkedOutGuard, setCheckedOutGuard] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function fetchCheckedInGuards() {
    const res = await getDocs(collection(db, "checkedInGuards"));
    const allCheckedInGuards = res.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // Filter out guards who are checked out
    const activeCheckedInGuards = allCheckedInGuards.filter(
      (guard) => !guard.checkedOut
    );
    setCheckedInData(activeCheckedInGuards);
  }

  useEffect(() => {
    fetchCheckedInGuards();
  }, []);

  const handleCancel = () => {
    setSelectedCheckIn(null);
  };

  const handleSubmit = async (e, returnedStuff) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);

    const currentCheckIn = selectedCheckIn;
    const isFaultyCheckOut =
      Object.values(returnedStuff).find((val) => val === "false") === undefined
        ? false
        : true;

    async function makeEquipmentAvailable(eqpId) {
      await updateDoc(doc(db, "equipments", eqpId), {
        available: true,
      });
    }

    if (!isFaultyCheckOut) {
      await makeEquipmentAvailable(currentCheckIn.selectedCamsetID);
      await makeEquipmentAvailable(currentCheckIn.selectedRadioID);
      if (currentCheckIn.selectedCuffID) {
        await makeEquipmentAvailable(currentCheckIn.selectedCuffID);
      }
    } else {
      if (returnedStuff.camsat === "true") {
        await makeEquipmentAvailable(currentCheckIn.selectedCamsetID);
      }
      if (returnedStuff.radio === "true") {
        await makeEquipmentAvailable(currentCheckIn.selectedRadioID);
      }
      if (currentCheckIn.selectedCuffID && returnedStuff.cuff === "true") {
        await makeEquipmentAvailable(currentCheckIn.selectedCuffID);
      }

      await addDoc(collection(db, "checkedOutErrors"), {
        ...currentCheckIn,
        returnErrors: returnedStuff,
      });
    }

    await addDoc(collection(db, "checkedOutGuards"), {
      checkInData: currentCheckIn,
      guard: currentCheckIn.guard,
      returnReport: returnedStuff,
    });

    // Update the checkedInGuard document to indicate the guard is checked out
    await updateDoc(doc(db, "checkedInGuards", currentCheckIn.id), {
      checkedOut: true, // Ensure this is correctly updating
    });

    setCheckedOutGuard(currentCheckIn.guard);
    setShowPopup(true);

    setSelectedCheckIn(null);
    setIsSubmitting(false);
    fetchCheckedInGuards();
  };

  const closePopup = () => {
    setShowPopup(false);
    setCheckedOutGuard(null);
  };

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold text-center mb-4">
        - Check Out Guard -
      </h1>

      <div className="flex justify-center">
        <select
          className="w-full max-w-md p-3 mb-4 border border-gray-300 rounded"
          id="guardSelect"
          value={selectedCheckIn ? selectedCheckIn.id : ""}
          onChange={(e) => {
            if (e.target.value !== "") {
              setSelectedCheckIn(
                checkedInData.find((checkin) => checkin.id === e.target.value)
              );
            } else {
              setSelectedCheckIn(null);
            }
          }}
        >
          <option value={""} disabled>
            Choose Guard to Check Out
          </option>
          {checkedInData.map((checkIn) => (
            <option key={checkIn.id} value={checkIn.id}>
              {checkIn.guard.name} (#{checkIn.guard.corpsID})
            </option>
          ))}
        </select>
      </div>

      {selectedCheckIn && (
        <GuardCheckOutForm
          guard={selectedCheckIn.guard}
          borrowedCuffs={selectedCheckIn.selectedCuffID ? true : false}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting} // Pass isSubmitting to the form if needed
        />
      )}

      {showPopup && checkedOutGuard && (
        <ConfirmationBox
          guard={checkedOutGuard}
          onClose={closePopup}
          heading="Check Out Successful"
          message={`"${checkedOutGuard.name} (#${checkedOutGuard.corpsID})" has been checked out!`}
        />
      )}
    </div>
  );
};

export default CheckOut;
