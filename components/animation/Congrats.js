"use client";
import React, { useRef } from "react";
import Lottie from "lottie-react";

import OrbGif from "./OrbGif";
import { useRouter } from "next/navigation";

// import { APP_BG_IMAGE } from "@/constants";



export default function Congrats() {
    const lottieRef = useRef();
    const router = useRouter();

    return (
        <div className="flex flex-col h-[100svh] w-[100svw] bg-white overflow-hidden ">
            {/* Background Image */}
            <div className="h-[62svh] ">
                <OrbGif alignOrbCenter={false} />
                <Lottie
                    animationData={require("/public/congratsanimation.json")}
                    lottieRef={lottieRef}

                    loop={true}
                    style={{ height: "50vh", width: "50vw", position: "absolute", top: "14%", left: "25%" }}
                    onComplete={() => {
                        lottieRef.current.goToAndStop(3, true)
                    }}
                />
            </div>
            <div className="flex flex-col h-[37svh] justify-start items-center w-full">
                <div className="text-2xl font-semibold text-center text-black">
                    Congratulations!
                </div>
                <div className="text-sm mt-4  text-center text-subtitle60">
                    We can use this to share important updates to you
                </div>
                <button
                    onClick={() => {
                        console.log("Handle continue here");
                        router.push("/creator/buildscript")
                    }}
                    className="rounded-full p-2 mt-8 bg-purple hover:bg-purple text-white w-3/5 sm:w-2/5 lg:w-1/5"
                >
                    Continue
                </button>
            </div>


        </div>
    );
}