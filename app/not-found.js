// app/not-found.js
"use client"
import { Alert, Fade, Snackbar } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function NotFound() {

  const [windowHeight, setWindowHeight] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [isWideScreen2, setIsWideScreen2] = useState(false);
  const [isHighScreen, setIsHighScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Check if width is greater than or equal to 1024px
      setWindowHeight(window.innerHeight)
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
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const backgroundImage = {
    backgroundImage: 'url("/backgroundImage.png")', // Ensure the correct path
    backgroundSize: "cover",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '100svh',
    overflow: 'hidden'
  }

  const gifBackgroundImageSmallScreen = {
    backgroundImage: 'url("/assets/applogo2.png")', // Ensure the correct path
    backgroundSize: "cover",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: isWideScreen2 ? '550px' : '380px',
    height: isWideScreen2 ? '550px' : '380px',
    borderRadius: "50%",
    resize: "cover",
  }


  const gifBackgroundImage = {
    backgroundImage: 'url("/assets/applogo2.png")', // Ensure the correct path
    backgroundSize: "cover",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: isHighScreen ? '790px' : '530px',
    height: isHighScreen ? '790px' : '530px',
    borderRadius: "50%",
    resize: "cover",
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100" style={backgroundImage}>
      {/* <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl mt-4">Page Not Found</h2> */}
      {/* <p className="mt-2 text-gray-600">
        Oops! The page you are looking for doesn't exist.
      </p> */}
      {/* <Link className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" href="/">
        Go Back Home
      </Link> */}
      <div className='h-svh w-full flex flex-row justify-center items-center backdrop-blur-lg'>
        <div style={gifBackgroundImage} className='flex flex-row justify-center items-center md:flex hidden'>
          <Image src="/maingif.gif" alt='gif' style={{
            backgroundColor: "",
            borderRadius: "50%", height: windowHeight / 2.14, width: windowHeight / 2.14
          }} height={600} width={600} />
        </div>
        <div
          style={gifBackgroundImageSmallScreen}
          // style={{
          //     ...gifBackgroundImage,
          //     // width: isWideScreen && 1000,
          //     // height: isWideScreen && 1000
          // }}
          className='flex flex-row justify-center items-center md:hidden'>
          <Image src="/maingif.gif" alt='gif'
            style={{
              backgroundColor: "",
              borderRadius: "50%",
              height: windowHeight / 3, width: windowHeight / 3
            }}
            height={200} width={200} />
        </div>
      </div>
      <Snackbar
        open={true}
        // onClose={() => setCreatorErr(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        TransitionComponent={Fade}
        TransitionProps={{
          timeout: {
            enter: 1000,
            exit: 1000,
          }
        }}
        sx={{
          position: 'fixed', // Ensures it stays in place
          top: 100, // Adjust as needed for spacing from the top
          // left: '50%',
          marginTop: "100px",
          marginLeft: '30px',
          marginRight: '30px',
        }}
      >
        <Alert
          severity="error"
          sx={{
            width: '100%', // Ensures the Alert takes up the full width of the Snackbar
            backgroundColor: 'white',
            color: 'black',
            borderRadius: "20px",
          }}
        >
          <div>
            <div style={{ color: "#000000", fontWeight: "700", fontSize: 13, }}>
              Page Not Found...
            </div>
            <div>
              The page you are looking for doesn't exist or has been moved.<br />Let's get you back on track: )
            </div>
          </div>
        </Alert>
      </Snackbar>
    </div>
  );
}
