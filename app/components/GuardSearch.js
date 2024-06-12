import React from "react";

const GuardSearch = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Search by name or corps ID"
          value={searchQuery}
          onChange={onSearchChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
      </div>
    </div>
  );
};

export default GuardSearch;
