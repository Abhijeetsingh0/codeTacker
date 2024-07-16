import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar"
import { GlobalProvider } from "@/contexts/globalStataeContext";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth focus:scroll-auto">
      <body className="">
        <GlobalProvider>
          <Navbar/>
          {children} 
        </GlobalProvider>
      </body>
    </html>
  );
}