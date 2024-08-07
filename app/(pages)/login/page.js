import LoginForm from "../../components/LoginForm";
import Footer from "../../components/Footer";

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

      {/* Heading visible on all screen sizes, with adjusted padding for mobile */}
      <div className="w-full px-10 pt-4 pb-1 text-center text-white z-20 block sm:hidden">
        <h1 className="text-5xl font-bold mt-2 mb-10">CheckInOut</h1>
      </div>

      <div className="relative flex flex-1 flex-col md:flex-row">
        {/* Login Form and text container with tighter vertical padding on mobile */}
        <div className="w-full md:w-2/5 flex justify-center items-center px-10 py-2 order-2 md:order-1">
          <div
            className="flex flex-col items-center"
            style={{ width: "400px" }}
          >
            {/* LoginForm container with less vertical padding */}
            <div
              className="bg-white bg-opacity-80 rounded-lg px-6 py-4 md:p-8 flex flex-col justify-center items-center"
              style={{ width: "100%", height: "auto" }}
            >
              <h1 className="text-3xl md:text-4xl mt-1 mb-4 font-bold text-center">
                Welcome!
              </h1>
              <div
                className="w-full bg-white bg-opacity-70 rounded-lg shadow-lg"
                style={{ padding: "16px" }}
              >
                <LoginForm />
              </div>
            </div>
            {/* Paragraph text positioned just below LoginForm */}
            <div
              className="mt-2 text-center max-w-xs text-white md:hidden p-3 rounded-lg"
              style={{ width: "100%" }}
            >
              <p className="text-sm my-4">
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

        {/* Desktop Content */}
        <div className="w-full md:w-3/5 md:flex justify-center items-center p-10 order-1 md:order-2 relative hidden">
          <div className="text-center max-w-xs md:max-w-md lg:max-w-lg text-white">
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
      </div>

      <Footer />
    </div>
  );
}
