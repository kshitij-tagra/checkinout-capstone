import React from "react";
import { useUserAuth } from "../_utils/auth-context";
import { auth } from "../_utils/firebase"; // Import Firebase auth object

const ProfileSidebar = ({ onClose }) => {
  // Sample data for profile details
  const profileData = {
    name: "John Doe",
    jobTitle: "Security Officer",
    employeeId: "12345",
    phoneNumber: "+1234567890",
    email: "john.doe@example.com",
  };

  const { user } = useUserAuth();

  const handleLogout = async () => {
    try {
      if (user) {
        await auth.signOut(); // Sign out from Firebase authentication
        console.log("Logged out successfully");
        window.location.href = "/"; // Redirect to the homepage after logout
      } else {
        console.log("No user signed in.");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-start">
      {/* Overlay Background */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      {/* Sidebar Content */}
      <div className="bg-gray-900 text-gray-200 w-64 h-full p-4 rounded-br-xl shadow-lg flex flex-col justify-between relative z-50">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-200"
          onClick={onClose}
        >
          ✕
        </button>

        <div>
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
        </div>

        {/* Logout Button */}
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full mt-auto"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
