import React, { useState, useEffect } from "react";
import GuardCheckOutForm from "../components/GuardCheckOutForm";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../_utils/firebase";

const CheckOut = () => {
  // Temporary mock data for signed-in guards
  const [checkedInData, setCheckedInData] = useState([]);
  const [selectedCheckIn, setSelectedCheckIn] = useState(null);

  async function fetchCheckedInGuards() {
    const res = await getDocs(collection(db, "checkedInGuards"));
    const allCheckedInGuards = res.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCheckedInData(allCheckedInGuards);
  }

  useEffect(() => {
    fetchCheckedInGuards();
  }, []);

  // Function to handle form cancel
  const handleCancel = () => {
    setSelectedCheckIn(null);
  };

  // Function to handle form submit
  const handleSubmit = async (e, returnedStuff) => {
    e.preventDefault();
    const currentCheckIn = selectedCheckIn;
    // Handle guard sign-out logic here

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
      // everything was returned at time of checkout
      await makeEquipmentAvailable(currentCheckIn.selectedCamsetID);
      await makeEquipmentAvailable(currentCheckIn.selectedRadioID);
      if (currentCheckIn.selectedCuffID) {
        await makeEquipmentAvailable(currentCheckIn.selectedCuffID);
      }
    } else {
      console.log("Stuff returned", returnedStuff);
      // make the returned items available
      if (returnedStuff.camsat === "true") {
        await makeEquipmentAvailable(currentCheckIn.selectedCamsetID);
      }
      if (returnedStuff.radio === "true") {
        await makeEquipmentAvailable(currentCheckIn.selectedRadioID);
      }
      if (currentCheckIn.selectedCuffID && returnedStuff.cuff === "true") {
        await makeEquipmentAvailable(currentCheckIn.selectedCuffID);
      }

      // create a report that the return was faulty

      await addDoc(collection(db, "checkedOutErrors"), {
        ...currentCheckIn,
        returnErrors: returnedStuff,
      });
    }

    // checkout the guard
    await addDoc(collection(db, "checkedOutGuards"), {
      checkInData: currentCheckIn,
      guard: currentCheckIn.guard,
      returnReport: returnedStuff,
    });

    await deleteDoc(doc(db, "checkedInGuards", currentCheckIn.id));

    setSelectedCheckIn(null);
    fetchCheckedInGuards();
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
          value={selectedCheckIn === null ? "" : selectedCheckIn}
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
          {checkedInData.map((checkIn) => {
            console.log(checkIn);
            return (
              <option key={checkIn.id} value={checkIn.id}>
                {checkIn.guard.name} (#{checkIn.guard.corpsID})
              </option>
            );
          })}
        </select>
      </div>

      {/* Guard Sign-Out Form */}
      {selectedCheckIn && (
        <GuardCheckOutForm
          guard={selectedCheckIn.guard}
          borrowedCuffs={selectedCheckIn.selectedCuffID ? true : false}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default CheckOut;
