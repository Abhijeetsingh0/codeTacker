import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar"
import { GlobalProvider } from "@/contexts/globalStataeContext";
import Footer from "@/app/components/footer";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "@/app/components/errorBoundary"

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth focus:scroll-auto">
      <body>
        <div className='bg-gray-800 h-full bg-center border border-white'>
        <ErrorBoundary fallback={<Error/>}>
          <GlobalProvider>
              <Navbar />
                {children} 
          </GlobalProvider>
        </ErrorBoundary>
        </div>
        
        <Footer />
      </body>
    </html>
  );
}