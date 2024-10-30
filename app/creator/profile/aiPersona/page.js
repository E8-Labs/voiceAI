"use client"
import CallInstructions from '@/components/Navbar/ccreatorProfileNavComponents/aiPersona/CallInstructions';
import FAQ from '@/components/Navbar/ccreatorProfileNavComponents/aiPersona/FAQ';
import Objectives from '@/components/Navbar/ccreatorProfileNavComponents/aiPersona/Objectives';
import PersonalityTraits from '@/components/Navbar/ccreatorProfileNavComponents/aiPersona/PersonalityTraits';
import ValuesandBeliefs from '@/components/Navbar/ccreatorProfileNavComponents/aiPersona/ValuesandBeliefs';
import Apis from '@/components/apis/Apis';
import BasicInformation from '@/components/Navbar/ccreatorProfileNavComponents/aiPersona/BasicInformation';
import DoNotDiscuss from '@/components/Navbar/ccreatorProfileNavComponents/aiPersona/DoNotDiscuss';
import FrameWorkAndTec from '@/components/Navbar/ccreatorProfileNavComponents/aiPersona/FrameWorkAndTec';
import IntractionExamples from '@/components/Navbar/ccreatorProfileNavComponents/aiPersona/IntractionExamples';
import Objectionhandling from '@/components/Navbar/ccreatorProfileNavComponents/aiPersona/Objectionhandling';
import PhrasesandQuotes from '@/components/Navbar/ccreatorProfileNavComponents/aiPersona/PhrasesandQuotes';
import ProductDetails from '@/components/Navbar/ccreatorProfileNavComponents/aiPersona/ProductDetails';
import Profession from '@/components/Navbar/ccreatorProfileNavComponents/aiPersona/Profession';
import { CaretDown, CaretUp } from '@phosphor-icons/react';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import loginFunction from '@/components/loginFunction';
import ObjectionHandling2 from '@/components/Navbar/ccreatorProfileNavComponents/aiPersona/ObjectionHandling2';
import ProfileStat from '@/components/ProfileStat';
import ConversionGoals from '@/components/Navbar/ccreatorProfileNavComponents/aiPersona/ConversionGoals';

