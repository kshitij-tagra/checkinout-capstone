import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../_utils/firebase";

const GuardCheckInForm = ({
  guard,
  onCheckInFormSubmit,
  onCancel,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState({
    securityLicense: "",
    notebook: "",
    bvcId: "",
    firstAidCertificate: "",
    camsatNumber: "",
    camsatPouchNumber: "",
    radioNumber: "",
    radioPouchNumber: "",
    cuffNumber: "",
    uniformBeltBoots: "",
    casualVest: "",
    casualEarplugs: "",
    onSiteTime: "",
    ppctTrained: "",
  });
  const [equipments, setEquipments] = useState([]);

  const [selectedCamsetID, setSelectedCamsetID] = useState(null);
  const [selectedRadioID, setSelectedRadioID] = useState(null);
  const [selectedCuffID, setSelectedCuffID] = useState(null);

  const [selectedCamPouchNumber, setSelectedCamPouchNumber] = useState(null);
  const [selectedRadioPouchNumber, setSelectedRadioPouchNumber] =
    useState(null);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      camsatPouchNumber: selectedCamPouchNumber,
    }));
  }, [selectedCamPouchNumber]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      radioPouchNumber: selectedRadioPouchNumber,
    }));
  }, [selectedRadioPouchNumber]);

  useEffect(() => {
    async function fetchEquipments() {
      const allEqps = [];
      const resEqps = await getDocs(collection(db, "equipments"));
      resEqps.docs.forEach((eqp) => {
        allEqps.push({ id: eqp.id, ...eqp.data() });
      });
      setEquipments(allEqps);
    }
    fetchEquipments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear errors for a particular field
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] === "" && key !== "cuffNumber") {
        // Exclude cuffNumber from mandatory fields unless ppctTrained is yes
        validationErrors[key] = "Please enter this field.";
      }
    });

    if (formData.ppctTrained === "yes" && formData.cuffNumber === "") {
      validationErrors.cuffNumber = "Please enter this field.";
    }

    console.log(Object.keys(validationErrors));

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onCheckInFormSubmit({
        ...formData,
        selectedCamsetID,
        selectedRadioID,
        selectedCuffID,
      }); // Only call onSubmit if there are no errors
    }
  };

  function renderRadioButtons(fieldName) {
    return (
      <div className="flex gap-8">
        <label className="w-1/2">
          <input
            type="radio"
            name={fieldName}
            value="yes"
            checked={formData[fieldName] === "yes"}
            onChange={handleChange}
            required
          />{" "}
          Yes
        </label>

        <label className="w-1/2">
          <input
            type="radio"
            name={fieldName}
            value="no"
            checked={formData[fieldName] === "no"}
            onChange={handleChange}
          />{" "}
          No
        </label>
        <div>
          {errors[fieldName] && (
            <p className="text-red-500">{errors[fieldName]}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 mx-auto">
      <h2 className="text-xl font-bold mb-4">{`Checking in "${guard.name}"`}</h2>
      <form onSubmit={handleSubmit}>
        <table className="w-full">
          <tbody>
            <tr>
              <td className="py-2 w-2/5">Security License:</td>
              <td className="py-2">{renderRadioButtons("securityLicense")}</td>
            </tr>
            <tr>
              <td className="py-2 w-2/5">Notebook:</td>
              <td className="py-2">{renderRadioButtons("notebook")}</td>
            </tr>
            <tr>
              <td className="py-2 w-2/5">BVC ID:</td>
              <td className="py-2">{renderRadioButtons("bvcId")}</td>
            </tr>
            <tr>
              <td className="py-2 w-2/5">First Aid Certificate:</td>
              <td className="py-2">
                {renderRadioButtons("firstAidCertificate")}
              </td>
            </tr>
            <tr>
              <td className="py-2 w-2/5">
                <label htmlFor="cmsatNumber">CAMSAT #</label>
              </td>
              <td className="py-2">
                <select
                  className="bg-neutral-200 p-2 w-full rounded-md"
                  name="camsatNumber"
                  id="cmsatNumber"
                  onChange={async (e) => {
                    handleChange(e);
                    const selectedCamObj = equipments.find(
                      (eqp) => eqp["device#"] === e.target.value
                    );
                    setSelectedCamsetID(selectedCamObj.id);
                    if (selectedCamObj) {
                      setSelectedCamPouchNumber(selectedCamObj["devicePouch#"]);
                    } else {
                      setSelectedCamPouchNumber(null);
                    }
                  }}
                  defaultValue={""}
                >
                  <option value={""}>Select a CAMSAT #</option>
                  {equipments
                    .filter(
                      (eqp) =>
                        eqp.available === true && eqp.deviceType === "CAM"
                    )
                    .sort((a, b) => {
                      const deviceA = a["device#"] || "";
                      const deviceB = b["device#"] || "";
                      return deviceA.localeCompare(deviceB);
                    })
                    .map((eqp) => {
                      return (
                        <option key={eqp.id} value={eqp["device#"]}>
                          {eqp["device#"]}
                        </option>
                      );
                    })}
                </select>
                {errors["camsatNumber"] && (
                  <p className="text-red-500">{errors["camsatNumber"]}</p>
                )}
              </td>
            </tr>
            <tr>
              <td className="py-2 w-2/5">CAMSAT Pouch #:</td>
              <td className="py-2">
                <span className="bg-neutral-200 inline-block rounded-md p-2 w-full">
                  {selectedCamPouchNumber
                    ? ` ${selectedCamPouchNumber}`
                    : "No CAMSAT Selected"}
                </span>
              </td>
            </tr>
            <tr>
              <td className="py-2 w-2/5">
                <label htmlFor="radioNumber">RADIO #</label>
              </td>
              <td className="py-2">
                <select
                  name="radioNumber"
                  className="bg-neutral-200 p-2 w-full rounded-md"
                  id="radioNumber"
                  onChange={async (e) => {
                    handleChange(e);
                    const selectedRadObj = equipments.find(
                      (eqp) => eqp["device#"] === e.target.value
                    );
                    setSelectedRadioID(selectedRadObj.id);
                    if (selectedRadObj) {
                      setSelectedRadioPouchNumber(
                        selectedRadObj["devicePouch#"]
                      );
                    } else {
                      setSelectedRadioPouchNumber(null);
                    }
                  }}
                  defaultValue={""}
                >
                  <option value={""}>Select a Radio #</option>
                  {equipments
                    .filter(
                      (eqp) =>
                        eqp.available === true && eqp.deviceType === "RAD"
                    )
                    .sort((a, b) => {
                      const deviceA = a["device#"] || "";
                      const deviceB = b["device#"] || "";
                      return deviceA.localeCompare(deviceB);
                    })
                    .map((eqp) => {
                      return (
                        <option key={eqp.id} value={eqp["device#"]}>
                          {eqp["device#"]}
                        </option>
                      );
                    })}
                </select>
                {errors["radioNumber"] && (
                  <p className="text-red-500">{errors["radioNumber"]}</p>
                )}
              </td>
            </tr>
            <tr>
              <td className="py-2 w-2/5">Radio Pouch #:</td>
              <td className="py-2">
                <span className="bg-neutral-200 inline-block rounded-md p-2 w-full">
                  {selectedRadioPouchNumber
                    ? ` ${selectedRadioPouchNumber}`
                    : "No Radio Selected"}
                </span>
              </td>
            </tr>
            <tr>
              <td className="py-2">Uniform Belt Boots:</td>
              <td className="py-2">{renderRadioButtons("uniformBeltBoots")}</td>
            </tr>
            <tr>
              <td className="py-2">Casual Vest:</td>
              <td className="py-2">{renderRadioButtons("casualVest")}</td>
            </tr>
            <tr>
              <td className="py-2">Casual Earplugs:</td>
              <td className="py-2">{renderRadioButtons("casualEarplugs")}</td>
            </tr>
            <tr>
              <td className="py-2">PPCT Trained:</td>
              <td className="py-2">{renderRadioButtons("ppctTrained")}</td>
            </tr>
            {formData.ppctTrained === "yes" && (
              <tr>
                <td className="py-2">
                  <label htmlFor="cuffNumber">CUFF #</label>
                </td>
                <td className="py-2">
                  <select
                    name="cuffNumber"
                    className="bg-neutral-200 p-2 w-full rounded-md"
                    id="cuffNumber"
                    onChange={(e) => {
                      handleChange(e);
                      const selectedCuffObj = equipments.find(
                        (eqp) => eqp["device#"] === e.target.value
                      );
                      setSelectedCuffID(selectedCuffObj.id);
                    }}
                    defaultValue={""}
                  >
                    <option value={""}>Select a CUFF#</option>
                    {equipments
                      .filter(
                        (eqp) =>
                          eqp.available === true && eqp.deviceType === "CUF"
                      )
                      .sort((a, b) => {
                        const deviceA = a["device#"] || "";
                        const deviceB = b["device#"] || "";
                        return deviceA.localeCompare(deviceB);
                      })
                      .map((eqp) => {
                        return (
                          <option key={eqp.id} value={eqp["device#"]}>
                            {eqp["device#"]}
                          </option>
                        );
                      })}
                  </select>
                  {errors["cuffNumber"] && (
                    <p className="text-red-500">{errors["cuffNumber"]}</p>
                  )}
                </td>
              </tr>
            )}
            <tr>
              <td className="py-2">On Site Time:</td>
              <td className="py-2">
                <input
                  type="time"
                  name="onSiteTime"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.onSiteTime}
                  onChange={handleChange}
                  required
                />
                {errors.onSiteTime && (
                  <p className="text-red-500">{errors.onSiteTime}</p>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GuardCheckInForm;
