"use client";
import Animation from "@/components/animation/Animation";
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
    borderRadius: "50%",
    resize: "cover",
  };

  return (
    <div
      className="w-full"
      style={{
        height: "100vh",
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
          className={`flex flex-row justify-center h-screen ${
            currentIndex === 6 ? "w-full" : "lg:w-5/12 w-full"
          }`}
          style={{ backgroundColor: "" }}
        >
          <div className="sm:w-10/12 w-full h-screen flex flex-col justify-between">
            <div
              className="mt-24 sm:flex hidden"
              style={{ backgroundColor: "" }}
            >
              <Image
                src={"/creatorXlogo.png"}
                alt="logo"
                height={410}
                width={116}
              />
              {/* <div>Onboarding 2</div> */}
            </div>
            <div
              className=" sm:w-full w-full" //className={currentIndex === 7 ? 'pt-28 sm:pt-0 sm:w-full w-10/12' : 'pt-28 sm:pt-28 sm:w-full w-10/12'}  //'pt-28 sm:w-full w-10/12' //{currentIndex === 7 ? 'pt-28 sm:pt-28 sm:w-full w-10/12' : 'sm:w-full w-10/12'}
              style={{
                backgroundColor: "",
                height: currentIndex === 3 ? "85%" : "68%",
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
          className="w-7/12 flex lg:flex hidden justify-center items-center"
          style={{ height: "100%", border: "none" }}
        >
          {/* <img src="/assets/mainLogo.png" alt='app' style={{ height: "850px", width: "100%", resize: "cover", objectFit: "contain" }} /> */}
          <div
            style={gifBackgroundImage}
            className="flex flex-row justify-center items-center"
          >
            {/*<Image
                            // onClick={handleContinue}
                            src="/mainAppGif3.gif" alt='gif' style={{
                                backgroundColor: "",
                                borderRadius: "50%", height: isHighScreen ? '780px' : '450px', width: isHighScreen ? '780px' : '450px'
                            }} height={600} width={600} />*/}
            <Box
              sx={{
                position: "relative",
                height: isHighScreen ? "780px" : "450px",
                width: isHighScreen ? "780px" : "450px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: 'yellow',
                borderRadius: "50%",
                overflow: "hidden", // This ensures that the images don't overflow out of the circular container
              }}
            >
              {/* Main GIF */}
              <Image
                src="/mainAppGif3.gif"
                alt="gif"
                layout="fill"
                objectFit="cover"
              />

              {/* First Animated Image Jay Shetty*/}
              <Box
                sx={{
                  position: "absolute",
                  top: 70,
                  right: 140,
                  zIndex: 2, // Ensure it's above the main GIF
                }}
              >
                <motion.div
                  alt="user11"
                  className="flex flex-row items-center justify-center"
                  style={{
                    transformOrigin: "center center",
                    border: "2px solid white",
                    paddingInline: 10,
                    // borderRadius: 15,
                    paddingTop: 10,
                    backgroundColor: "#FFFFFF80",
                  }} // This sets the origin to the center
                  animate={{
                    opacity: [0, 1, 0, 0], // Animates opacity
                    height: ["30px", "70px", "70px", "30px"], // Only animates height
                  }}
                  onUpdate={()=>{
                    setRandomDelayAnim1(getRandomDelay(5))
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    times: [0, 0.3, 0.5, 1], // Defines keyframe timings
                    repeatDelay: 0.2,
                    ease: "easeInOut",
                    delay: randomDelayAnim1,
                  }}
                >
                  {
                    currentIndex == 1 && (
                        <div
                    className="flex flex-row justify-center" //</motion.div>items-center' style={{}}
                  >
                    <Image
                      src="/assets/jay.png"
                      alt="123"
                      style={{
                        borderRadius: "50%",
                        height: "50px",
                        width: "50px",
                        backgroundColor: "",
                      }}
                      height={50}
                      width={50}
                    />
                    <div className="" style={{ color: "#00000060" }}>
                      Jay Shetty
                    </div>
                    <div className=" ml-2">Relationship Coach</div>
                  </div>
                    )
                  }
                  
                </motion.div>
              </Box>

              {/* Second Animated Image MKBHD*/}
              <Box
                sx={{
                  position: "absolute",
                  top: 180,
                  right: 280,
                  zIndex: 2, // Ensure it's above the main GIF
                }}
              >
                <motion.div
                  alt="user11"
                  className="flex flex-row items-center justify-center"
                  style={{
                    transformOrigin: "center center",
                    border: "2px solid white",
                    paddingInline: 10,
                    borderRadius: 15,
                    // paddingTop: 10,
                    width: "300px",
                    backgroundColor: "#FFFFFF80",
                  }} // This sets the origin to the center
                  animate={{
                    opacity: [0, 1, 0, 0], // Animates opacity
                    height: ["30px", "70px", "70px", "30px"], // Only animates height
                  }}
                  onUpdate={()=>{
                    setRandomDelayAnim2(getRandomDelay(4))
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    times: [0, 0.3, 0.5, 1], // Defines keyframe timings
                    repeatDelay: 0.2,
                    ease: "easeInOut",
                    delay: randomDelayAnim2,
                  }}
                >
                  <div
                    className="flex flex-row items-center" //</motion.div>items-center' style={{}}
                  >
                    <Image
                      src="/mkbhd.png"
                      alt="123"
                      // style={{ borderRadius: '50%', height: '50px', width: '50px',objectFit: 'cover', objectPosition: 'center', backgroundColor: '' }}
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "",
                        borderRadius: "50%",
                        border: "3px solid white",
                        objectFit: "cover",
                        objectPosition: "center",
                        // backgroundColor: 'red'
                      }}
                      height={50}
                      width={50}
                    />
                    <div className="" style={{ color: "#00000060" }}>
                      MKBHD
                    </div>
                    <div className=" ml-1">Content Creator</div>
                  </div>
                </motion.div>
              </Box>

              {/* Third Animated Image Alex Hormozi*/}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 250,
                  right: 180,
                  zIndex: 2, // Ensure it's above the main GIF
                  width: "200px",
                }}
              >
                <motion.div
                  alt="user11"
                  className="flex flex-row items-center justify-center"
                  style={{
                    transformOrigin: "center center",
                    border: "2px solid white",
                    paddingInline: 10,
                    borderRadius: 15,
                    // paddingTop: 10,
                    width: "300px",
                    backgroundColor: "#FFFFFF80",
                  }} // This sets the origin to the center
                  animate={{
                    opacity: [0, 1, 0, 0], // Animates opacity
                    height: ["30px", "70px", "70px", "30px"], // Onlyanimates height
                  }}
                  onUpdate={()=>{
                    setRandomDelayAnim3(getRandomDelay(8))
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    times: [0, 0.3, 0.5, 1], // Defines keyframe timings
                    repeatDelay: 0.2,
                    ease: "easeInOut",
                    delay: randomDelayAnim3,
                  }}
                >
                  <div
                    className="flex flex-row items-center" //</motion.div>items-center' style={{}}
                  >
                    <Image
                      src="/alex.png"
                      alt="123"
                      // style={{ borderRadius: '50%', height: '50px', width: '50px',objectFit: 'cover', objectPosition: 'center', backgroundColor: '' }}
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "",
                        borderRadius: "50%",
                        border: "3px solid white",
                        objectFit: "cover",
                        objectPosition: "center",
                        // backgroundColor: 'red'
                      }}
                      height={50}
                      width={50}
                    />
                    <div
                      className="flex justify-start items-start"
                      style={{ color: "#00000060", width: "130px" }}
                    >
                      Alex Hormozi
                    </div>
                    <div className="" style={{ width: "150px" }}>
                      Business Coach
                    </div>
                  </div>
                </motion.div>
              </Box>

              {/* Forth Animated Image */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 330,
                  left: 110,
                  zIndex: 2, // Ensure it's above the main GIF
                  width: "200px",
                }}
              >
                <motion.div
                  alt="user11"
                  className="flex flex-row items-center justify-center"
                  style={{
                    transformOrigin: "center center",
                    border: "2px solid white",
                    paddingInline: 10,
                    borderRadius: 15,
                    // paddingTop: 10,
                    width: "300px",
                    backgroundColor: "#FFFFFF80",
                  }} // This sets the origin to the center
                  animate={{
                    opacity: [0, 1, 0, 0], // Animates opacity
                    height: ["30px", "70px", "70px", "30px"], // Onlyanimates height
                  }}
                  onUpdate={()=>{
                    setRandomDelayAnim4(getRandomDelay(5))
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    times: [0, 0.3, 0.5, 1], // Defines keyframe timings
                    repeatDelay: 0.2,
                    ease: "easeInOut",
                    delay: randomDelayAnim4,
                  }}
                >
                  <div
                    className="flex flex-row items-center" //</motion.div>items-center' style={{}}
                  >
                    <Image
                      src="/andrew.png"
                      alt="123"
                      // style={{ borderRadius: '50%', height: '50px', width: '50px',objectFit: 'cover', objectPosition: 'center', backgroundColor: '' }}
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "",
                        borderRadius: "50%",
                        border: "3px solid white",
                        objectFit: "cover",
                        objectPosition: "center",
                        // backgroundColor: 'red'
                      }}
                      height={50}
                      width={50}
                    />
                    <div
                      className="flex justify-start items-start"
                      style={{ color: "#00000060", width: "120px" }}
                    >
                      Andrew Tate
                    </div>
                    <div className="" style={{ width: "150px" }}>
                      Influencer
                    </div>
                  </div>
                </motion.div>
              </Box>
            </Box>
          </div>
        </div>
      </div>
      {/* <div>hello</div> */}
    </div>
  );
}
