import React from "react";
import EquipmentAuditForm from "../components/EquipmentAuditForm";
import ReturnsWithErrors from "../components/ReturnsWithErrors";

const Audit = () => (
    <div className="p-4 w-full">
        <h1 className="text-2xl font-bold text-center mb-4">
            - Audit Equipment -
        </h1>
        <EquipmentAuditForm />

        <h2 className="text-2xl font-bold text-center my-4">
            - Faulty Checkouts -
        </h2>
        <ReturnsWithErrors />
    </div>
);

export default Audit;