const Page = () => {

    loginFunction();
    const value = 0.66;
    const [selectedMenu, setSelectedMenu] = useState(1);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [selectedGetToolMenu, setSelectedGetToolMenu] = useState(201);
    const [selectedGetProfessionalMenuMenu, setSelectedGetProfessionalMenuMenu] = useState(201);
    const [aiData, setAiData] = useState(null);
    const [selectedCallStrategy, setSelectedCallStrategy] = useState(901);
    const [aiDetails, setAiDetails] = useState(null);



    //code for new menu items
    const [selectedAICharacteristics, setSelectedAICharacteristics] = useState(201);
    const [selectedCommunication, setSelectedCommunication] = useState(302);
    const [selectedProductService, setSelectedProductService] = useState(501);
    const [selectedIntegrations, setSelectedIntegrations] = useState(701);
    const [loader, setLoader] = useState(false);


    useEffect(() => {
        const AiPersonaltiy = localStorage.getItem("aiPersonaDetails");
        console.log("I am working")
        if (AiPersonaltiy) {
            const AiDetails = JSON.parse(AiPersonaltiy);
            // setAiDetails(AiDetails);
            console.log("Ai persona details testing are", aiDetails);
        }
    }, [])

    //new drop down menu

    function isAiPersonalityComplete() {
        if (!aiData) {
            return false
        }

        if (aiData.ai.greeting == "" || aiData.ai.greeting == null) {
            return false
        }
        if (aiData.ai.possibleUserQuery == "" || aiData.ai.possibleUserQuery == null) {
            return false
        }
        if (aiData.ai.action == "" || aiData.ai.action == null) {
            return false
        }
        if (aiData.ai.tagline == "" || aiData.ai.tagline == null) {
            return false
        }
        if (aiData.values.length === 0) {
            return false
        }
        if (aiData.beliefs.length === 0) {
            return false
        }
        if (aiData.traits.length === 0) {
            return false
        }
        if (aiData.Philosophies.length === 0) {
            return false
        }


        // console.log('"Ai complete"')
        return true
    }

    function isCommunicationComplete() {
        if (!aiData) {
            return false
        }

        if (aiData) {
            if (aiData.DoNots.length === 0) {
                return false
            }
            if (aiData.intractions.length === 0) {
                return false
            }
            if (aiData.PhrasesAndQuotes.length === 0) {
                return false
            }
            if (aiData.communicatinCommonFaqs.length === 0) {
                return false
            }
            if (aiData.CommunicationInstructions.length === 0) {
                return false
            }
            if (aiData.demeanor.length === 0) {
                return false
            }
            if (aiData.interpersonalSkills.length === 0) {
                return false
            }
        }
        // if (aiData.ai.Communicatinstyle == "" || aiData.ai.Communicatinstyle == null) {
        //     return false
        // }


        return true
    }

    function isProductsAndServicesComplete() {
        if (!aiData) {
            return false
        }

        if (aiData) {
            if (aiData.products.length === 0) {
                return false
            }
            // if (aiData.intractions.length === 0) {
            //     return false
            // }


            return true;
        }
    }



    let menuItems = [{
        id: 1,
        menu: 'Objective',
        isComplete: (aiData && aiData.ai.aiObjective != "" && aiData.ai.aiObjective != null)
    },
    {
        id: 2,
        menu: 'AI Characteristics',
        isComplete: isAiPersonalityComplete()
    },
    {
        id: 3,
        menu: 'Communication',
        isComplete: isCommunicationComplete()
    },
    {
        id: 4,
        menu: 'Strategies & Techniques',
        isComplete: (aiData && aiData.frameworks.length > 0)
    },
    {
        id: 5,
        menu: 'Product & Services',
        isComplete: isProductsAndServicesComplete()
    },
    {
        id: 6,
        menu: 'Objection Handling',
        isComplete: (aiData && aiData.objectionHandling.length > 0)
    },
    {
        id: 7,
        menu: 'Integrations', //added the values and beliefs here
        isComplete: false
    },
    {
        id: 8,
        menu: 'Call Strategy', //added the personality traits here
        isComplete: (aiData && aiData.callStrategy.length > 0)
    },
    ];


    // const menuItems = [{
    //     id: 1,
    //     menu: 'Call instructions',
    // },
    // {
    //     id: 2,
    //     menu: 'Objective',
    // },
    // {
    //     id: 3,
    //     menu: 'General guideline',
    // },
    // {
    //     id: 4,
    //     menu: 'Get tools',
    // },
    // {
    //     id: 5,
    //     menu: 'Objection handling',
    // },
    // {
    //     id: 6,
    //     menu: 'Product & Services',
    // },
    // {
    //     id: 7,
    //     menu: 'Specific Strategies & techniques', //added the values and beliefs here
    // },
    // {
    //     id: 8,
    //     menu: 'Communication', //added the personality traits here
    // },
    // {
    //     id: 9,
    //     menu: 'Persona Characteristics',
    // },
    // ];

    //code to call the get ai api


    //




    const getAiApi = async () => {
        try {
            setLoader(true);
            console.log("Trying....");
            // return
            const ApiPath = Apis.MyAiapi;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const response = await axios.get(ApiPath, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + AuthToken
                }
            });
            // return
            if (response) {
                console.log("Response of getai on parent screen api", response.data.data);
                if (response.data) {
                    setAiData(response.data.data);
                    // setAiDetails(response.data.data);
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                    if (response?.data?.data?.ai) {
                        console.log("Ai is Present");
                    } else {
                        router.push("/creator/buildscript");
                    }
                    if (response?.data?.data?.questions) {
                        console.log("Kycs are added");
                    } else {
                        router.push("/creator/buildscript2");
                    }
                }
            }
        } catch (error) {
            console.error("ERR occured in get ai api is", error);
        } finally {
            setLoader(false);
        }
    }

    useEffect(() => {
        getAiApi();
    }, []);

    const recallApi = () => {
        getAiApi();
    }

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
        {
            id: 205,
            heading: 'Intraction Examples'
        },
    ]

    const communications = [
        {
            id: 901,
            title: "Call Flow"
        },
        {
            id: 902,
            title: "Item 2"
        },
        {
            id: 903,
            title: "Item 3"
        },
    ]

    //new drop downs for new list

    //index 2 drop down
    const AiCharacteristics = [
        {
            id: 201,
            title: "Basic Information"
        },
        {
            id: 202,
            title: "Profession"
        }
    ]

    //index 3 drop down
    const CommunicationMenu = [
        {
            id: 302,
            title: "Intraction Examples"
        },
        {
            id: 303,
            title: "Phrases & Quotes"
        },
        {
            id: 304,
            title: "FAQ"
        },
        {
            id: 301,
            title: "Donot Discuss"
        },
    ]

    //index 5 drop down
    const ProductsServicesMenu = [
        {
            id: 501,
            title: "Product Details"
        },
        {
            id: 502,
            title: "Conversion Goals"
        },
    ]

    //index 7 drop down
    const integrationMenu = [
        {
            id: 701,
            title: "Item 1"
        },
        {
            id: 702,
            title: "Item 2"
        },
    ]

    //different dropdowns for different ID
    const renderDropdownContent = (id) => {
        switch (id) {

            //Dropdown for index 2 (AICharacteristics);
            case 2:
                return (
                    <div className='flex flex-col items-start rounded w-ful ms-8'>
                        <ul>
                            {
                                AiCharacteristics.map((item) => (
                                    <div key={item.id} className='mb-4 flex flex-row items-center gap-2'>
                                        <button className='text-start outline-none border-none'
                                            onClick={() => {
                                                setSelectedAICharacteristics(item.id);
                                            }}
                                            style={{ color: selectedAICharacteristics === item.id ? "#620FEB" : "black" }}
                                        >
                                            {item.title}
                                        </button>
                                        <Image src={"/assets/TickIcon.png"} alt='icon' height={10} width={10} />
                                    </div>
                                ))
                            }
                            {/* <button className='mt-4'>Get Tools Option 2</button>
                            <button className='mt-4'>Get Tools Option 3</button> */}
                        </ul>
                    </div>
                );

            //Dropdown for index 3 (Communication);
            case 3:
                return (
                    <div className='flex flex-col items-start rounded w-ful ms-8'>
                        <ul>
                            {
                                CommunicationMenu.map((item) => (
                                    <div key={item.id} className='mb-4 flex flex-row items-center gap-2'>
                                        <button className='text-start outline-none border-none'
                                            onClick={() => {
                                                setSelectedCommunication(item.id);
                                            }}
                                            style={{ color: selectedCommunication === item.id ? "#620FEB" : "black" }}
                                        >
                                            {item.title}
                                        </button>
                                        <Image src={"/assets/TickIcon.png"} alt='icon' height={10} width={10} />
                                    </div>
                                ))
                            }
                            {/* <button className='mt-4'>Get Tools Option 2</button>
                            <button className='mt-4'>Get Tools Option 3</button> */}
                        </ul>
                    </div>
                );


            case 4:
                return (
                    <div className='flex flex-col items-start rounded w-ful ms-8'>
                        <ul>
                            {
                                getTools.map((item) => (
                                    <div key={item.id} className='mb-4 flex flex-row items-center gap-2'>
                                        <button className='text-start outline-none border-none'
                                            onClick={() => {
                                                setSelectedGetToolMenu(item.id);
                                            }}
                                            style={{ color: selectedGetToolMenu === item.id ? "#620FEB" : "black" }}
                                        >
                                            {item.heading}
                                        </button>
                                        <Image src={"/assets/TickIcon.png"} alt='icon' height={10} width={10} />
                                    </div>
                                ))
                            }
                            {/* <button className='mt-4'>Get Tools Option 2</button>
                            <button className='mt-4'>Get Tools Option 3</button> */}
                        </ul>
                    </div>
                );

            //dropdown for index 5 (Products and services)
            case 5:
                return (
                    <div className='flex flex-col items-start rounded w-ful ms-8'>
                        <ul>
                            {
                                ProductsServicesMenu.map((item) => (
                                    <div key={item.id} className='mb-4 flex flex-row items-center gap-2'>
                                        <button className='text-start outline-none border-none'
                                            onClick={() => {
                                                setSelectedProductService(item.id);
                                            }}
                                            style={{ color: selectedProductService === item.id ? "#620FEB" : "black" }}
                                        >
                                            {item.title}
                                        </button>
                                        <Image src={"/assets/TickIcon.png"} alt='icon' height={10} width={10} />
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
                    <div className='flex flex-col items-start ms-8 rounded w-full'>
                        <ul>
                            {
                                communications.map((item) => (
                                    <div key={item.id} className='mb-4 flex flex-row items-center gap-2'>
                                        <button className='text-start outline-none border-none'
                                            onClick={() => {
                                                setSelectedCallStrategy(item.id);
                                            }}
                                            style={{ color: selectedCallStrategy === item.id ? "#620FEB" : "black" }}
                                        >
                                            {item.title}
                                        </button>
                                        <Image src={"/assets/TickIcon.png"} alt='icon' height={10} width={10} />
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
                    <div className='flex flex-col items-start ms-8 rounded w-full'>
                        <ul>
                            {
                                personalCharacteristics.map((item) => (
                                    <div key={item.id} className='mb-4 flex flex-row items-center gap-2'>
                                        <button className='text-start outline-none border-none'
                                            onClick={() => {
                                                setSelectedGetProfessionalMenuMenu(item.id);
                                            }}
                                            style={{ color: selectedGetProfessionalMenuMenu === item.id ? "#620FEB" : "black" }}
                                        >
                                            {item.heading}
                                        </button>
                                        <Image src={"/assets/TickIcon.png"} alt='icon' height={10} width={10} />
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
            <div className='w-11/12 pt-2 pl-10'>
                <div className='w-fll flex flex-row items-center justify-between'>

                    {/*<p style={{ fontSize: 28, fontWeight: "500", fontFamily: "inter" }}>
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
                    /> */}
                </div>


                <div className='w-full'>
                    <ProfileStat />
                </div>

                {/* Code for the side menu */}
                <div className='flex flex-row justify-between items-start w-full mt-4 pt-12 mb-4 bg-white rounded-2xl p-4'>
                    <div className='flex flex-col w-4/12 gap-6'>
                        {
                            menuItems.map((item) => (
                                <div key={item.id} className='flex flex-col items-start gap-8' style={{ backgroundColor: "" }}>
                                    <button className='outline-none border-none flex flex-row items-center text-start justify-between w-full'
                                        style={styles.buttonText(item)}
                                        onClick={() => {
                                            // Handle dropdown toggle for IDs 4, 6, 8
                                            if ([2, 3, 5, 7, 8].includes(item.id)) {
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
                                            {
                                                item.isComplete && (
                                                    <Image src="/assets/TickIcon.png" alt='icon' height={10} width={10} />
                                                )
                                            }
                                        </div>
                                        {
                                            [2, 3, 5, 7, 8].includes(item.id) &&
                                            <div className=''>
                                                {
                                                    item.id === dropdownOpen ?
                                                        <CaretUp size={22} weight="light" /> :
                                                        <CaretDown size={22} weight="light" />
                                                }
                                            </div>
                                        }
                                    </button>
                                    <div>
                                        {(item.id === dropdownOpen) && renderDropdownContent(item.id)}
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    {/* code to show the selected menuitem */}
                    <div className='w-full flex flex-col w-7/12 ps-4'>
                        {
                            selectedMenu === 1 ? (
                                <Objectives recallApi={recallApi} aiData={aiData} loader={loader} />
                            ) : selectedMenu === 2 ? (
                                <div>
                                    {
                                        selectedAICharacteristics === 201 ? (
                                            <BasicInformation recallApi={recallApi} aiData={aiData} />
                                        ) : selectedAICharacteristics === 202 ? (
                                            <Profession recallApi={recallApi} aiData={aiData} />
                                        ) : ""
                                    }
                                </div>
                            ) : selectedMenu === 3 ? (
                                <div>
                                    {
                                        selectedCommunication === 301 ? (
                                            <DoNotDiscuss recallApi={recallApi} aiData={aiData} />
                                        ) : selectedCommunication === 302 ? (
                                            <IntractionExamples recallApi={recallApi} aiData={aiData} />
                                        ) : selectedCommunication === 303 ? (
                                            <PhrasesandQuotes recallApi={recallApi} aiData={aiData} />
                                        ) : selectedCommunication === 304 ? (
                                            <FAQ recallApi={recallApi} aiData={aiData} />
                                        ) : ""
                                    }
                                </div>
                            ) : selectedMenu === 4 ? (
                                <div>
                                    <FrameWorkAndTec recallApi={recallApi} aiData={aiData} />
                                    {/* {
                                        selectedGetToolMenu === 201 ? (
                                            "it is get tool 1 "
                                        ) : selectedGetToolMenu === 202 ? (
                                            "it is get tool 202 "
                                        ) : selectedGetToolMenu === 203 ? (
                                            "it is get tool 203 "
                                        ) : selectedGetToolMenu === 204 ? (
                                            "it is get tool 204 "
                                        ) : ""
                                    } */}
                                </div>
                            ) : selectedMenu === 5 ? (
                                <div>
                                    {
                                        selectedProductService === 501 ? (
                                            <ProductDetails recallApi={recallApi} aiData={aiData} />
                                        ) : selectedProductService === 502 ? (
                                            <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                                                <ConversionGoals />
                                            </div>
                                        ) : ""
                                    }
                                </div>
                            ) : selectedMenu === 6 ? (
                                // <Objectionhandling />
                                <ObjectionHandling2 />
                            ) : selectedMenu === 7 ? (
                                <FrameWorkAndTec recallApi={recallApi} aiData={aiData} />
                            ) : selectedMenu === 8 ? (
                                <div>
                                    {
                                        selectedCallStrategy === 901 ? (
                                            // <IntractionExamples recallApi={recallApi} aiData={aiData} />
                                            <CallInstructions recallApi={recallApi} aiData={aiData} />
                                        ) : selectedCallStrategy === 902 ? (
                                            "Item 2"
                                        ) : selectedCallStrategy === 903 ? (
                                            "Item 3"
                                        ) : ""
                                    }
                                </div>
                            ) : selectedMenu === 9 ? (
                                <div>
                                    {/* {
                                        selectedGetProfessionalMenuMenu === 201 ? (
                                            "it is selectedGetProfessionalMenu 201"
                                        ) : selectedGetProfessionalMenuMenu === 202 ? (
                                            "it is selectedGetProfessionalMenu 202 "
                                        ) : selectedGetProfessionalMenuMenu === 203 ? (
                                            <ValuesandBeliefs recallApi={recallApi} aiData={aiData} />
                                        ) : selectedGetProfessionalMenuMenu === 204 ? (
                                            <PersonalityTraits aiData={aiData} recallApi={recallApi} />
                                        ) : selectedGetProfessionalMenuMenu === 205 ? (
                                            <IntractionExamples aiData={aiData} recallApi={recallApi} />
                                        ) : ""
                                    } */}
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