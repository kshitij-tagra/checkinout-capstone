"use client";

import { useState } from "react";
import Footer from "../../components/Footer";
import TopBar from "../../components/TopBar";
import NavBar from "../../components/NavBar";
import ProfileSidebar from "../../components/ProfileSidebar";

const Terms = () => {
  const [currentView, setCurrentView] = useState("Terms");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const renderContent = () => {
    return (
      <div className="max-w-4xl p-6 text-left">
        <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            Welcome to CheckInOut! These terms and conditions outline the rules and regulations for the use of our website and services.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">2. Intellectual Property Rights</h2>
          <p>
            Other than the content you own, under these Terms, CheckInOut and/or its licensors own all the intellectual property rights and materials contained in this Website.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">3. Restrictions</h2>
          <p>You are specifically restricted from all of the following:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Publishing any Website material in any other media</li>
            <li>Selling, sublicensing, and/or otherwise commercializing any Website material</li>
            <li>Using this Website in any way that is or may be damaging to this Website</li>
            <li>Using this Website contrary to applicable laws and regulations</li>
            <li>Engaging in any data mining, data harvesting, data extracting, or any other similar activity</li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">4. Limitation of Liability</h2>
          <p>
            In no event shall CheckInOut, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Website.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">5. Governing Law & Jurisdiction</h2>
          <p>
            These Terms will be governed by and interpreted in accordance with the laws of the State of [Your State], and you submit to the non-exclusive jurisdiction of the state and federal courts located in [Your State] for the resolution of any disputes.
          </p>
        </section>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen relative">
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
          <main className="flex flex-1 justify-center items-center p-10">
            {renderContent()}
          </main>
        </div>
      </div>
      <Footer />
      {isSidebarOpen && <ProfileSidebar onClose={toggleSidebar} />}
    </div>
  );
};

export default Terms;
