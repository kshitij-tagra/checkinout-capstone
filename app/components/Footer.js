import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 relative z-10 text-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          &copy; {new Date().getFullYear()} CheckInOut. All Rights Reserved.
        </div>
        <div>
          <Link href="/pages/terms" className="mr-10 hover:underline">
            Terms & Conditions
          </Link>
          <Link href="/pages/privacy" className="mr-10 hover:underline">
            Privacy Policy
          </Link>
          <Link href="/pages/about" className="mr-10 hover:underline">
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
