import LoginForm from "./components/LoginForm";
import Footer from "./components/Footer";

export default function Home() {
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
        <div className="w-full md:w-2/5 flex justify-center items-center p-10">
          <div
            className="w-full md:w-4/5 bg-white bg-opacity-80 rounded-lg p-8 flex flex-col justify-center items-center"
            style={{ height: "90%" }}
          >
            <h1 className="text-5xl font-bold mb-4 text-center">Welcome!</h1>
            <br />
            <br />
            <div className="w-full p-4 bg-white bg-opacity-70 rounded-lg shadow-lg">
              <LoginForm />
            </div>
          </div>
        </div>
        <div className="w-full md:w-3/5 flex justify-center items-center p-10 relative">
          <img
            src="/logo.png"
            alt="CheckInOut Logo"
            title="CheckInOut"
            className="favicon-icon absolute top-6 right-6 rounded-full"
            height="60px"
            width="60px"
          />
          <div className="text-center text-white">
            <h1 className="text-7xl font-bold mb-2">CheckInOut</h1>
            <p className="mt-8">
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
      </div>

      <Footer />
    </div>
  );
}
