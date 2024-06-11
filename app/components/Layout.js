import React, { useState } from "react";
import Footer from "./Footer";
import ProfileSidebar from "./ProfileSidebar";
import TopBar from "./TopBar";
import NavBar from "./NavBar";
import SignIn from "../functionality/SignIn";
import SignOut from "../functionality/SignOut";
import Audit from "../functionality/Audit";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentView, setCurrentView] = useState("SignIn");

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
      case "SignIn":
        return <SignIn />;
      case "SignOut":
        return <SignOut />;
      case "Audit":
        return <Audit />;
      default:
        return <SignIn />;
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

      <div className="flex flex-1 bg-gray-200">{renderContent()}</div>

      <Footer />

      {isSidebarOpen && <ProfileSidebar onClose={closeSidebar} />}
    </div>
  );
};

export default Layout;
