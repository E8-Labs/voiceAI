import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const MainHomeScreen = () => {

    const router = useRouter();

    const [windowHeight, setWindowHeight] = useState(1200);
    const [isHighScreen, setIsHighScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            // Check if width is greater than or equal to 1024px
            setWindowHeight(window.innerHeight);
            setIsHighScreen(window.innerHeight >= 950);

        };

        handleResize(); // Set initial state
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const backgroundImage = {
        backgroundImage: 'url("/creatorProfileBg.png")', // Ensure the correct path
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        height: "100svh",
        overflow: "hidden",
    };

    const gifBackgroundImage = {
        backgroundImage: 'url("/assets/applogo2.png")', // Ensure the correct path
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: isHighScreen ? "790px" : "530px",
        height: isHighScreen ? "790px" : "530px",
        borderRadius: "50%",
        resize: "cover",
    };

    return (
        <div className='flex flex-col items-center justify-center' style={{ ...backgroundImage, height: "100vh" }}>
            <div className='flex flex-row items-center w-10/12'
                style={{
                    position: "absolute",
                    top: "5%"
                }}
            >
                <div className='w-full flex flex-row items-center justify-between'>
                    <button>
                        <Image src={'/creatorXlogo.png'}
                            alt='logo'
                            height={410}
                            width={116}
                        />
                    </button>
                    <div
                        className="flex items-end px-4 bg-purple"
                        style={{
                            // backgroundColor: "#620FEB66",
                            width: "fit-content",
                            borderRadius: "70px",
                        }}
                    >
                        <button className="flex flex-row p-4 items-center gap-4">
                            <Image
                                src={"/assets/stars.png"}
                                alt="phone"
                                height={20}
                                width={20}
                            />
                            <div
                                onClick={
                                    // handleCreatorXClick
                                    () => {
                                        router.push("/creator/onboarding2")
                                    }
                                }
                                className="text-white"
                                style={{ fontSize: 17, fontWeight: "500" }}
                            >
                                Build Your CreatorX
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex flex-row items-center w-10/12'>
                <div className='w-full lg:w-6/12'>
                    <div style={{ fontSize: 40, fontWeight: "600" }}>
                        Increase Engagement With Followers and Build True Fans
                    </div>
                    <div style={{ fontSize: 18, fontWeight: "500", marginTop: 30 }}>
                        The next wave of the creator economy is here-engage and grow your community like never before offering one-on-one intraction that turn followers into customers.
                    </div>
                    <div
                        className="flex items-end bg-purple"
                        style={{
                            // backgroundColor: "#620FEB66",
                            width: "fit-content",
                            borderRadius: "70px",
                            marginTop: 30
                        }}
                    >
                        <button className="flex flex-row px-4 py-2 items-center gap-4">
                            <Image
                                src={"/assets/stars.png"}
                                alt="phone"
                                height={20}
                                width={20}
                            />
                            <div
                                onClick={
                                    // handleCreatorXClick
                                    () => {
                                        router.push("/tristan.ai")
                                    }
                                }
                                className="text-white"
                                style={{ fontSize: 17, fontWeight: "500" }}
                            >
                                Get Started
                            </div>
                        </button>
                    </div>
                </div>
                <div className='w-6/12 lg:flex hidden'>
                    <div
                        style={gifBackgroundImage}
                        className="flex flex-row justify-center items-center"
                    >
                        <Image
                            src="/maingif.gif"
                            alt="gif"
                            style={{
                                backgroundColor: "",
                                borderRadius: "50%",
                                height: windowHeight / 2.14,
                                width: windowHeight / 2.14,
                            }}
                            height={600}
                            width={600}
                        />
                    </div>
                </div>
            </div>
            {/* <div /> */}
        </div>
    )
}

export default MainHomeScreen