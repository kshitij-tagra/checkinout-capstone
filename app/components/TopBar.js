import React from "react";

const TopBar = () => {
  return (
    <div className="bg-gray-800 text-white py-4 flex justify-center items-center">
      <img
        src="/logo.png"
        alt="CheckInOut Logo"
        className="h-10 mr-2 rounded-full"
      />
      <span className="text-lg font-bold">CheckInOut</span>
    </div>
  );
};

export default TopBar;
