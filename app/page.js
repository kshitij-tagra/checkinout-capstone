import LoginForm from "./components/LoginForm";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center blur-sm"
        style={{
          backgroundImage: "url('/homepage.jpg')",
        }}
      ></div>

      {/* Overlay to apply opacity to background */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      <div className="relative flex flex-1 flex-col md:flex-row">
        <div className="w-full md:w-3/5 flex justify-center items-center p-10 order-1 md:order-2 relative">
          <img
            src="/logo.png"
            alt="CheckInOut Logo"
            title="CheckInOut"
            className="absolute top-2 right-2 md:top-6 md:right-6 rounded-full"
            style={{ height: "50px", width: "50px" }}
          />
          <div className="text-center text-white max-w-xs md:max-w-md lg:max-w-lg">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-2">
              CheckInOut
            </h1>
            <p className="mt-4 md:mt-8 text-sm md:text-base lg:text-lg">
              CheckInOut is your comprehensive solution for managing security
              guard check-ins and equipment. Our intuitive platform simplifies
              the process, allowing you to streamline your security operations
              effortlessly. With CheckInOut, you can efficiently track guard
              rotations, assign equipment, and ensure compliance with ease.
              Experience seamless management and heightened security with
              CheckInOut today.
            </p>
          </div>
        </div>
        <div className="w-full md:w-2/5 flex justify-center items-center p-10 order-2 md:order-1">
          <div
            className="bg-white bg-opacity-80 rounded-lg p-6 md:p-8  flex flex-col justify-center items-center"
            style={{ height: "500px", width: "400px" }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              Welcome!
            </h1>
            <br />
            <br />
            <div className="w-full p-4 md:p-6 bg-white bg-opacity-70 rounded-lg shadow-lg">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
