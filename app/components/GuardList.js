import React from "react";

const GuardList = ({ guards, onSelectGuard }) => {
  return (
    <div className="flex justify-center">
      <div className="border border-gray-400 rounded mt-2 w-full max-w-md">
        {guards.length > 0 ? (
          guards.map((guard) => (
            <div
              key={guard.id}
              className="p-2 border-b last:border-b-0 border-gray-400 cursor-pointer"
              onClick={() => onSelectGuard(guard)}
            >
              {guard.name} (#{guard.corpsId})
            </div>
          ))
        ) : (
          <p className="p-2">No guards found</p>
        )}
      </div>
    </div>
  );
};

export default GuardList;
