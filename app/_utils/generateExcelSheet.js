import * as XLSX from "xlsx";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { deleteAllDataFromFirestore } from "./deleteDataFromFirestore";

// Function to format checked-in guards data
const formatCheckedInGuardsData = (data) => {
  return data.map((item, index) => ({
    "S. No.": index + 1,
    "Guard Name": item.guard.name,
    "Corps ID": item.guard.corpsID,
    "Security License": item.securityLicense,
    Notebook: item.notebook,
    "BVC ID": item.bvcId,
    "First Aid Certificate": item.firstAidCertificate,
    "CAMSAT #": item.camsatNumber,
    "CAMSAT Pouch #": item.camsatPouchNumber,
    "RADIO #": item.radioNumber,
    "RADIO Pouch #": item.radioPouchNumber,
    "Uniform Belt Boots": item.uniformBeltBoots,
    "Casual Vest": item.casualVest,
    "Casual Earplugs": item.casualEarplugs,
    "PPCT Trained": item.ppctTrained,
    "On Site Time": item.onSiteTime,
  }));
};

// Function to format checked-out guards data
const formatCheckedOutGuardsData = (data) => {
  return data.map((item, index) => ({
    "S. No.": index + 1,
    "Guard Name": item.guard.name,
    "Corps ID": item.guard.corpsID,
    "CAMSAT & Pouch":
      item.returnReport.camsat === "true" ? "Returned" : "Not Returned",
    "Radio & Pouch":
      item.returnReport.radio === "true" ? "Returned" : "Not Returned",
    "Hand Cuffs":
      item.returnReport.cuff === "true" ? "Returned" : "Not Returned",
    "Casual Vest":
      item.returnReport.vest === "true" ? "Returned" : "Not Returned",
    "Casual Earplugs":
      item.returnReport.earplugs === "true" ? "Returned" : "Not Returned",
    "Sign Out Time": item.returnReport.signOutTime,
  }));
};

// Function to format missing equipment data
const formatMissingEquipmentData = (data) => {
  return data.flatMap((item, index) => {
    const equipment = [
      {
        name: "CAMSAT",
        number: item.camsatNumber,
        pouch: item.camsatPouchNumber,
      },
      { name: "Radio", number: item.radioNumber, pouch: item.radioPouchNumber },
      { name: "Cuff", number: item.cuffNumber, pouch: "-" },
      { name: "Vest", number: "-", pouch: "-" },
      { name: "Earplugs", number: "-", pouch: "-" },
    ];

    return Object.keys(item.returnErrors || {})
      .map((key) => {
        if (item.returnErrors[key] === "false") {
          const equipmentItem = equipment.find(
            (e) => e.name.toLowerCase() === key.toLowerCase()
          );
          return {
            "S. No.": index + 1,
            "Guard Name": item.guard.name,
            "Corps ID": item.guard.corpsID,
            "Equipment Name": equipmentItem ? equipmentItem.name : "Unknown",
            "Equipment #": equipmentItem ? equipmentItem.number : "-",
            "Pouch #": equipmentItem ? equipmentItem.pouch : "-",
          };
        }
        return null;
      })
      .filter(Boolean);
  });
};

// Function to format current date
const getFormattedDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Function to adjust column widths based on content
const adjustColumnWidths = (worksheet) => {
  const columns = worksheet["!cols"] || [];
  const range = XLSX.utils.decode_range(worksheet["!ref"]);

  for (let C = range.s.c; C <= range.e.c; C++) {
    let maxLength = 0;
    for (let R = range.s.r; R <= range.e.r; R++) {
      const cellAddress = { c: C, r: R };
      const cellRef = XLSX.utils.encode_cell(cellAddress);
      const cell = worksheet[cellRef];
      if (cell && cell.v) {
        const length = cell.v.toString().length;
        if (length > maxLength) {
          maxLength = length;
        }
      }
    }
    columns[C] = { width: maxLength + 2 }; // Add some padding
  }

  worksheet["!cols"] = columns;
};

// Function to generate the Excel sheet and delete data from Firestore
export const generateExcelSheet = async (
  checkedInGuardsData,
  checkedOutGuardsData
) => {
  try {
    // Fetch missing equipment data
    const missingEquipmentQuery = collection(db, "checkedOutErrors");
    const missingEquipmentSnapshot = await getDocs(missingEquipmentQuery);
    const missingEquipmentData = missingEquipmentSnapshot.docs.map((doc) =>
      doc.data()
    );

    const formattedCheckedInGuards =
      formatCheckedInGuardsData(checkedInGuardsData);
    const formattedCheckedOutGuards =
      formatCheckedOutGuardsData(checkedOutGuardsData);
    const formattedMissingEquipment =
      formatMissingEquipmentData(missingEquipmentData);

    const ws1 = XLSX.utils.json_to_sheet(formattedCheckedInGuards);
    const ws2 = XLSX.utils.json_to_sheet(formattedCheckedOutGuards);
    const ws3 = XLSX.utils.json_to_sheet(formattedMissingEquipment);

    // Apply column width adjustments
    adjustColumnWidths(ws1);
    adjustColumnWidths(ws2);
    adjustColumnWidths(ws3);

    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws1, "Checked In Guards");
    XLSX.utils.book_append_sheet(wb, ws2, "Checked Out Guards");
    XLSX.utils.book_append_sheet(wb, ws3, "Missing Equipment");

    const currentDate = getFormattedDate();
    const fileName = `Final Report - ${currentDate}.xlsx`;

    XLSX.writeFile(wb, fileName);

    // Delete data from Firestore
    await deleteAllDataFromFirestore();

    // Refresh the page after data deletion
    window.location.reload();
  } catch (error) {
    console.error("Error generating Excel sheet or deleting data:", error);
  }
};
