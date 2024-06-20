import React from "react";

const NavBar = ({
  setCurrentView,
  toggleSidebar,
  toggleDropdown,
  isDropdownOpen,
  currentView,
}) => (
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
    <div className="flex items-center justify-center w-1/2">
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

    {/* PDF Dropdown */}
    <div className="relative mr-4">
      <button
        className="flex items-center focus:outline-none"
        onClick={toggleDropdown}
      >
        <img
          src="/pdf.jpg"
          alt="PDF Icon"
          className="h-9 w-9 rounded-full mr-2"
        />
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
          <button className="block py-2 px-4 text-gray-800 hover:bg-gray-200 w-full text-left focus:outline-none">
            Sign In Report
          </button>
          <button className="block py-2 px-4 text-gray-800 hover:bg-gray-200 w-full text-left focus:outline-none">
            Sign Out Report
          </button>
          <button className="block py-2 px-4 text-gray-800 hover:bg-gray-200 w-full text-left focus:outline-none">
            Audit Report
          </button>
        </div>
      )}
    </div>
  </div>
);

export default NavBar;
