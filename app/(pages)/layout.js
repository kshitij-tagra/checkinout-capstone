import { Inter } from "next/font/google";
import "../globals.css";
import { NextAuthProvider } from "../../lib/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CheckInOut",
  description: "Security Equipment Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body className={inter.className}>{children}</body>
      </NextAuthProvider>
    </html>
  );
}
