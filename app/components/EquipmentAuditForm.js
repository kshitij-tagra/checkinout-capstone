import { useState } from "react";

const EquipmentAuditForm = () => {
  const currentDate = new Date().toLocaleDateString();

  // State management for form fields
  const [formData, setFormData] = useState({
    sonimStart: "",
    sonimEnd: "",
    camsatStart: "",
    camsatEnd: "",
    sonimPouchStart: "",
    sonimPouchEnd: "",
    camsatPouchStart: "",
    camsatPouchEnd: "",
    handCuffsStart: "",
    handCuffsEnd: "",
  });

  const [errors, setErrors] = useState({});

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form save
  const handleSave = () => {
    console.log("Shift-start counts saved:", formData);
    // Save the shift-start counts logic here
  };

  // Function to handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    // Validate the form fields
    for (const [key, value] of Object.entries(formData)) {
      if (value === "") {
        newErrors[key] = "This field is required";
      }
    }
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      // Submit the form data logic here
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 mx-auto">
      <h2 className="text-xl font-bold mb-4">Audit for: {currentDate}</h2>
      <form onSubmit={handleSubmit}>
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
              { label: "Sonim", start: "sonimStart", end: "sonimEnd" },
              { label: "Camsat", start: "camsatStart", end: "camsatEnd" },
              {
                label: "Sonim Pouch",
                start: "sonimPouchStart",
                end: "sonimPouchEnd",
              },
              {
                label: "Camsat Pouch",
                start: "camsatPouchStart",
                end: "camsatPouchEnd",
              },
              {
                label: "Hand-Cuffs",
                start: "handCuffsStart",
                end: "handCuffsEnd",
              },
            ].map(({ label, start, end }) => (
              <tr key={label}>
                <td className="py-2">{label}</td>
                <td className="py-2">
                  <input
                    type="number"
                    name={start}
                    className="w-full p-2 border border-gray-300 rounded"
                    value={formData[start]}
                    onChange={handleChange}
                  />
                  {errors[start] && (
                    <div className="text-red-500">{errors[start]}</div>
                  )}
                </td>
                <td className="py-2">
                  <input
                    type="number"
                    name={end}
                    className="w-full p-2 border border-gray-300 rounded"
                    value={formData[end]}
                    onChange={handleChange}
                  />
                  {errors[end] && (
                    <div className="text-red-500">{errors[end]}</div>
                  )}
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
          <button
            type="button"
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={handleSave}
          >
            Save
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
};

export default EquipmentAuditForm;
