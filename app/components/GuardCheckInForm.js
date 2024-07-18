import React, { useState } from "react";

const GuardCheckInForm = ({ guard, onSubmit, onCancel }) => {
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
  const [errors, setErrors] = useState({});

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

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onSubmit(formData); // Only call onSubmit if there are no errors
    }
  };

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 mx-auto">
      <h2 className="text-xl font-bold mb-4">{`Checking in "${guard.name}"`}</h2>
      <form onSubmit={handleSubmit}>
        <table className="w-full">
          <tbody>
            {/** Manually set each form field with proper labels and ordering **/}
            <tr>
              <td className="py-2">Security License:</td>
              <td className="py-2">{renderRadioButtons("securityLicense")}</td>
            </tr>
            <tr>
              <td className="py-2">Notebook:</td>
              <td className="py-2">{renderRadioButtons("notebook")}</td>
            </tr>
            <tr>
              <td className="py-2">BVC ID:</td>
              <td className="py-2">{renderRadioButtons("bvcId")}</td>
            </tr>
            <tr>
              <td className="py-2">First Aid Certificate:</td>
              <td className="py-2">
                {renderRadioButtons("firstAidCertificate")}
              </td>
            </tr>
            {renderNumberInput("CAMSAT #", "camsatNumber")}
            {renderNumberInput("CAMSAT Pouch #", "camsatPouchNumber")}
            {renderNumberInput("Radio #", "radioNumber")}
            {renderNumberInput("Radio Pouch #", "radioPouchNumber")}

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
            {formData.ppctTrained === "yes" &&
              renderNumberInput("CUFF #", "cuffNumber")}
            {/* {renderNumberInput('CUFF #', 'cuffNumber')} */}
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
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );

  function renderRadioButtons(fieldName) {
    return (
      <div className="flex">
        <div className="mr-4 w-1/2">
          <label>
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
        </div>
        <div>
          <label>
            <input
              type="radio"
              name={fieldName}
              value="no"
              checked={formData[fieldName] === "no"}
              onChange={handleChange}
            />{" "}
            No
          </label>
        </div>
        {errors[fieldName] && (
          <p className="text-red-500">{errors[fieldName]}</p>
        )}
      </div>
    );
  }

  function renderNumberInput(label, fieldName) {
    return (
      <tr key={fieldName}>
        <td className="py-2">{label}</td>
        <td className="py-2">
          <input
            type="number"
            name={fieldName}
            className="w-full p-2 border border-gray-300 rounded"
            value={formData[fieldName]}
            onChange={handleChange}
          />
          {errors[fieldName] && (
            <p className="text-red-500">{errors[fieldName]}</p>
          )}
        </td>
      </tr>
    );
  }
};

export default GuardCheckInForm;
