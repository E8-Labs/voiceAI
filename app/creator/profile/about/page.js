"use client"
import Apis from '@/components/apis/Apis';
import BillingandPlans from '@/components/creatorPersonalInfo/BillingandPlans';
import PersonalInformation from '@/components/creatorPersonalInfo/PersonalInformation';
import ProfileStat from '@/components/ProfileStat'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const page = () => {


    const [SelectedItem, setSelectedItem] = useState(1);

    const aboutNav = [
        {
            id: 1,
            title: "Personal Information"
        },
        {
            id: 2,
            title: "Billing & Plans"
        },
        {
            id: 3,
            title: "Payment Methods"
        }
    ];

    const handleAboutClick = (id) => {
        setSelectedItem(id)
    }

    const getProfile = async () => {
        try {
            const LocalData = localStorage.getItem("User")
            if (LocalData) {
                const userDetails = JSON.parse(LocalData);
                const AuthToken = userDetails.data.token
                console.log("Authtoken for get profile apis is ---", AuthToken);
                const ApiPath = Apis.MyProfile;
                const response = await axios.get(ApiPath, {
                    headers: {
                        "Authorization": "Bearer " + AuthToken,
                        "Content-Type": "application/json"
                    }
                });
                if (response) {
                    console.log("Response of my profile is:", response.data.data)
                }
            }
        } catch (error) {
            console.error("Error occured in getProfile api is", error);
        }
    }

    useEffect(() => {
        getProfile()
    }, [])


    return (
        <div className='w-full h-screen bg-[#ffffff40] p-4'>
            <div className='w-11/12'>
                <ProfileStat />
            </div>
            <div className='w-11/12 flex flex-row bg-gray-100 rounded-lg p-4 mt-8'>
                <div className='w-2/12 pt-2'>
                    <div>
                        {
                            aboutNav.map((item, index) => (
                                <button className='flex flex-col mb-4 text-start' key={index} onClick={() => { handleAboutClick(item.id) }}
                                    style={{
                                        color: SelectedItem === item.id ? "#552AFF" : "black",
                                        fontWeight: "500",
                                        fontSize: 15,
                                        fontFamily: "inter"
                                    }}
                                >
                                    {item.title}
                                </button>
                            ))
                        }
                    </div>
                    <button className='text-red' onClick={() => { localStorage.removeItem("User") }}>
                        Logout
                    </button>
                </div>
                <div className='w-10/12 h-[73vh]'>
                    {
                        SelectedItem === 1 ? (
                            <PersonalInformation />
                        ) : SelectedItem === 2 ? (
                            <BillingandPlans />
                        ) : ""
                    }
                </div>
            </div>
        </div>
    )
}

export default page