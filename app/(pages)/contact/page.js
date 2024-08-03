"use client";


import { useState } from "react";
import Footer from "../../components/Footer";
import TopBar from "../../components/TopBar";
import NavBar from "../../components/NavBar";
import ProfileSidebar from "../../components/ProfileSidebar";

const Contact = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const supervisors = [
    {
      name: "Kshitij Tagra",
      role: "Project Manager & Frontend Developer",
      email: "kshitij.tagra@edu.sait.ca",
      description: "Kshitij oversees all security operations at our company. With a keen focus on frontend development, he ensures our security systems are intuitive and user-friendly.",
      imageUrl: "/Picture1.png"
    },
    {
      name: "Jagdeep Kaur",
      role: "Database Developer",
      email: "jagdeepkaur.baryar@edu.sait.ca",
      description: "Jagdeep specializes in database management for our security operations. Her expertise is crucial in maintaining the integrity and performance of our data systems.",
      imageUrl: "/Picture3.jpg"
    },
    {
      name: "Jashanjot Singh",
      role: "UI/UX Developer & Backend Developer",
      email: "jashanjotsingh@edu.sait.ca",
      description: "Jashanjot handles both the backend systems and the user interface design. His dual expertise ensures seamless integration of our security solutions.",
      imageUrl: "/Picture4.jpg"
    },
    {
      name: "Jaskaran Singh",
      role: "UI/UX Developer & Database Developer",
      email: "jaskaran.singh08@edu.sait.ca",
      description: "Jaskaran is adept in both UI/UX design and database development. He plays a pivotal role in ensuring that our applications are both effective and efficient.",
      imageUrl: "/Picture2.png"
    }
  ];

  const renderSupervisorCards = () => {
    return supervisors.map((supervisor, index) => (
      <div key={index} className="bg-white rounded-lg shadow-lg p-4 m-2 flex flex-col items-center justify-center w-80 h-auto min-h-[400px]">  
        <img className="w-32 h-32 object-cover rounded-full mb-3" src={supervisor.imageUrl} alt={`Image of ${supervisor.name}`} />
        <h3 className="text-lg font-bold mb-1">{supervisor.name}</h3>
        <p className="text-sm font-bold text-gray-500 mb-1">{supervisor.role}</p>
        <p className="text-sm font-semibold mb-1">{supervisor.email}</p>
        <p className="text-sm text-center">{supervisor.description}</p>
      </div>
    ));
  };

  return (
    <div className="flex flex-col min-h-screen relative" style={{ background: 'url(/background.jpg) center/cover no-repeat' }}>
      <TopBar />
      <NavBar setCurrentView={() => {}} toggleSidebar={toggleSidebar} />
      <div className="flex-grow">
        <h1 className="text-3xl font-bold mb-3 text-center mt-4 mb-2">- Contact Us -</h1>
        <div className="flex justify-center items-center flex-wrap mx-auto px-4">
          {renderSupervisorCards()}
        </div>
      </div>
      <Footer />
      {isSidebarOpen && <ProfileSidebar onClose={toggleSidebar} />}
    </div>
  );
};

export default Contact;
