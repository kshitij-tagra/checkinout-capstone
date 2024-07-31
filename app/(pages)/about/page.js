"use client";

import { useState } from "react";
import Footer from "../../components/Footer";
import TopBar from "../../components/TopBar";
import Navbar from "../../components/Navbar";
import CheckIn from "../../functionality/CheckIn";
import CheckOut from "../../functionality/CheckOut";
import Audit from "../../functionality/Audit";
import ProfileSidebar from "../../components/ProfileSidebar";

const About = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentView, setCurrentView] = useState("About");

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
              - About Us -
            </h1>
            <section className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 mx-auto">
              <h2 className="text-xl font-bold mb-4 underline">
                Welcome to CheckInOut
              </h2>
              <p>
                The CheckInOut app is designed to streamline and enhance the
                management of security operations. By providing a centralized
                platform, we aim to make the process of managing security
                personnel more efficient, transparent, and reliable.
              </p>
            </section>
            <section className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 mx-auto">
              <h2 className="text-xl font-bold mb-4 underline">
                What We Offer
              </h2>
              <p>
                Our app offers a suite of features that address the common
                challenges faced in security management:
              </p>
              <ul className="list-disc list-inside ml-4">
                <li>
                  <strong>Efficient Check-In/Check-Out:</strong> Simplify the
                  process for security guards to log their shifts, ensuring
                  accurate time tracking and reducing errors.
                </li>
                <li>
                  <strong>Comprehensive Audit Trail:</strong> Maintain detailed
                  records of all activities, enhancing accountability and
                  transparency within the organization.
                </li>
                <li>
                  <strong>User Management:</strong> Manage profiles, roles, and
                  performance with ease, ensuring that only authorized personnel
                  have access to specific functions.
                </li>
                <li>
                  <strong>Real-Time Notifications:</strong> Stay informed with
                  instant notifications about shift reminders, emergency alerts,
                  and operational updates.
                </li>
                <li>
                  <strong>Reporting and Analytics:</strong> Generate insightful
                  reports to help administrators make informed decisions,
                  identify trends, and optimize resources.
                </li>
                <li>
                  <strong>Role-Based Access Control:</strong> Secure the app by
                  ensuring users only access information and functions relevant
                  to their roles.
                </li>
                <li>
                  <strong>Customizable Dashboard:</strong> Personalize the
                  dashboard to display key metrics and information based on user
                  preferences.
                </li>
                <li>
                  <strong>Mobile Compatibility:</strong> Access the app from
                  various devices, including smartphones and tablets, for
                  on-the-go convenience.
                </li>
              </ul>
            </section>
            <section className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 mx-auto">
              <h2 className="text-xl font-bold mb-4 underline">How It Helps</h2>
              <p>The CheckInOut app helps security companies by:</p>
              <ul className="list-disc list-inside ml-4">
                <li>
                  <strong>Improving Efficiency:</strong> Automate and streamline
                  processes, saving time and reducing the likelihood of manual
                  errors.
                </li>
                <li>
                  <strong>Enhancing Transparency:</strong> Provide clear and
                  accessible records of all activities, promoting
                  accountability.
                </li>
                <li>
                  <strong>Boosting Communication:</strong> Keep everyone
                  informed with real-time updates and notifications.
                </li>
                <li>
                  <strong>Facilitating Informed Decisions:</strong> Use
                  data-driven insights to make better management decisions and
                  optimize resource allocation.
                </li>
              </ul>
            </section>
            <section className="flex justify-center mt-6">
              <button
                onClick={() => (window.location.href = "/pages/homepage")}
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

export default About;
