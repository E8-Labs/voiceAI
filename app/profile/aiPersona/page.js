"use client"
import CallInstructions from '@/components/aiPersona/CallInstructions';
import Objectives from '@/components/aiPersona/Objectives';
import PersonalityTraits from '@/components/aiPersona/PersonalityTraits';
import ValuesandBeliefs from '@/components/aiPersona/ValuesandBeliefs';
import { CaretDown } from '@phosphor-icons/react';
import Image from 'next/image';
import React, { useState } from 'react';
import { CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Page = () => {

    const value = 0.66;
    const [selectedMenu, setSelectedMenu] = useState(1);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [selectedGetToolMenu, setSelectedGetToolMenu] = useState(201);
    const [selectedGetProfessionalMenuMenu, setSelectedGetProfessionalMenuMenu] = useState(201);

    const menuItems = [{
        id: 1,
        menu: 'Call instructions',
    },
    {
        id: 2,
        menu: 'Objective',
    },
    {
        id: 3,
        menu: 'General guideline',
    },
    {
        id: 4,
        menu: 'Get tools',
    },
    {
        id: 5,
        menu: 'Objection handling',
    },
    {
        id: 6,
        menu: 'Product & Services',
    },
    {
        id: 7,
        menu: 'Specific Strategies & techniques',
    },
    {
        id: 8,
        menu: 'Communication',
    },
    {
        id: 9,
        menu: 'Persona Characteristics',
    },
    ];

    //code for dropdown in ID 4, 6 & 8
    const handleDropdownToggle = (id) => {
        if (dropdownOpen === id) {
            setDropdownOpen(null); // Close the dropdown if it is already open
        } else {
            setDropdownOpen(id); // Open the dropdown for the specific menu item
        }
    }

    //styles code
    const styles = {
        buttonText: (item) => ({
            fontSize: 15,
            fontWeight: "500",
            color: item.id === selectedMenu ? "#620FEB" : "black", //selectedMenu === item.id ? "black" : "#00000060",
            // display: 'inline-block', // Ensure the text and purple bar are treated as inline-block elements
            position: 'relative', // Allow absolute positioning of the underline
        }),
        underline: {
            height: '3px',
            backgroundColor: "#552AFF",
            width: '100%', // Set width to 100% of the button text
            position: 'absolute', // Position it absolutely relative to the text
            bottom: '-2px', // Position it just below the text
            left: 0,
        },
    }

    //dropeDown Files for Get tools
    const getTools = [
        {
            id: 201,
            heading: 'Knowledge base'
        },
        {
            id: 202,
            heading: 'Get Availability'
        },
        {
            id: 203,
            heading: 'Create Booking'
        },
        {
            id: 204,
            heading: 'Get conversation data'
        },
    ]

    const personalCharacteristics = [
        {
            id: 201,
            heading: 'Profession'
        },
        {
            id: 202,
            heading: 'Professional Background'
        },
        {
            id: 203,
            heading: 'Values & beliefs'
        },
        {
            id: 204,
            heading: 'Personality Traits'
        },
    ]

    //different dropdowns for different ID
    const renderDropdownContent = (id) => {
        switch (id) {
            case 4:
                return (
                    <div className='flex flex-col items-center rounded w-full'>
                        <ul>
                            {
                                getTools.map((item) => (
                                    <div key={item.id} className='mb-4 flex flex-row items-center gap-2'>
                                        <button className='text-end outline-noe border-none'
                                            onClick={() => {
                                                setSelectedGetToolMenu(item.id);
                                            }}
                                            style={{ color: selectedGetToolMenu === item.id ? "#620FEB" : "black" }}
                                        >
                                            {item.heading}
                                        </button>
                                        <Image src={item.id === selectedGetToolMenu ? "/assets/claimLogo2.png" : "/assets/TickIcon.png"} alt='icon' height={10} width={10} />
                                    </div>
                                ))
                            }
                            {/* <button className='mt-4'>Get Tools Option 2</button>
                            <button className='mt-4'>Get Tools Option 3</button> */}
                        </ul>
                    </div>
                );
            case 8:
                return (
                    <div className='flex flex-col items-center rounded w-full'>
                        <ul>
                            {
                                getTools.map((item) => (
                                    <div key={item.id} className='mb-4 flex flex-row items-center gap-2'>
                                        <button className='text-end outline-noe border-none'
                                            onClick={() => {
                                                setSelectedGetToolMenu(item.id);
                                            }}
                                            style={{ color: selectedGetToolMenu === item.id ? "#620FEB" : "black" }}
                                        >
                                            {item.heading}
                                        </button>
                                        <Image src={item.id === selectedGetToolMenu ? "/assets/claimLogo2.png" : "/assets/TickIcon.png"} alt='icon' height={10} width={10} />
                                    </div>
                                ))
                            }
                            {/* <button className='mt-4'>Get Tools Option 2</button>
                            <button className='mt-4'>Get Tools Option 3</button> */}
                        </ul>
                    </div>
                );
            case 9:
                return (
                    <div className='flex flex-col items-center rounded w-full'>
                        <ul>
                            {
                                personalCharacteristics.map((item) => (
                                    <div key={item.id} className='mb-4 flex flex-row items-center gap-2'>
                                        <button className='text-end outline-noe border-none'
                                            onClick={() => {
                                                setSelectedGetProfessionalMenuMenu(item.id);
                                            }}
                                            style={{ color: selectedGetProfessionalMenuMenu === item.id ? "#620FEB" : "black" }}
                                        >
                                            {item.heading}
                                        </button>
                                        <Image src={item.id === selectedGetProfessionalMenuMenu ? "/assets/claimLogo2.png" : "/assets/TickIcon.png"} alt='icon' height={10} width={10} />
                                    </div>
                                ))
                            }
                            {/* <button className='mt-4'>Get Tools Option 2</button>
                            <button className='mt-4'>Get Tools Option 3</button> */}
                        </ul>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className='w-full h-screen' style={{ overflow: 'auto', backgroundColor: "#ffffff40" }}>
            <div className='w-11/12 pt-12 pl-10'>
                <div className='w-fll flex flex-row items-center justify-between'>
                    <p style={{ fontSize: 28, fontWeight: "500", fontFamily: "inter" }}>
                        AI Persona
                    </p>
                    <Image
                        src="/assets/placeholderImg.jpg"
                        alt='profile'
                        height={70}
                        width={70}
                        style={{
                            width: '70px',
                            height: '70px',
                            backgroundColor: "",
                            borderRadius: "50%",
                            border: "3px solid white",
                            objectFit: 'cover',
                            objectPosition: 'center',
                            // backgroundColor: 'red'
                        }}
                    />
                </div>
                <div className='w-11/12 flex flex-row items-center justify-between mt-4 bg-white px-6 py-4 rounded-2xl'>
                    <div className='flex flex-row items-center gap-2'>
                        <div style={{ height: "71px", width: "71px" }}>
                            <CircularProgressbar value={value} maxValue={1} text={`${value * 100}%`}
                                strokeWidth={4}
                                styles={{
                                    path: {
                                        stroke: `#552AFF`, // Change the color to red
                                    },
                                    text: {
                                        fill: '#000000', // Change the text color to red
                                        fontSize: 20,
                                        fontWeight: "500"
                                    },
                                    trail: {
                                        stroke: '#d6d6d6', // Change the trail color (if needed)
                                    },
                                }} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}>
                                Complete Profile
                            </div>
                            <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                                Voice, Kb, SocialLinks etc
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className='text-white bg-purple px-4 py-2' style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter", borderRadius: "50px" }}>
                            Complete
                        </button>
                    </div>
                </div>

                {/* Code for the side menu */}
                <div className='flex flex-row justify-between items-start w-11/12 mt-4 pt-12 mb-4 bg-white rounded-2xl p-4'>
                    <div className='flex flex-col w-4/12 gap-6'>
                        {
                            menuItems.map((item) => (
                                <div key={item.id} className='flex flex-col items-start gap-8' style={{ backgroundColor: "" }}>
                                    <button className='outline-none border-none flex flex-row items-center text-start justify-between w-full'
                                        style={styles.buttonText(item)}
                                        onClick={() => {
                                            // Handle dropdown toggle for IDs 4, 6, 8
                                            if ([4, 8, 9].includes(item.id)) {
                                                handleDropdownToggle(item.id);
                                                setSelectedMenu(item.id);
                                            } else {
                                                setDropdownOpen(null);
                                                setSelectedMenu(item.id);
                                            }
                                        }}
                                    // onClick={() => {
                                    //     setSelectedMenu(item.id)
                                    // }}
                                    >
                                        <div className='flex flex-row items-center gap-4'>
                                            <div>{item.menu}</div>
                                            <Image src={item.id === selectedMenu ? "/assets/claimLogo2.png" : "/assets/TickIcon.png"} alt='icon' height={10} width={10} />
                                        </div>
                                        {
                                            [4, 6, 8 , 9].includes(item.id) &&
                                            <CaretDown size={22} weight="light" />
                                        }
                                    </button>
                                    {(item.id === dropdownOpen) && renderDropdownContent(item.id)}
                                </div>
                            ))
                        }
                    </div>

                    {/* code to show the selected menuitem */}
                    <div className='w-full flex flex-col w-7/12 ps-4'>
                        {
                            selectedMenu === 1 ? (
                                <CallInstructions />
                            ) : selectedMenu === 2 ? (
                                <Objectives />
                            ) : selectedMenu === 3 ? (
                                "I am Good"
                                // <SocialOAuth />
                            ) : selectedMenu === 4 ? (
                                <div>
                                    {
                                        selectedGetToolMenu === 201 ? (
                                            "it is get tool 1 "
                                        ) : selectedGetToolMenu === 202 ? (
                                            "it is get tool 202 "
                                        ) : selectedGetToolMenu === 203 ? (
                                            "it is get tool 203 "
                                        ) : selectedGetToolMenu === 204 ? (
                                            "it is get tool 204 "
                                        ) : ""
                                    }
                                </div>
                            ) : selectedMenu === 9 ? (
                                <div>
                                    {
                                        selectedGetProfessionalMenuMenu === 201 ? (
                                            "it is selectedGetProfessionalMenu 201"
                                        ) : selectedGetProfessionalMenuMenu === 202 ? (
                                            "it is selectedGetProfessionalMenu 202 "
                                        ) : selectedGetProfessionalMenuMenu === 203 ? (
                                            <ValuesandBeliefs />
                                        ) : selectedGetProfessionalMenuMenu === 204 ? (
                                            <PersonalityTraits />
                                        ) : ""
                                    }
                                </div>
                            ) : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page