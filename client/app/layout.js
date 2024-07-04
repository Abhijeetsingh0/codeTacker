import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar"

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children} 
      </body>
    </html>
  );
}
