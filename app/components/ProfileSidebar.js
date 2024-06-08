import React from "react";

const ProfileSidebar = () => {
  // Sample data for profile details
  const profileData = {
    name: "John Doe",
    jobTitle: "Security Officer",
    employeeId: "12345",
    phoneNumber: "+1234567890",
    email: "john.doe@example.com",
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
  };

  return (
    /* Sidebar Content */
    <div className="h-full bg-gray-900 text-gray-200 w-1/5 overflow-y-auto p-4 rounded-br-xl shadow-lg">
      {/* Profile Picture, Name, and Role */}
      <div className="flex items-center mb-4">
        <img
          src="/profile.png"
          alt="Profile"
          className="h-12 w-12 rounded-full mr-3"
        />
        <div>
          <p className="font-semibold text-lg">{profileData.name}</p>
          <p className="text-sm">{profileData.jobTitle}</p>
        </div>
      </div>

      {/* Divider Line */}
      <div className="border-b border-gray-500 mb-4"></div>

      {/* Additional Profile Details */}
      <div className="text-sm mb-4">
        <p className="mb-1">
          <span className="font-semibold">Employee ID:</span> <br />
          {profileData.employeeId}
        </p>
        <br />
        <div className="mb-1">
          <span className="font-semibold">Phone Number:</span> <br />
          {profileData.phoneNumber}
        </div>
        <br />
        <div>
          <span className="font-semibold">Email:</span> <br />
          {profileData.email}
        </div>
      </div>

      {/* Divider Line */}
      <div className="border-b border-gray-500 mb-4"></div>

      {/* Logout Button */}
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileSidebar;
