"use client";

import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { signOut, useSession } from "next-auth/react";

const ProfileSidebar = ({ onClose }) => {
  const [profileData, setProfileData] = useState(null);
  const db = getFirestore();
  const { data } = useSession();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (data.user) {
        const formattedPhoneNumber = formatPhoneNumber(data.user.phoneNumber);
        console.log(data.user);
        setProfileData({
          ...data.user,
          phoneNumber: formattedPhoneNumber,
        });
      }
    };

    fetchProfileData();
  }, []);

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `+1 ${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber; // Return the original phone number if it doesn't match the expected format
  };

  const handleLogout = async () => {
    try {
      await signOut();
      console.log("Logged out successfully");
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

        {profileData ? (
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
                <p className="text-sm">Supervisor</p>
              </div>
            </div>

            {/* Divider Line */}
            <div className="border-b border-gray-500 mb-4"></div>

            {/* Additional Profile Details */}
            <div className="text-sm mb-4">
              <p className="mb-1">
                <span className="font-semibold">Corps ID:</span> <br />#
                {profileData.corpsID}
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
        ) : (
          <p>Loading...</p>
        )}

        {/* Logout Button */}
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full mt-auto"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
