"use client";
import Animation from "@/components/animation/Animation";
import BoxAnimationIndex1 from "@/components/creatorOnboarding/BoxAnimationIndex1";
import BoxAnimationIndex2 from "@/components/creatorOnboarding/BoxAnimationIndex2";
import ScriptAnimation from "@/components/creatorOnboarding/ScriptAnimation";
import ScriptAiAnimation from "@/components/creatorOnboarding/ScriptAnimation";
import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHighScreen, setIsHighScreen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [isWideScreen2, setIsWideScreen2] = useState(false);

  const [randomDelayAnim1, setRandomDelayAnim1] = useState(getRandomDelay());
  const [randomDelayAnim2, setRandomDelayAnim2] = useState(getRandomDelay());
  const [randomDelayAnim3, setRandomDelayAnim3] = useState(getRandomDelay());
  const [randomDelayAnim4, setRandomDelayAnim4] = useState(getRandomDelay());

  // Function to generate a random delay between 1 and 7 seconds
  function getRandomDelay(limit = 6) {
    let random = Math.random() * limit + 1
    // console.log('Random', random)
    return random
    return Math.random() * 6 + 1; // 1 to 7 seconds
  }

  const handleCurrentIndex = (id) => {
    setCurrentIndex(id);
    console.log("Current index is", id);
  };

  //resize gif
  useEffect(() => {
    const handleResize = () => {
      // Check if width is greater than or equal to 1024px
      setIsWideScreen(window.innerWidth >= 950);

      setIsWideScreen2(window.innerWidth >= 500);
      // Check if height is greater than or equal to 1024px
      setIsHighScreen(window.innerHeight >= 950);

      // Log the updated state values for debugging (Optional)
      console.log("isWideScreen: ", window.innerWidth >= 950);
      console.log("isWideScreen2: ", window.innerWidth >= 500);
      console.log("isHighScreen: ", window.innerHeight >= 1024);
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //code for gif image
  const gifBackgroundImage = {
    backgroundImage: 'url("/assets/applogo2.png")', // Ensure the correct path
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: isHighScreen ? "870px" : "500px",
    height: isHighScreen ? "870px" : "500px",
    // borderRadius: "50%",
    resize: "cover",
  };

  return (
    <div
      className="w-full"
      style={{
        height: "100svh",
        display: "flex",
        alignItems: "center",
        width: "",
        overflow: "hidden",
      }}
    >
      <div
        className="flex flex-row items-center justify-center w-full"
        style={{ height: "100%" }}
      >
        <div
          // className='flex flex-row justify-center md:w-5/12 w-full items-center'
          // className={`flex flex-row justify-center h-screen lg:w-6/12 w-full ${currentIndex === 4 ? "2xl:w-6/12" : "lg:w-6/12 w-full"//, currentIndex === 4 ? "w-full" : "lg:w-4/12 w-full", 
          //   }`
          // }
          className="flex flex-row justify-center h-screen lg:w-6/12 w-full"
          style={{ backgroundColor: "" }}
        >
          <div className="sm:w-9/12 w-full h-screen flex flex-col justify-between px-8 sm:px-0"
            style={{ backgroundColor: "" }}
          >
            <div
              // className="mt-12 sm:mt-24"
              className='justify-between pt-8 sm:pt-8 md:pt-10 md:w-full w-10/12'
              style={{ backgroundColor: "" }}
            >
              <Image
                src={"/creatorXlogo.png"}
                alt="logo"
                height={410}
                width={116}
                style={{ backgroundColor: '' }}
              />
              {/* <div>Onboarding 2</div> */}
            </div>
            <div
              className=" sm:w-full w-full" //className={currentIndex === 7 ? 'pt-28 sm:pt-0 sm:w-full w-10/12' : 'pt-28 sm:pt-28 sm:w-full w-10/12'}  //'pt-28 sm:w-full w-10/12' //{currentIndex === 7 ? 'pt-28 sm:pt-28 sm:w-full w-10/12' : 'sm:w-full w-10/12'}
              style={{
                backgroundColor: "",
                height: currentIndex === 3 ? "85%" : "68%",
                overflow: 'auto',
                scrollbarWidth: 'none',
                marginTop: 25
              }}
            >
              <div
                className="w-full flex justify-center items-center"
                style={{ backgroundColor: "" }}
              >
                <ScriptAnimation onChangeIndex={handleCurrentIndex} />
              </div>
            </div>
            <div />
          </div>
        </div>
        <div
          className="w-6/12 flex lg:flex hidden justify-center items-center"
          style={{ height: "100%", border: "none" }}
        >
          {/* <img src="/assets/mainLogo.png" alt='app' style={{ height: "850px", width: "100%", resize: "cover", objectFit: "contain" }} /> */}
          <div
            style={gifBackgroundImage}
            className="flex flex-row justify-center items-center"
          >
            {
              (currentIndex === 0 || currentIndex > 2) && (
                <Image
                  // onClick={handleContinue}
                  src="/mainAppGif3.gif"
                  alt="gif"
                  className={`rounded-full ${isHighScreen ? 'h-[780px] w-[780px]' : 'h-[450px] w-[450px]'}`}
                  height={600}
                  width={600}
                />
              )
            }
            {
              currentIndex === 1 &&
              <div className="w-full">
                <BoxAnimationIndex1 currentIndex={currentIndex} />
              </div>
            }
            {
              currentIndex === 2 &&
              <div className="w-full">
                <BoxAnimationIndex2 currentIndex={currentIndex} />
              </div>
            }
          </div>
        </div>
      </div>
      {/* <div>hello</div> */}
    </div>
  );
}
