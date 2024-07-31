import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../_utils/firebase";

const ReturnsWithErrors = () => {
  const [faultyReturns, setFaultyReturns] = useState([]);

  useEffect(() => {
    async function fetchFaultyReturns() {
      const res = await getDocs(collection(db, "checkedOutErrors"));
      const a = res.docs.map((doc) => ({
        faultId: doc.id,
        ...doc.data(),
      }));
      const b = a.map((r) => ({
        guard: r.guard,
        errorsInReturn: r.returnErrors,
        borrowedItems: r.borrowedItems,
      }));
      setFaultyReturns(b);
    }
    fetchFaultyReturns();
  }, []);

  const renderRows = () => {
    const items = ["radio", "camsat", "cuff", "vest", "earplugs"];
    const rows = faultyReturns.map((f) => {
      const notReturnedItems = items.filter(
        (item) =>
          f.borrowedItems[item] === "true" && f.errorsInReturn[item] !== "true"
      );
      return (
        <tr key={f.faultId}>
          <td className="py-2 border-2 border-neutral-400 text-center">
            {f.guard.name} (#{f.guard.corpsID})
          </td>
          <td className="py-2 border-2 border-neutral-400 text-center">
            {notReturnedItems.length > 0
              ? notReturnedItems
                  .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
                  .join(", ")
              : "All Returned"}
          </td>
        </tr>
      );
    });
    return rows;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 mx-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-center py-2 border-2 border-neutral-400">
              Guard
            </th>
            <th className="text-center py-2 border-2 border-neutral-400">
              Not Returned Equipment
            </th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
};

export default ReturnsWithErrors;
