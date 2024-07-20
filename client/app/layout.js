import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar"
import { GlobalProvider } from "@/contexts/globalStataeContext";
import ErrorBoundary  from "./components/errorBoundary";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth focus:scroll-auto">
      <body  className='bg-zinc-200'>
        {/* <ErrorBoundary> */}
          <GlobalProvider>
           
              <Navbar />
            
                {children} 
            
          </GlobalProvider>
        {/* </ErrorBoundary> */}
      </body>
    </html>
  );
}