import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import GuardList from "../components/GuardList";
import GuardCheckInForm from "../components/GuardCheckInForm";
import GuardSearch from "../components/GuardSearch";

const CheckIn = () => {
  const [guards, setGuards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGuard, setSelectedGuard] = useState(null);
  const db = getFirestore();

  // Function to fetch guards from Firestore based on search query
  const fetchGuards = async () => {
    const guardCollection = collection(db, "guards");

    const guardSnapshot = await getDocs(guardCollection);
    const guardList = guardSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Filter guards based on case-insensitive search query
    const filteredGuards = guardList.filter((guard) => {
      const nameMatch = guard.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const corpsIDMatch = guard.corpsID.toString().includes(searchQuery);
      return nameMatch || corpsIDMatch;
    });

    setGuards(filteredGuards);
  };

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

  // Fetch guards whenever the search query changes
  useEffect(() => {
    if (searchQuery) {
      fetchGuards();
    } else {
      setGuards([]);
    }
  }, [searchQuery]);

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
        <GuardList guards={guards} onSelectGuard={handleGuardSelect} />
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
