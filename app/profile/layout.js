import ProfileNav from "@/components/Navbar/ProfileNav";
import { Inter } from "next/font/google";
// import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Create Next App",
    description: "Generated by e-8 labs",
};

const backgroundImage = {
    backgroundImage: 'url("/creatorProfileBg.png")', // Ensure the correct path
    backgroundSize: "cover",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '100vh',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/creaatorXlogomain.png" />
                {/* Code for popins */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
                {/* Code for inter */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
            </head>
            <body className={inter.className}>
                <div className="flex flex-row w-full" style={backgroundImage}>
                    <div className="w-2/12 h-screen">
                        <ProfileNav />
                    </div>
                    <div className="w-10/12">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
