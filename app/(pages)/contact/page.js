"use client";

import { useState } from "react";
import Footer from "../../components/Footer";
import TopBar from "../../components/TopBar";
import Navbar from "../../components/Navbar";
import CheckIn from "../../functionality/CheckIn";
import CheckOut from "../../functionality/CheckOut";
import Audit from "../../functionality/Audit";
import ProfileSidebar from "../../components/ProfileSidebar";
import Link from "next/link";

const Contact = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentView, setCurrentView] = useState("About");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const supervisors = [
    {
      name: "Kshitij Tagra",
      role: "Project Manager & Frontend Developer",
      email: "kshitij.tagra@edu.sait.ca",
      github: "https://github.com/kshitij-tagra",
      instagram: "https://www.instagram.com/kshitij.tagra/",
      description:
        "Kshitij leads our project with a keen eye for detail, ensuring seamless integration of our front-end designs. His leadership and technical skills drive our project's success.",
      imageUrl: "/pic-kshitij.jpg",
    },
    {
      name: "Jagdeep Kaur Baryar",
      role: "Backend Developer",
      email: "jagdeepkaur.baryar@edu.sait.ca",
      github: "https://github.com/JAGDEEP-BARYAR",
      instagram: "https://www.instagram.com/jagdeep.baryar.7/",
      description:
        "Jagdeep specializes in crafting robust backend solutions. Her expertise ensures that our application is secure, efficient, and scalable.",
      imageUrl: "/pic-jagdeep.jpg",
    },
    {
      name: "Jashanjot Singh",
      role: "UI/UX Developer & Backend Developer",
      email: "jashanjotsingh@edu.sait.ca",
      github: "https://github.com/Jashan2510",
      instagram: "https://www.instagram.com/jshn1919/",
      description:
        "Jashanjot blends backend functionality with user-centered design, making sure that our application is not only powerful but also intuitive and easy to use.",
      imageUrl: "/pic-jashanjot.jpg",
    },
    {
      name: "Jaskaran Singh",
      role: "Database Developer & UI/UX Developer",
      email: "jaskaran.singh08@edu.sait.ca",
      github: "https://github.com/Jaskaran-singh1",
      instagram: "https://www.instagram.com/jaskaran5911.jpr/",
      description:
        "Jaskaran brings our user interface to life while managing our database. His dual expertise ensures that the user experience is both engaging and data-driven.",
      imageUrl: "/pic-jaskaran.jpg",
    },
  ];

  const renderSupervisorCards = () => {
    return supervisors.map((supervisor, index) => (
      <div
        key={index}
        className="bg-white rounded-lg shadow-lg p-4 m-2 flex flex-col items-center justify-center w-80 h-auto min-h-[400px]"
      >
        <img
          className="w-32 h-32 object-cover rounded-full mb-3 border-black border-2"
          src={supervisor.imageUrl}
          alt={`Image of ${supervisor.name}`}
        />
        <h3 className="text-lg font-bold mb-1">{supervisor.name}</h3>
        <p className="text-sm font-bold text-gray-500 mb-1">
          {supervisor.role}
        </p>
        <p className="text-sm text-center mt-3">{supervisor.description}</p>
        <div className="inline-block mt-3">
          <a href={`mailto:${supervisor.email}`}>
            <span className="text-sm font-semibold mr-4 text-blue-600 hover:text-blue-800 hover:underline">
              Email
            </span>
          </a>
          <span className="text-sm font-semibold mr-4">|</span>
          <Link href={supervisor.github}>
            <span className="text-sm font-semibold mr-4 text-blue-600 hover:text-blue-800 hover:underline">
              GitHub
            </span>
          </Link>
          <span className="text-sm font-semibold mr-4">|</span>
          <Link href={supervisor.instagram}>
            <span className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline">
              Instagram
            </span>
          </Link>
        </div>
      </div>
    ));
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
              - Contact Us -
            </h1>
            <div className="flex-grow">
              <div className="flex justify-center items-center flex-wrap mx-auto px-4">
                {renderSupervisorCards()}
              </div>
            </div>
            <section className="flex justify-center mt-4">
              <button
                onClick={() => (window.location.href = "/")}
                className="block px-4 py-2 font-bold bg-blue-600 text-white rounded hover:bg-blue-600"
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

export default Contact;
