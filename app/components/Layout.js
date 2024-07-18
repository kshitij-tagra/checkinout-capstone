import React, { useState } from "react";
import Footer from "./Footer";
import ProfileSidebar from "./ProfileSidebar";
import TopBar from "./TopBar";
import NavBar from "./NavBar";
import CheckIn from "../functionality/CheckIn";
import CheckOut from "../functionality/CheckOut";
import Audit from "../functionality/Audit";
import { db } from "../_utils/firebase";
import { collection, getDocs } from "firebase/firestore";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentView, setCurrentView] = useState("CheckIn");

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const renderContent = () => {
    switch (currentView) {
      case "CheckIn":
        return <CheckIn />;
      case "CheckOut":
        return <CheckOut />;
      case "Audit":
        return <Audit />;
      default:
        return <CheckIn />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />

      <NavBar
        setCurrentView={setCurrentView}
        toggleSidebar={toggleSidebar}
        toggleDropdown={toggleDropdown}
        isDropdownOpen={isDropdownOpen}
        currentView={currentView}
      />

      <div className="flex flex-1 relative">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm"
          style={{ backgroundImage: "url('/background.jpg')" }}
        ></div>
        <div className="relative flex-1 bg-gray-300 bg-opacity-5">
          {renderContent()}
        </div>
      </div>

      <Footer />

      {isSidebarOpen && <ProfileSidebar onClose={closeSidebar} />}
    </div>
  );
};

export default Layout;
