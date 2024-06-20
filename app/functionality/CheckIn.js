import React, { useState } from "react";
import GuardList from "../components/GuardList";
import GuardCheckInForm from "../components/GuardCheckInForm";
import GuardSearch from "../components/GuardSearch";

const CheckIn = () => {
  // Temporary list of guards
  const guards = [
    { id: 1, name: "John Doe", corpsId: "12345" },
    { id: 2, name: "Jane Smith", corpsId: "67890" },
    { id: 3, name: "Alice Johnson", corpsId: "54321" },
    { id: 4, name: "Bob Brown", corpsId: "98765" },
    // Add more guards as needed
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGuard, setSelectedGuard] = useState(null);

  // Function to handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle guard selection
  const handleGuardSelect = (guard) => {
    setSelectedGuard(guard);
    setSearchQuery(""); // Clear the search bar
  };

  // Function to handle form cancel
  const handleCancel = () => {
    setSelectedGuard(null);
  };

  // Function to handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle guard sign-in logic here
    console.log("Guard signed in:", selectedGuard);
    setSelectedGuard(null);
  };

  // Filter guards based on search query
  const filteredGuards = guards.filter(
    (guard) =>
      guard.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guard.corpsId.includes(searchQuery)
  );

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold text-center mb-4">
        - Check In Guard -
      </h1>

      {/* Search Bar */}
      <GuardSearch
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {/* Guard List */}
      {searchQuery && !selectedGuard && (
        <GuardList guards={filteredGuards} onSelectGuard={handleGuardSelect} />
      )}

      {/* Guard Sign-In Form */}
      {selectedGuard && (
        <GuardCheckInForm
          guard={selectedGuard}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default CheckIn;
