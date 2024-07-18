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
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-start">GuardId</th>
                        <th className="text-start">GuardName</th>
                        <th className="text-start">radio & pouch</th>
                        <th className="text-start">camsat & pouch</th>
                        <th className="text-start">handcuffs</th>
                    </tr>
                </thead>

                <tbody>
                    {faultyReturns.map((f) => {
                        return (
                            <tr key={f.faultId}>
                                <td>{f.guard.corpsID}</td>
                                <td>{f.guard.name}</td>
                                <td
                                    className={
                                        f.errorsInReturn.radio === "true"
                                            ? "text-green-400"
                                            : "text-red-500"
                                    }>
                                    {f.errorsInReturn.radio === "true"
                                        ? "Returned"
                                        : "Not Returned"}
                                </td>
                                <td
                                    className={
                                        f.errorsInReturn.camsat === "true"
                                            ? "text-green-400"
                                            : "text-red-500"
                                    }>
                                    {f.errorsInReturn.camsat === "true"
                                        ? "Returned"
                                        : "Not Returned"}
                                </td>
                                <td
                                    className={
                                        f.borrowedItems["cuff"] === "true"
                                            ? f.errorsInReturn.cuff === "true"
                                                ? "text-green-400"
                                                : "text-red-500"
                                            : ""
                                    }>
                                    {f.borrowedItems.cuff === "true"
                                        ? f.errorsInReturn.cuff === "true"
                                            ? "Returned"
                                            : "Not Returned"
                                        : "--"}
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
