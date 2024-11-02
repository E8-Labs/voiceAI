import { DotsThree } from '@phosphor-icons/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const PersonalInformation = () => {

  const [UserDetails, setUserDetails] = useState(null)

  useEffect(() => {
    const LocalData = localStorage.getItem("User");
    if (LocalData) {
      const UserDetails = JSON.parse(LocalData);
      console.log("User details recieved from localStorage are :---", UserDetails.data.user);
      setUserDetails(UserDetails.data.user);
    }
  }, [])

  const styles = {
    heading: {
      fontWeight: "700",
      fontSize: 13,
      fontFamily: "inter"
    },
    subHeading: {
      fontWeight: "500",
      fontSize: 12,
      fontFamily: "inter",
      color: "#050A0880"
    }
  }

  return (
    <div>
      <div style={{ fontSize: 25, fontWeight: "500", fontFamily: "inter" }}>
        Personal Information
      </div>
      <div className='w-10/12 flex flex-row items-center justify-between mt-8'>
        <div className='flex flex-row items-center gap-2'>
          <Image src="/assets/creatorProfileImgPlaceholder.png" style={{ height: "70px", width: "70px", resize: "cover" }} height={70} width={70} alt='*P' />
          <div>
            <div style={{ fontWeight: "500", fontFamily: "inter", fontSize: 18 }}>Profile Pic</div>
            <div style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13, color: "#050A0860" }}>Max Size: 10Mb</div>
          </div>
        </div>
        <div className='flex flex-row items-center gap-4'>
          <button className='px-4 bg-purple text-white' style={{ borderRadius: "50px", height: "40px", fontWeight: "500", fontFamily: "inter", fontSize: 15 }}
          >
            Upload
          </button>
          <button className='text-red' style={{ fontWeight: "500", fontFamily: "inter", fontSize: 15 }}>
            Delete
          </button>
        </div>
      </div>

      <div className='w-10/12 mt-10'>

        <div className='w-full bg-white px-4 py-3 rounded-xl '>
          <div className='w-full flex flex-row items-center justify-between'>
            <p style={styles.heading}>
              Phone Number
            </p>
            <button>
              <DotsThree size={35} weight="bold" />
            </button>
          </div>
          <div style={styles.subHeading}>
            +{UserDetails?.phone}
          </div>
        </div>

        <div className='w-full bg-white px-4 py-3 rounded-xl mt-12'>
          <div className='w-full flex flex-row items-center justify-between'>
            <p style={styles.heading}>
              Email Address
            </p>
            <button>
              <DotsThree size={35} weight="bold" />
            </button>
          </div>
          <div style={styles.subHeading}>
            {UserDetails?.email}
          </div>
        </div>

        <div className='w-full bg-white px-4 py-3 rounded-xl mt-12'>
          <div className='w-full flex flex-row items-center justify-between'>
            <p style={styles.heading}>
              Unique URL
            </p>
            <button>
              <DotsThree size={35} weight="bold" />
            </button>
          </div>
          <div style={styles.subHeading}>
            {UserDetails?.username}
          </div>
        </div>

      </div>

    </div>
  )
}

export default PersonalInformation;
