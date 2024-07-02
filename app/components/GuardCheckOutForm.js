import React from "react";

const GuardCheckOutForm = ({ guard, onSubmit, onCancel }) => {
  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-3/4 mx-auto">
      <h2 className="text-xl font-bold mb-4">Checking out "{guard.name}"</h2>
      <form onSubmit={onSubmit}>
        <table className="w-full">
          <tbody>
            <tr>
              <td className="py-2">CAMSAT:</td>
              <td className="py-2">
                <div className="flex">
                  <div className="mr-4 w-1/2">
                    <label>
                      <input type="radio" name="camsat" value="yes" required />{" "}
                      Returned
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="radio" name="camsat" value="no" /> Not
                      Returned
                    </label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-2">Radio & Pouch:</td>
              <td className="py-2">
                <div className="flex">
                  <div className="mr-4 w-1/2">
                    <label>
                      <input
                        type="radio"
                        name="radioPouch"
                        value="yes"
                        required
                      />{" "}
                      Returned
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="radio" name="radioPouch" value="no" /> Not
                      Returned
                    </label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-2">CUFF #:</td>
              <td className="py-2">
                <div className="flex">
                  <div className="mr-4 w-1/2">
                    <label>
                      <input
                        type="radio"
                        name="cuffNumber"
                        value="yes"
                        required
                      />{" "}
                      Returned
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="radio" name="cuffNumber" value="no" /> Not
                      Returned
                    </label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-2">Casual Vest:</td>
              <td className="py-2">
                <div className="flex">
                  <div className="mr-4 w-1/2">
                    <label>
                      <input
                        type="radio"
                        name="casualVest"
                        value="yes"
                        required
                      />{" "}
                      Returned
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="radio" name="casualVest" value="no" /> Not
                      Returned
                    </label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-2">Casual Earplugs:</td>
              <td className="py-2">
                <div className="flex">
                  <div className="mr-4 w-1/2">
                    <label>
                      <input
                        type="radio"
                        name="casualEarplugs"
                        value="yes"
                        required
                      />{" "}
                      Returned
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="radio" name="casualEarplugs" value="no" />{" "}
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
