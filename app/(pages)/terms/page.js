"use client";

import { useState } from "react";
import Footer from "../../components/Footer";
import TopBar from "../../components/TopBar";
import Navbar from "../../components/Navbar";
import CheckIn from "../../functionality/CheckIn";
import CheckOut from "../../functionality/CheckOut";
import Audit from "../../functionality/Audit";
import ProfileSidebar from "../../components/ProfileSidebar";

const Terms = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentView, setCurrentView] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
        return (
          <div className="p-4 w-full">
            <h1 className="text-2xl font-bold text-center mb-4">
              - Terms & Conditions -
            </h1>
            <section className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 mx-auto">
              <h2 className="text-xl font-bold mb-4 underline">
                1. Introduction
              </h2>
              <p>
                Welcome to CheckInOut! These terms and conditions outline the
                rules and regulations for the use of our website and services.
              </p>
            </section>
            <section className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 mx-auto">
              <h2 className="text-xl font-bold mb-4 underline">
                2. Intellectual Property Rights
              </h2>
              <p>
                Other than the content you own, under these Terms, CheckInOut
                and/or its licensors own all the intellectual property rights
                and materials contained in this Website.
              </p>
            </section>
            <section className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 mx-auto">
              <h2 className="text-xl font-bold mb-4 underline">
                3. Restrictions
              </h2>
              <p>You are specifically restricted from all of the following:</p>
              <ul className="list-disc list-inside ml-4">
                <li>Publishing any Website material in any other media</li>
                <li>
                  Selling, sublicensing, and/or otherwise commercializing any
                  Website material
                </li>
                <li>
                  Using this Website in any way that is or may be damaging to
                  this Website
                </li>
                <li>
                  Using this Website contrary to applicable laws and regulations
                </li>
                <li>
                  Engaging in any data mining, data harvesting, data extracting,
                  or any other similar activity
                </li>
              </ul>
            </section>
            <section className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 mx-auto">
              <h2 className="text-xl font-bold mb-4 underline">
                4. Limitation of Liability
              </h2>
              <p>
                In no event shall CheckInOut, nor any of its officers,
                directors, and employees, be held liable for anything arising
                out of or in any way connected with your use of this Website.
              </p>
            </section>
            <section className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 mx-auto">
              <h2 className="text-xl font-bold mb-4 underline">
                5. Governing Law & Jurisdiction
              </h2>
              <p>
                These Terms will be governed by and interpreted in accordance
                with the laws of the State of [Your State], and you submit to
                the non-exclusive jurisdiction of the state and federal courts
                located in [Your State] for the resolution of any disputes.
              </p>
            </section>
            <section className="flex justify-center mt-6">
              <button
                onClick={() => (window.location.href = "/")}
                className="block px-4 py-2 font-bold bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Back to Homepage
              </button>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <TopBar />
      <Navbar
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
      {isSidebarOpen && <ProfileSidebar onClose={toggleSidebar} />}
    </div>
  );
};

export default Terms;
