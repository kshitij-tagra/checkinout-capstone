import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 relative z-10 text-sm">
      <div className="container mx-auto flex flex-col md:flex-row justify-between text-center items-center">
        <div className="mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} CheckInOut. All Rights Reserved.
        </div>
        <div className="flex flex-col md:flex-row">
          <Link href="/pages/terms" className="mb-2 md:mb-0 md:mr-10 hover:underline">
            Terms & Conditions
          </Link>
          <Link href="/pages/privacy" className="mb-2 md:mb-0 md:mr-10 hover:underline">
            Privacy Policy
          </Link>
          <Link href="/pages/about" className="mb-2 md:mb-0 md:mr-10 hover:underline">
            About Us
          </Link>
          <Link href="/pages/contact" className="hover:underline">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;