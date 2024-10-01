import React, { useEffect, useState } from "react";
import Image from "next/image";

function OrbGif({ alignOrbCenter = true }) {

    return (
        <div
            className={`relative flex flex-col items-center ${alignOrbCenter ? "justify-center" : "justify-end"
                } h-full p-0`}
        >
            {/* <button className="relative flex flex-col items-center justify-center bg-yellow-100 p-0 "> */}
            <div className="overflow-hidden rounded-full">
                <Image
                    className="overflow-hidden rounded-full  object-contain cursor-pointer mt-12"
                    src="/mainGif.gif"
                    alt="gif"
                    // className="object-contain"
                    layout="intrinsic"
                    width={500}
                    height={500}
                    style={{ maxHeight: "50svh", maxWidth: "50vw" }} // Adjust for larger screens
                />
            </div>
            {/* </button> */}
        </div>
    );
}

export default OrbGif;