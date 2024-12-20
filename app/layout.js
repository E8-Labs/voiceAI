import { Inter } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "@/components/socialAuth/SessioneProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CreatorX",
  description: "Created by e-8 Labs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* code for removing scrolling on phones */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" /> */}

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Code for popins
        <link rel="icon" href="/Xlogo.png" /> */}
        <link rel="shortcut icon" href="icon.ico" />
        <link rel="icon" href="/creaatorXlogomain.jpg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        {/* Code for inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
