import React, { useState } from "react";
import Footer from "./Footer";
import ProfileSidebar from "./ProfileSidebar";
import TopBar from "./TopBar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Navbar
        toggleSidebar={toggleSidebar}
        toggleDropdown={toggleDropdown}
        isDropdownOpen={isDropdownOpen}
      />

      {/* Main Content */}
      <div className="flex flex-1 bg-gray-200">
        {isSidebarOpen && <ProfileSidebar />}
        <div className="flex-1">{children}</div>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
