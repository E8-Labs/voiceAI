'use client'
import Animation from '@/components/animation/Animation';
import Apis from '@/components/apis/Apis';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function Home() {

  const router = useRouter();

  // useEffect(() => {
  //   router.push('/user/onboarding')
  // }, [])
  const [currentIndex, setCurrentIndex] = useState(null);
  const [assistantData, setAssistantData] = useState(null);

  const getAssistantData = async () => {
    try{
      const ApiPath = Apis.GetAssistantData;
    }catch(error){
      console.error("Error occured in get assistant data api", error);
    }
  }

  const handleCurrentIndex = (id) => {
    setCurrentIndex(id);
  }

  useEffect(() => {
    if (currentIndex === 6) {
      setTimeout(() => {
        console.log("Ready to navigate");
      }, 500)
    }
  }, [currentIndex])

  return (
    <div className='w-full' style={{ height: "100vh", display: 'flex', alignItems: "center", width: "" }}>
      {/* <div className='flex flex-row items-center justify-center w-full'>
        <div
          // className='flex flex-row justify-center md:w-5/12 w-full items-center'
          className={`flex flex-row justify-center items-center ${currentIndex === 6 ? 'w-full' : 'md:w-5/12 w-full'}`}
        >
          <div className='w-11/12'>
            <div className='mt-16'>
              <Image src={'/assets/applogo.png'}
                alt='logo'
                height={40}
                width={37}
              />
            </div>
            <Animation onChangeIndex={handleCurrentIndex} />
          </div>
        </div>
        {
          currentIndex === 0 &&
          <div className='w-7/12 flex md:flex hidden  justify-center'>
            <img src='/assets/applogo.png' alt='app' style={{ height: "537px", width: "537px", resize: "cover", objectFit: "contain" }} />
          </div>
        }
        {
          currentIndex < 6 && currentIndex > 0 &&
          <div className='w-7/12 flex md:flex hidden  justify-center'>
            <img src='/assets/applogo2.png' alt='app' style={{ height: "537px", width: "537px", resize: "cover", objectFit: "contain" }} />
          </div>
        }
      </div> */}
      {/* <div>hello</div> */}
    </div>
  );
}
