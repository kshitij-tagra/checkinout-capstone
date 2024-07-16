"use client";

import { useState } from "react";
import Footer from "../../components/Footer";
import TopBar from "../../components/TopBar";
import NavBar from "../../components/NavBar";
import ProfileSidebar from "../../components/ProfileSidebar";

const About = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <TopBar />
      <NavBar
        setCurrentView={() => {}}
        toggleSidebar={toggleSidebar}
        toggleDropdown={toggleDropdown}
        isDropdownOpen={isDropdownOpen}
      />
      <div className="flex flex-1 relative">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm"
          style={{ backgroundImage: "url('/background.jpg')" }}
        ></div>
        <div className="relative flex-1 bg-gray-300 bg-opacity-5">
          <main className="flex flex-1 justify-center items-center p-10">
            <div className="max-w-4xl p-6 text-left">
              <h1 className="text-3xl font-bold mb-6">About CheckInOut</h1>
              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
                <p>
                  The CheckInOut Capstone project is a cutting-edge web application designed to optimize the management of security guard operations. By providing a centralized platform, it aims to facilitate the efficient tracking and management of various activities related to security personnel. This application addresses the common challenges faced by security companies, such as manual processes, lack of real-time data, and inefficiencies in communication.
                </p>
              </section>
              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Purpose</h2>
                <p>
                  The primary purpose of the CheckInOut Capstone project is to improve the operational efficiency and accountability of security companies. By automating the check-in and check-out processes, the application ensures accurate recording of guard shifts and activities. Additionally, it aims to enhance transparency and provide valuable insights through detailed audit trails and reporting capabilities.
                </p>
              </section>
              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
                <ul className="list-disc list-inside ml-4">
                  <li>
                    <strong>Guard Check-In/Check-Out:</strong> This feature allows security guards to check in and out of their shifts using a user-friendly interface. It ensures precise tracking of working hours and reduces the chances of human error.
                  </li>
                  <li>
                    <strong>Audit Trail:</strong> The application maintains a comprehensive record of all guard activities, including check-ins, check-outs, and any other significant events. This audit trail enhances transparency and accountability within the organization.
                  </li>
                  <li>
                    <strong>User Management:</strong> Administrators can manage guard profiles, assign roles, and monitor performance through an intuitive user management system. This feature ensures that only authorized personnel have access to specific functions and information.
                  </li>
                  <li>
                    <strong>Real-Time Notifications:</strong> The application sends instant notifications to guards and administrators about important events, such as shift reminders, emergency alerts, and updates on ongoing operations. This feature enhances communication and ensures that everyone stays informed.
                  </li>
                  <li>
                    <strong>Reporting and Analytics:</strong> The system generates detailed reports and analytics on various aspects of guard operations. These reports help administrators make informed decisions, identify trends, and optimize resource allocation.
                  </li>
                  <li>
                    <strong>Role-Based Access Control:</strong> The application incorporates a robust role-based access control system to ensure that users have access only to the information and functionalities relevant to their roles. This enhances security and prevents unauthorized access.
                  </li>
                  <li>
                    <strong>Customizable Dashboard:</strong> The dashboard can be personalized to display key metrics, upcoming shifts, and other relevant information based on the user’s preferences. This feature provides a tailored experience for each user.
                  </li>
                  <li>
                    <strong>Mobile Compatibility:</strong> The CheckInOut Capstone application is fully responsive and can be accessed on various devices, including smartphones and tablets. This ensures that guards and administrators can use the system on the go.
                  </li>
                </ul>
              </section>
              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
                <p>
                  The CheckInOut Capstone project leverages modern web technologies to deliver a robust and scalable application. These technologies include:
                </p>
                <ul className="list-disc list-inside ml-4">
                  <li>
                    <strong>React.js:</strong> A powerful JavaScript library for building user interfaces. React.js enables the creation of dynamic and responsive UI components.
                  </li>
                  <li>
                    <strong>Next.js:</strong> A React framework that provides server-side rendering and routing capabilities. Next.js enhances the performance and SEO of the application.
                  </li>
                  <li>
                    <strong>Firebase:</strong> A comprehensive platform for app development. Firebase is used for authentication, real-time database management, and hosting services.
                  </li>
                  <li>
                    <strong>Tailwind CSS:</strong> A utility-first CSS framework that allows for rapid and flexible UI styling. Tailwind CSS ensures that the application is both aesthetically pleasing and highly customizable.
                  </li>
                </ul>
              </section>
            </div>
          </main>
        </div>
      </div>
      <Footer />
      {isSidebarOpen && <ProfileSidebar onClose={toggleSidebar} />}
    </div>
  );
};

export default About;
