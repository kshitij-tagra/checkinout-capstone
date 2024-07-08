import React from "react";

const GuardCheckInForm = ({ guard, onSubmit, onCancel }) => {
  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 mx-auto">
      <h2 className="text-xl font-bold mb-4">Checking in "{guard.name}"</h2>
      <form onSubmit={onSubmit}>
        <table className="w-full">
          <tbody>
            <tr>
              <td className="py-2">Security License:</td>
              <td className="py-2">
                <div className="flex">
                  <div className="mr-4 w-1/2">
                    <label>
                      <input
                        type="radio"
                        name="securityLicense"
                        value="yes"
                        required
                      />{" "}
                      Yes
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="radio" name="securityLicense" value="no" />{" "}
                      No
                    </label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-2">Notebook:</td>
              <td className="py-2">
                <div className="flex">
                  <div className="mr-4 w-1/2">
                    <label>
                      <input
                        type="radio"
                        name="notebook"
                        value="yes"
                        required
                      />{" "}
                      Yes
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="radio" name="notebook" value="no" /> No
                    </label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-2">BVC ID:</td>
              <td className="py-2">
                <div className="flex">
                  <div className="mr-4 w-1/2">
                    <label>
                      <input type="radio" name="bvcId" value="yes" required />{" "}
                      Yes
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="radio" name="bvcId" value="no" /> No
                    </label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-2">First Aid Certificate:</td>
              <td className="py-2">
                <div className="flex">
                  <div className="mr-4 w-1/2">
                    <label>
                      <input
                        type="radio"
                        name="firstAidCertificate"
                        value="yes"
                        required
                      />{" "}
                      Yes
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="firstAidCertificate"
                        value="no"
                      />{" "}
                      No
                    </label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-2">CAMSAT:</td>
              <td className="py-2">
                <input
                  type="number"
                  name="camsat"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="py-2">Radio & Pouch:</td>
              <td className="py-2">
                <input
                  type="number"
                  name="radioPouch"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="py-2">PPCT Trained:</td>
              <td className="py-2">
                <div className="flex">
                  <div className="mr-4 w-1/2">
                    <label>
                      <input
                        type="radio"
                        name="ppctTrained"
                        value="yes"
                        required
                      />{" "}
                      Yes
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="radio" name="ppctTrained" value="no" /> No
                    </label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-2">CUFF #:</td>
              <td className="py-2">
                <input
                  type="number"
                  name="cuffNumber"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="py-2">Uniform Belt Boots:</td>
              <td className="py-2">
                <div className="flex">
                  <div className="mr-4 w-1/2">
                    <label>
                      <input
                        type="radio"
                        name="uniformBeltBoots"
                        value="yes"
                        required
                      />{" "}
                      Yes
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="radio" name="uniformBeltBoots" value="no" />{" "}
                      No
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
                      Yes
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="radio" name="casualVest" value="no" /> No
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
                      Yes
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="radio" name="casualEarplugs" value="no" /> No
                    </label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-2">On Site Time:</td>
              <td className="py-2">
                <input
                  type="time"
                  name="onSiteTime"
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

export default GuardCheckInForm;
