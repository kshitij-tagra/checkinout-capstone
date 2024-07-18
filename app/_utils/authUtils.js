import bcrypt from "bcryptjs";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function validate(email, password) {
    const res = await getDoc(doc(db, "supervisors", email));
    const user = res.data();
    // console.log(user);

    if (!user) {
        return { success: false, message: "invalid credentials" };
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return { success: false, message: "invalid credentials" };
    }
    return {
        success: true,
        message: "validation successfull",
        user: {
            email: user.email,
            corpsID: user.corpsID,
            name: user.name,
            phoneNumber: user.phoneNumber,
        },
    };
}
