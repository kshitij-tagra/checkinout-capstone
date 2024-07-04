import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "../app/_utils/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CheckInOut",
  description: "Security Equipment Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
