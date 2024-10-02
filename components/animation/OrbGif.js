import React, { useEffect, useState } from "react";
import Image from "next/image";

function OrbGif({ alignOrbCenter = true }) {

    const [isHighScreen, setIsHighScreen] = useState(false);
    const [isWideScreen, setIsWideScreen] = useState(false);

    //code for wide screen
    useEffect(() => {
        const handleResize = () => {

            setIsWideScreen(window.innerWidth >= 950);

            setIsHighScreen(window.innerHeight >= 640);

            // Log the updated state values for debugging (Optional)
            console.log("isWideScreen: ", window.innerWidth >= 640);
            console.log("isWideScreen2: ", window.innerWidth >= 950);
        };

        handleResize(); // Set initial state
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const gifBackgroundImage = {
        backgroundImage: 'url("/assets/applogo2.png")', // Ensure the correct path
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: isHighScreen ? "570px" : "350px",
        height: isHighScreen ? "570px" : "350px",
        borderRadius: "50%",
        resize: "cover",
        border: '2px solid green'
    };

    return (
        <div
            className={`relative flex flex-col items-center ${alignOrbCenter ? "justify-center" : "justify-end"
                } h-full p-0`}
        >
            {/* <button className="relative flex flex-col items-center justify-center bg-yellow-100 p-0 "> */}
            <div className="overflow-hidden flex flex-row justify-center" //style={gifBackgroundImage}
            >
                <Image
                    className="overflow-hidden rounded-full  object-contain cursor-pointer mt-12"
                    src="/maingif.gif"
                    alt="gif"
                    // className="object-contain"
                    layout="intrinsic"
                    width={500}
                    height={500}
                    style={{ maxHeight: "50svh", maxWidth: "50vw", backgroundColor: "" }} // Adjust for larger screens
                />
            </div>
            {/* </button> */}
        </div>
    );
}

export default OrbGif;