"use client"
import PhoneNumberInput from '@/components/PhoneNumberInput';
import Apis from '@/components/apis/Apis';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const Page = () => {

    const [userDetails, setUserDetails] = useState(null);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [myCallerAccountStatus, setmyCallerAccountStatus] = useState(true);

    const getPhoneNumber = (number) => {
        setPhoneNumber(number)
    }

    // console.log("Getting nuber", phoneNumber);
    useEffect(() => {
        console.log("Phone number updated:", phoneNumber);
    }, [phoneNumber]);

    useEffect(() => {
        const localData = localStorage.getItem('User');
        const Data = JSON.parse(localData);
        console.log("user data is", Data);
        setUserDetails(Data.data.user);
        if (Data.data.user.name) {
            setUserName(Data.data.user.name)
        }
        if (Data.data.user.email) {
            setUserEmail(Data.data.user.email)
        }
        // if (Data.data.user.phone) {
        //     console.log("Recieving nummber", Data.data.user.phone);

        //     setPhoneNumber(Data.data.user.phone)
        // }
    }, []);

    const handleEditProfile = async () => {
        const ApiPath = Apis.updateProfile;
        const localData = localStorage.getItem('User');
        const Data = JSON.parse(localData);
        const AuthToken = Data.data.token;
    }

    const styles = {
        input: {
            backgroundColor: '#EDEDED29',
            padding: 10,
            borderRadius: 5,
            border: 'none',
            outline: 'none',
        }
    }

    return (
        <div className='h-screen w-full' style={{ backgroundColor: "#ffffff30", }}>
            <div className='w-full py-10 px-5' style={{}}>
                <div style={{ fontSize: 20, fontWeight: "bold", fontFamily: 'inter', paddingLeft: 10 }} >
                    My Account
                </div>
                <div className='w-8/12 py-10 px-8 mt-3 flex flex-col gap-5' style={{
                    backgroundColor: '#FFFFFF40', borderRadius: 10
                }}>
                    <div style={{ fontSize: 20, fontWeight: 400, fontFamily: "inter" }}>

                    </div>

                    <div className='w-7/12 flex flex-row items-start justify-between'>
                        <div className='flex flex-row items-start gap-4'>
                            <div>
                                <Image src="/assets/placeholderImg.jpg" alt='profile' height={70} width={70}
                                    style={{ borderRadius: '50%' }} />
                            </div>
                            <div>
                                <div style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 15 }}>
                                    Upload Profile
                                </div>
                                <div style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 13 }}>
                                    Max file size 5mb
                                </div>
                            </div>
                        </div>
                        <button className='text-purple'>
                            Upload
                        </button>
                    </div>

                    <div className='flex flex-row justify-between w-7/12 pe-4'>
                        <input
                            className='w-6/12 '
                            placeholder='Name'
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            style={styles.input}
                        />
                        <button className='text-purple'>
                            Edit
                        </button>
                    </div>

                    <div className='flex flex-row justify-between w-7/12 pe-4'>
                        <input
                            className='w-6/12 '
                            placeholder='Email address'
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            style={styles.input}
                        />
                        <button className='text-purple'>
                            Edit
                        </button>
                    </div>



                    {/* <input
                        className='w-6/12 mb-20'
                        placeholder='Phone Number'
                        style={styles.input}
                    /> */}

                    <PhoneNumberInput phonenumber={getPhoneNumber} myCallerAccount={myCallerAccountStatus} />



                </div>
            </div>
        </div>
    )
}

export default Page