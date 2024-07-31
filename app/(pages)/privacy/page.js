"use client";

import { useState } from "react";
import Footer from "../../components/Footer";
import TopBar from "../../components/TopBar";
import Navbar from "../../components/Navbar";
import CheckIn from "../../functionality/CheckIn";
import CheckOut from "../../functionality/CheckOut";
import Audit from "../../functionality/Audit";
import ProfileSidebar from "../../components/ProfileSidebar";

const Privacy = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentView, setCurrentView] = useState("Privacy");

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
              - Privacy Policy -
            </h1>
            <section className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 mx-auto">
              <h2 className="text-xl font-bold mb-4 underline">
                1. Introduction
              </h2>
              <p>
                At CheckInOut, we value your privacy and are committed to
                protecting your personal information. This Privacy Policy
                outlines the types of information we collect and how we use,
                disclose, and protect that information.
              </p>
            </section>
            <section className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 mx-auto">
              <h2 className="text-xl font-bold mb-4 underline">
                2. Information Collection
              </h2>
              <p>
                We collect various types of information in connection with the
                services we provide, including:
              </p>
              <ul className="list-disc list-inside ml-4">
                <li>
                  <strong>Personal Information:</strong> Information you provide
                  us directly, such as your name, email address, phone number,
                  and any other details you provide when creating an account.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about your
                  interaction with our services, including the pages you visit,
                  the time spent on those pages, and other usage statistics.
                </li>
                <li>
                  <strong>Device Information:</strong> Information about the
                  device you use to access our services, including the type of
                  device, operating system, browser type, and IP address.
                </li>
              </ul>
            </section>
            <section className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 mx-auto">
              <h2 className="text-xl font-bold mb-4 underline">
                3. Use of Information
              </h2>
              <p>
                We use the collected information for various purposes,
                including:
              </p>
              <ul className="list-disc list-inside ml-4">
                <li>
                  <strong>Service Provision:</strong> To provide, maintain, and
                  improve our services, including processing transactions and
                  managing your account.
                </li>
                <li>
                  <strong>Communication:</strong> To communicate with you,
                  including responding to your inquiries, sending notifications,
                  and providing customer support.
                </li>
                <li>
                  <strong>Personalization:</strong> To personalize your
                  experience by presenting content tailored to your preferences
                  and interests.
                </li>
                <li>
                  <strong>Analytics:</strong> To analyze usage patterns and
                  trends to improve our services and develop new features.
                </li>
              </ul>
            </section>
            <section className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 mx-auto">
              <h2 className="text-xl font-bold mb-4 underline">
                4. Information Sharing
              </h2>
              <p>
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside ml-4">
                <li>
                  <strong>Service Providers:</strong> With third-party service
                  providers who assist us in operating our services, conducting
                  our business, or serving our users.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required to comply
                  with legal obligations, such as responding to subpoenas or
                  legal processes.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a
                  business transaction, such as a merger, acquisition, or sale
                  of assets.
                </li>
              </ul>
            </section>
            <section className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 mx-auto">
              <h2 className="text-xl font-bold mb-4 underline">
                5. Data Security
              </h2>
              <p>
                We implement appropriate security measures to protect your
                personal information from unauthorized access, disclosure,
                alteration, or destruction. However, please note that no method
                of transmission over the Internet or method of electronic
                storage is 100% secure, and we cannot guarantee absolute
                security.
              </p>
            </section>
            <section className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 mx-auto">
              <h2 className="text-xl font-bold mb-4 underline">
                6. Your Rights
              </h2>
              <p>
                You have the right to access, correct, or delete your personal
                information. You may also have the right to object to or
                restrict certain types of processing of your personal
                information. To exercise these rights, please contact us using
                the information provided below.
              </p>
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

export default Privacy;
