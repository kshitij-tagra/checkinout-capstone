import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../_utils/firebase";

const EquipmentAuditForm = () => {
  const currentDate = new Date().toLocaleDateString();
  const [radioData, setRadioData] = useState({ startCount: 0, endCount: 0 });
  const [camsatData, setCamsatData] = useState({
    startCount: 0,
    endCount: 0,
  });
  const [cuffData, setCuffData] = useState({ startCount: 0, endCount: 0 });
  const [vestData, setVestData] = useState({ startCount: 0, endCount: 0 });
  const [earplugsData, setEarplugsData] = useState({
    startCount: 0,
    endCount: 0,
  });

  useEffect(() => {
    async function fetchCheckedOutGuards() {
      const res = await getDocs(collection(db, "checkedOutGuards"));
      const a = res.docs.map((doc) => ({
        id: doc.data().id,
        borrowedItems: doc.data().checkInData.borrowedItems,
        returnReport: doc.data().returnReport,
      }));

      let radioStart = 0;
      let camStart = 0;
      let cuffStart = 0;
      let vestStart = 0;
      let earplugsStart = 0;

      let radioEnd = 0;
      let camEnd = 0;
      let cuffEnd = 0;
      let vestEnd = 0;
      let earplugsEnd = 0;

      a.forEach((rec) => {
        if (rec.borrowedItems.radio === "true") {
          radioStart++;
        }
        if (rec.borrowedItems.camsat === "true") {
          camStart++;
        }
        if (rec.borrowedItems.cuff === "true") {
          cuffStart++;
        }
        if (rec.borrowedItems.vest === "true") {
          vestStart++;
        }
        if (rec.borrowedItems.earplugs === "true") {
          earplugsStart++;
        }

        if (rec.returnReport.radio === "true") {
          radioEnd++;
        }
        if (rec.returnReport.camsat === "true") {
          camEnd++;
        }
        if (rec.returnReport.cuff === "true") {
          cuffEnd++;
        }
        if (rec.returnReport.vest === "true") {
          vestEnd++;
        }
        if (rec.returnReport.earplugs === "true") {
          earplugsEnd++;
        }
      });

      setRadioData({ startCount: radioStart, endCount: radioEnd });
      setCuffData({ startCount: cuffStart, endCount: cuffEnd });
      setCamsatData({ startCount: camStart, endCount: camEnd });
      setVestData({ startCount: vestStart, endCount: vestEnd });
      setEarplugsData({ startCount: earplugsStart, endCount: earplugsEnd });
    }
    fetchCheckedOutGuards();
  }, []);

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 mx-auto">
      <h2 className="text-xl font-bold mb-4">Audit For: {currentDate}</h2>

      <table className="w-full">
        <thead>
          <tr>
            <th className="py-2">Equipment</th>
            <th className="py-2">Shift-Start Count</th>
            <th className="py-2">Shift-End Count</th>
          </tr>
        </thead>
        <tbody>
          {[
            {
              label: "Radio & Pouch",

              startCount: radioData.startCount,
              endCount: radioData.endCount,
            },
            {
              label: "CAMSAT & Pouch",

              startCount: camsatData.startCount,
              endCount: camsatData.endCount,
            },
            {
              label: "Hand Cuffs",
              startCount: cuffData.startCount,
              endCount: cuffData.endCount,
            },
            {
              label: "Vest",
              startCount: vestData.startCount,
              endCount: vestData.endCount,
            },
            {
              label: "Earplugs",
              startCount: earplugsData.startCount,
              endCount: earplugsData.endCount,
            },
          ].map(({ label, startCount, endCount }) => (
            <tr key={label}>
              <td className="py-2 w-2/5">{label}</td>
              <td>
                <span className="bg-neutral-200 w-full block text-center rounded-md py-1">
                  {startCount}
                </span>
              </td>
              <td>
                <span className="bg-neutral-200 w-full block text-center rounded-md py-1">
                  {endCount}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form Buttons */}
      <div className="flex justify-end space-x-4 mt-4">
        <button
          type="button"
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Report
        </button>
      </div>
    </div>
  );
};

export default EquipmentAuditForm;
