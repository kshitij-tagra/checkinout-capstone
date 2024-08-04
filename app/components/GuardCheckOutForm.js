import React, { useEffect, useState } from "react";

const GuardCheckOutForm = ({ guard, borrowedCuffs, onSubmit, onCancel }) => {
  const [returnedStuff, setReturnedStuff] = useState(
    borrowedCuffs
      ? {
          camsat: "false",
          radio: "false",
          cuff: "false",
          vest: "false",
          earplugs: "false",
          signOutTime: "",
        }
      : {
          camsat: "false",
          radio: "false",
          vest: "false",
          earplugs: "false",
          signOutTime: "",
        }
  );

  function onInputChange(e) {
    setReturnedStuff((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  useEffect(() => {}, [returnedStuff]);

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 mx-auto">
      <h2 className="text-xl font-bold mb-4">{`Checking out "${guard.name}"`}</h2>
      <form onSubmit={(e) => onSubmit(e, returnedStuff)}>
        <table className="w-full">
          <tbody>
            <tr>
              <td className="py-2 align-top">CAMSAT:</td>
              <td className="py-2">
                <div className="flex">
                  <div className="mr-4 w-1/2">
                    <label>
                      <input
                        onChange={onInputChange}
                        type="radio"
                        name="camsat"
                        value={true}
                        required
                      />{" "}
                      Returned
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        onChange={onInputChange}
                        type="radio"
                        name="camsat"
                        value={false}
                      />{" "}
                      Not Returned
                    </label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-2 align-top">Radio & Pouch:</td>
              <td className="py-2">
                <div className="flex">
                  <div className="mr-4 w-1/2">
                    <label>
                      <input
                        onChange={onInputChange}
                        type="radio"
                        name="radio"
                        value={true}
                        required
                      />{" "}
                      Returned
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        onChange={onInputChange}
                        type="radio"
                        name="radio"
                        value={false}
                      />{" "}
                      Not Returned
                    </label>
                  </div>
                </div>
              </td>
            </tr>

            {borrowedCuffs && (
              <tr>
                <td className="py-2 align-top">CUFF #:</td>
                <td className="py-2">
                  <div className="flex">
                    <div className="mr-4 w-1/2">
                      <label>
                        <input
                          onChange={onInputChange}
                          type="radio"
                          name="cuff"
                          value={true}
                          required
                        />{" "}
                        Returned
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          onChange={onInputChange}
                          type="radio"
                          name="cuff"
                          value={false}
                        />{" "}
                        Not Returned
                      </label>
                    </div>
                  </div>
                </td>
              </tr>
            )}

            <tr>
              <td className="py-2 align-top">Casual Vest:</td>
              <td className="py-2">
                <div className="flex">
                  <div className="mr-4 w-1/2">
                    <label>
                      <input
                        onChange={onInputChange}
                        type="radio"
                        name="vest"
                        value={true}
                        required
                      />{" "}
                      Returned
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        onChange={onInputChange}
                        type="radio"
                        name="vest"
                        value={false}
                      />{" "}
                      Not Returned
                    </label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-2 align-top">Casual Earplugs:</td>
              <td className="py-2">
                <div className="flex">
                  <div className="mr-4 w-1/2">
                    <label>
                      <input
                        onChange={onInputChange}
                        type="radio"
                        name="earplugs"
                        value={true}
                        required
                      />{" "}
                      Returned
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        onChange={onInputChange}
                        type="radio"
                        name="earplugs"
                        value={false}
                      />{" "}
                      Not Returned
                    </label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-2">Sign Out Time:</td>
              <td className="py-2">
                <input
                  onChange={onInputChange}
                  type="time"
                  name="signOutTime"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Form Buttons */}
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
};

export default GuardCheckOutForm;
