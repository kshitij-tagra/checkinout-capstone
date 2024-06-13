import React, { useState, useEffect } from "react";
import GuardSearch from "../components/GuardSearch";
import GuardList from "../components/GuardList";
import GuardSignOutForm from "../components/GuardSignOutForm";

const SignOut = () => {
  // Temporary mock data for signed-in guards
  const signedInGuards = [
    { id: 1, name: "John Doe", corpsId: "12345" },
    { id: 2, name: "Jane Smith", corpsId: "67890" },
    // Add more guards as needed
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGuards, setFilteredGuards] = useState(signedInGuards);
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
    // Handle guard sign-out logic here
    console.log("Guard signed out:", selectedGuard);
    setSelectedGuard(null);
  };

  useEffect(() => {
    // Filter guards based on search query
    setFilteredGuards(
      signedInGuards.filter(
        (guard) =>
          guard.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          guard.corpsId.includes(searchQuery)
      )
    );
  }, [searchQuery]);

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold text-center mb-4">
        - Sign Out Guard -
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

      {/* Guard Sign-Out Form */}
      {selectedGuard && (
        <GuardSignOutForm
          guard={selectedGuard}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default SignOut;
