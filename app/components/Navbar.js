import React, { useState } from "react";
import ExportConfirmationBox from "./ExportConfirmationBox";
import { fetchDataFromFirestore } from "../_utils/fetchDataFromFirestore";
import { generateExcelSheet } from "../_utils/generateExcelSheet";
import { deleteAllDataFromFirestore } from "../_utils/deleteDataFromFirestore"; // Import the function

const Navbar = ({ setCurrentView, toggleSidebar, currentView }) => {
  const [isConfirmationBoxOpen, setIsConfirmationBoxOpen] = useState(false);

  const toggleConfirmationBox = () => {
    setIsConfirmationBoxOpen(!isConfirmationBoxOpen);
  };

  const handleConfirmExport = async () => {
    try {
      // Fetch data from Firestore
      const { checkedInGuardsData, checkedOutGuardsData } =
        await fetchDataFromFirestore();

      // Generate Excel sheet
      await generateExcelSheet(checkedInGuardsData, checkedOutGuardsData);

      // Delete data from Firestore
      await deleteAllDataFromFirestore();

      console.log("Records cleared and Excel sheet generated.");
    } catch (error) {
      console.error("Error exporting data:", error);
    }
    setIsConfirmationBoxOpen(false);
  };

  return (
    <div className="bg-gray-700 text-white py-2 flex justify-between items-center">
      {/* Profile */}
      <div className="flex items-center ml-4">
        <button onClick={toggleSidebar}>
          <img
            src="/profile.png"
            alt="Profile"
            className="h-9 w-9 rounded-full"
            title="Profile"
          />
        </button>
      </div>

      {/* Main Navigation Options */}
      <div className="flex items-center justify-center w-2/3">
        <div className="bg-black py-2 px-6 rounded-full flex justify-evenly w-full">
          <button
            className={`focus:outline-none text-gray-200 hover:text-white font-semibold hover:font-extrabold ${
              currentView === "CheckIn" ? "text-white font-extrabold" : ""
            }`}
            onClick={() => setCurrentView("CheckIn")}
          >
            Check In
          </button>
          <button
            className={`focus:outline-none text-gray-200 hover:text-white font-semibold hover:font-extrabold ${
              currentView === "CheckOut" ? "text-white font-extrabold" : ""
            }`}
            onClick={() => setCurrentView("CheckOut")}
          >
            Check Out
          </button>
          <button
            className={`focus:outline-none text-gray-200 hover:text-white font-semibold hover:font-extrabold ${
              currentView === "Audit" ? "text-white font-extrabold" : ""
            }`}
            onClick={() => setCurrentView("Audit")}
          >
            Audit
          </button>
        </div>
      </div>

      {/* Export Option */}
      <div className="relative mr-4">
        <button
          className="flex items-center focus:outline-none"
          onClick={toggleConfirmationBox}
        >
          <img
            src="/download.jpg"
            alt="Download Icon"
            className="h-9 w-9 rounded-full mr-2"
          />
        </button>
      </div>

      {isConfirmationBoxOpen && (
        <ExportConfirmationBox
          onClose={toggleConfirmationBox}
          onConfirm={handleConfirmExport}
          heading="Confirm Export"
          message="This will clear the records from the database and generate an Excel sheet for you."
        />
      )}
    </div>
  );
};

export default Navbar;
