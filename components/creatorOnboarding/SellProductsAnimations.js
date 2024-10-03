import Image from 'next/image';
import React from 'react';
import { useState, useEffect } from 'react';

const SellProductsAnimations = () => {

    const [isHighScreen, setIsHighScreen] = useState(false);
    //resize gif
    useEffect(() => {
        const handleResize = () => {
            setIsHighScreen(window.innerHeight >= 950);
        };

        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    //code for gif image
    const gifBackgroundImage = {
        backgroundImage: 'url("/assets/applogo2.png")', // Ensure the correct path
        backgroundSize: "cover",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: isHighScreen ? '870px' : '500px',
        height: isHighScreen ? '870px' : '500px',
        borderRadius: "50%",
        resize: "cover",
    }

    return (
        <div>
            <div style={gifBackgroundImage} className='flex flex-row justify-center items-center'>
                <Image
                    // onClick={handleContinue}
                    src="/mainAppGif3.gif" alt='gif' style={{
                        backgroundColor: "",
                        borderRadius: "50%", height: isHighScreen ? '780px' : '450px', width: isHighScreen ? '780px' : '450px'
                    }} height={600} width={600} />
            </div>
            <div className='flex flex-col items-center' style={{ position: "absolute", top: "20%", right: "12%" }}>
                <div>
                    Digital Products
                </div>
                <Image src="/assets/spImages/sp1.png" height={71} width={71} />
            </div>
            <div style={{ position: "absolute", top: '20%', right: "29%" }}>
                <Image src="/assets/spImages/sp2.png" height={52} width={52} />
            </div>
            <div style={{ position: "absolute", top: '33%', right: "35%" }}>
                <Image src="/assets/spImages/sp3.png" height={30} width={30} />
            </div>
            <div style={{ position: "absolute", top: "37%", right: "19%" }}>
                <Image src="/assets/spImages/sp4.png" height={36} width={36} />
            </div>
            <div style={{ position: "absolute", top: "57%", right: "10%" }}>
                <Image src="/assets/spImages/sp5.png" height={52} width={52} />
            </div>
            <div style={{ position: "absolute", top: "62%", right: "24%" }}>
                <Image src="/assets/spImages/sp6.png" height={52} width={52} />
            </div>
            <div style={{ position: "absolute", top: "67%", right: "35%" }}>
                <Image src="/assets/spImages/sp7.png" height={71} width={71} />
            </div>
            <div style={{ position: "absolute", top: "75%", right: "12%" }}>
                <Image src="/assets/spImages/sp8.png" height={71} width={71} />
            </div>
            <div style={{ position: "absolute", top: "82%", right: "25%" }}>
                <Image src="/assets/spImages/sp1.png" height={71} width={71} />
            </div>
        </div>
    )
}

export default SellProductsAnimations