import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../_utils/firebase";

const ReturnsWithErrors = () => {
  const [faultyReturns, setFaultyReturns] = useState([]);
  useEffect(() => {
    async function fetchFaultyReturns() {
      const res = await getDocs(collection(db, "checkoutsWithErrors"));
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 mx-auto">
      <table className="w-full ">
        <thead>
          <tr>
            <th className="text-center py-2 w-2/12 border-2 border-neutral-400">
              Guard
            </th>
            <th className="text-center py-2 w-1/12 border-2 border-neutral-400">
              Radio
            </th>
            <th className="text-center py-2 w-1/12 border-2 border-neutral-400">
              CAMSAT
            </th>
            <th className="text-center py-2 w-1/12 border-2 border-neutral-400">
              Hand Cuffs
            </th>
            <th className="text-center py-2 w-1/12 border-2 border-neutral-400">
              Vest
            </th>
            <th className="text-center py-2 w-1/12 border-2 border-neutral-400">
              Earplugs
            </th>
          </tr>
        </thead>

        <tbody>
          {faultyReturns.map((f) => {
            return (
              <tr key={f.faultId}>
                <td className="py-2 border-2 border-neutral-400 text-center">
                  {f.guard.name} (#{f.guard.corpsID})
                </td>
                <td
                  className={
                    f.errorsInReturn.radio === "true"
                      ? "text-green-400 border-2 border-neutral-400 text-center"
                      : "text-red-500 border-2 border-neutral-400 text-center"
                  }
                >
                  {f.errorsInReturn.radio === "true"
                    ? "Returned"
                    : "Not Returned"}
                </td>
                <td
                  className={
                    f.errorsInReturn.camsat === "true"
                      ? "text-green-400 border-2 border-neutral-400 text-center"
                      : "text-red-500 border-2 border-neutral-400 text-center"
                  }
                >
                  {f.errorsInReturn.camsat === "true"
                    ? "Returned"
                    : "Not Returned"}
                </td>
                <td
                  className={
                    f.borrowedItems["cuff"] === "true"
                      ? f.errorsInReturn.cuff === "true"
                        ? "text-green-400 border-2 border-neutral-400 text-center"
                        : "text-red-500 border-2 border-neutral-400 text-center"
                      : "border-2 border-neutral-400 text-center"
                  }
                >
                  {f.borrowedItems.cuff === "true"
                    ? f.errorsInReturn.cuff === "true"
                      ? "Returned"
                      : "Not Returned"
                    : "-"}
                </td>
                {/* working on this */}
                <td
                  className={
                    f.borrowedItems["vest"] === "true"
                      ? f.errorsInReturn.vest === "true"
                        ? "text-green-400 border-2 border-neutral-400 text-center"
                        : "text-red-500 border-2 border-neutral-400 text-center"
                      : ""
                  }
                >
                  {f.borrowedItems.vest === "true"
                    ? f.errorsInReturn.vest === "true"
                      ? "Returned"
                      : "Not Returned"
                    : "-"}
                </td>
                <td
                  className={
                    f.borrowedItems["earplugs"] === "true"
                      ? f.errorsInReturn.earplugs === "true"
                        ? "text-green-400 border-2 border-neutral-400 text-center"
                        : "text-red-500 border-2 border-neutral-400 text-center"
                      : ""
                  }
                >
                  {f.borrowedItems.earplugs === "true"
                    ? f.errorsInReturn.earplugs === "true"
                      ? "Returned"
                      : "Not Returned"
                    : "-"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReturnsWithErrors;
