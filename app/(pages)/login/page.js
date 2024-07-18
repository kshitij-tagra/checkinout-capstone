import LoginForm from "../../components/LoginForm";
import Footer from "../../components/Footer";

export default function Page() {
    return (
        <div className="flex flex-col min-h-screen relative">
            <div className="relative flex flex-1 flex-col md:flex-row">
                <div className="w-full md:w-3/5 flex justify-center items-center p-10 order-1 md:order-2 relative">
                    <div className="text-center  max-w-xs md:max-w-md lg:max-w-lg">
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-2">
                            CheckInOut
                        </h1>
                        <p className="mt-4 md:mt-8 text-sm md:text-base lg:text-lg">
                            CheckInOut is your comprehensive solution for
                            managing security guard check-ins and equipment. Our
                            intuitive platform simplifies the process, allowing
                            you to streamline your security operations
                            effortlessly. With CheckInOut, you can efficiently
                            track guard rotations, assign equipment, and ensure
                            compliance with ease. Experience seamless management
                            and heightened security with CheckInOut today.
                        </p>
                    </div>
                </div>
                <div className="w-full md:w-2/5 flex justify-center items-center p-10 order-2 md:order-1">
                    <div
                        className="bg-white bg-opacity-80 rounded-lg p-6 md:p-8  flex flex-col justify-center items-center"
                        style={{ height: "500px", width: "400px" }}>
                        <h1 className="text-3xl md:text-4xl mt-3 font-bold justify-center items-center text-center">
                            Welcome!
                        </h1>
                        <br />
                        <br />
                        <div
                            className="w-full p-4 md:p-6 bg-white bg-opacity-70 rounded-lg shadow-lg"
                            style={{ height: "350px", width: "350px" }}>
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
