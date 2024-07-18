import { collection, getDoc, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../_utils/firebase";

const GuardCheckInForm = ({ guard, onCheckInFormSubmit, onCancel }) => {
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

    const [selectedCamPouchNumber, setSelectedCamPuchNumber] = useState(null);
    const [selectedRadioPouchNumber, setSelectedRadioPuchNumber] =
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

    return (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 mx-auto">
            <h2 className="text-xl font-bold mb-4">{`Checking in "${guard.name}"`}</h2>
            <form onSubmit={handleSubmit}>
                {/** Manually set each form field with proper labels and ordering **/}
                <div className="flex justify-between">
                    <span className="py-2">Security License:</span>
                    <span className="py-2">
                        {renderRadioButtons("securityLicense")}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="py-2">Notebook:</span>
                    <span className="py-2">
                        {renderRadioButtons("notebook")}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="py-2">BVC ID: </span>
                    <span className="py-2">{renderRadioButtons("bvcId")} </span>
                </div>
                <div className="flex justify-between">
                    <span className="py-2">First Aid Certificate: </span>
                    <span className="py-2">
                        {renderRadioButtons("firstAidCertificate")}
                    </span>
                </div>

                <label htmlFor="cmsatNumber" className="inline-block mr-5">
                    CAMSAT #
                </label>
                <select
                    className="bg-neutral-100 p-2"
                    name="camsatNumber"
                    id="cmsatNumber"
                    onChange={async (e) => {
                        handleChange(e);
                        const selectedCamObj = equipments.find(
                            (eqp) => eqp["device#"] === e.target.value
                        );
                        setSelectedCamsetID(selectedCamObj.id);
                        if (selectedCamObj) {
                            setSelectedCamPuchNumber(
                                selectedCamObj["devicePouch#"]
                            );
                        } else {
                            setSelectedCamPuchNumber(null);
                        }
                    }}
                    defaultValue={""}>
                    <option value={""}>Select a camset#</option>
                    {equipments
                        .filter(
                            (eqp) =>
                                eqp.available === true &&
                                eqp.deviceType === "CAM"
                        )
                        .map((eqp) => {
                            return (
                                <option key={eqp.id} value={eqp["device#"]}>
                                    {eqp["device#"]}
                                </option>
                            );
                        })}
                </select>

                <span className="bg-neutral-200 inline-block  rounded-md p-2 m-2">
                    Device Puch Number:
                    {selectedCamPouchNumber
                        ? ` ${selectedCamPouchNumber}`
                        : "No camset Selected"}
                </span>
                {errors["camsatNumber"] && (
                    <p className="text-red-500">{errors["camsatNumber"]}</p>
                )}

                <div>
                    <label htmlFor="radioNumber" className="mr-9">
                        RADIO #
                    </label>
                    <select
                        name="radioNumber"
                        className="bg-neutral-100 p-2"
                        id="radioNumber"
                        onChange={async (e) => {
                            handleChange(e);
                            const selectedRadObj = equipments.find(
                                (eqp) => eqp["device#"] === e.target.value
                            );
                            setSelectedRadioID(selectedRadObj.id);

                            if (selectedRadObj) {
                                setSelectedRadioPuchNumber(
                                    selectedRadObj["devicePouch#"]
                                );
                            } else {
                                setSelectedRadioPuchNumber(null);
                            }
                        }}
                        defaultValue={""}>
                        <option value={""}>Select a radio#</option>
                        {equipments
                            .filter(
                                (eqp) =>
                                    eqp.available === true &&
                                    eqp.deviceType === "RAD"
                            )
                            .map((eqp) => {
                                return (
                                    <option key={eqp.id} value={eqp["device#"]}>
                                        {eqp["device#"]}
                                    </option>
                                );
                            })}
                    </select>

                    <span className="bg-neutral-200 inline-block  rounded-md p-2 m-2">
                        Radio Puch Number:
                        {selectedRadioPouchNumber
                            ? ` ${selectedRadioPouchNumber}`
                            : "No radio Selected"}
                    </span>
                    {errors["radioNumber"] && (
                        <p className="text-red-500">{errors["radioNumber"]}</p>
                    )}
                </div>

                <div className="flex justify-between">
                    <span className="py-2">Uniform Belt Boots: </span>
                    <span className="py-2">
                        {renderRadioButtons("uniformBeltBoots")}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="py-2">Casual Vest: </span>
                    <span className="py-2">
                        {renderRadioButtons("casualVest")}{" "}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="py-2">Casual Earplugs: </span>
                    <span className="py-2">
                        {renderRadioButtons("casualEarplugs")}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="py-2">PPCT Trained: </span>
                    <span className="py-2">
                        {renderRadioButtons("ppctTrained")}
                    </span>
                </div>
                {formData.ppctTrained === "yes" && (
                    <>
                        <label
                            htmlFor="cuffNumber"
                            className="inline-block mr-5 mt-6">
                            CUFF #
                        </label>
                        <select
                            name="cuffNumber"
                            className="bg-neutral-100 p-2"
                            id="cuffNumber"
                            onChange={(e) => {
                                handleChange(e);
                                const selectedCuffObj = equipments.find(
                                    (eqp) => eqp["device#"] === e.target.value
                                );
                                setSelectedCuffID(selectedCuffObj.id);
                            }}
                            defaultValue={""}>
                            <option value={""}>Select a CUFF#</option>
                            {equipments
                                .filter(
                                    (eqp) =>
                                        eqp.available === true &&
                                        eqp.deviceType === "CUF"
                                )
                                .map((eqp) => {
                                    return (
                                        <option
                                            key={eqp.id}
                                            value={eqp["device#"]}>
                                            {eqp["device#"]}
                                        </option>
                                    );
                                })}
                        </select>
                        {errors["cuffNumber"] && (
                            <p className="text-red-500">
                                {errors["cuffNumber"]}
                            </p>
                        )}
                    </>
                )}

                <div className="flex justify-between">
                    <span className="py-2">On Site Time: </span>
                    <span className="py-2">
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
                    </span>
                </div>

                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        type="button"
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={onCancel}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );

    function renderRadioButtons(fieldName) {
        return (
            <div className="flex gap-8">
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
                <div>
                    {errors[fieldName] && (
                        <p className="text-red-500">{errors[fieldName]}</p>
                    )}
                </div>
            </div>
        );
    }
};

export default GuardCheckInForm;
