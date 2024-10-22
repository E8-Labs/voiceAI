"use client"
import { Alert, Box, Button, CircularProgress, FormControl, InputLabel, Link, MenuItem, Modal, Select, Slide, Snackbar, TextField } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
// import Apis from '../Apis/Apis';
import axios from 'axios';
import Image from 'next/image';

const ProfileNav = () => {
    const router = useRouter();
    const pathName = usePathname();
    const [formattedName, setformattedName] = useState('');
    const [formattedEmail, setformattedEmail] = useState('');
    const [separateLetters, setSeparateLetters] = useState('');
    const [getAssistantData, setGetAssistantData] = useState(null);
    const [userDetails, setUserDetails] = useState(null);

    const navLinks = [
        {
            id: 1,
            name: 'Dashboard',
            href: '/creator/profile',
            image: '/assets/creatorProfileNavIcons/dashboardFocus.png',
            unSelectedImg: '/assets/creatorProfileNavIcons/unFocusDashboard.png'
        },
        {
            id: 2,
            name: 'Ai Persona',
            href: '/creator/profile/aiPersona',
            image: '/assets/creatorXWhite.png',
            unSelectedImg: '/assets/creatorXBlack.png'
        },
        {
            id: 3,
            name: 'Social',
            href: '/creator/profile/socials',
            image: '/assets/creatorProfileNavIcons/focusSocial.png',
            unSelectedImg: '/assets/creatorProfileNavIcons/socialUnfocus.png'
        },
        {
            id: 4,
            name: 'Knowledge Base',
            href: '/creator/profile/knowledgebase',
            image: '/assets/creatorProfileNavIcons/selectedKb.png',
            unSelectedImg: '/assets/creatorProfileNavIcons/kbUnfocus.png'
        },
        {
            id: 5,
            name: 'Calls',
            href: '/creator/profile/calls',
            image: '/assets/creatorProfileNavIcons/callFocus.png',
            unSelectedImg: '/assets/creatorProfileNavIcons/callUnfous.png'
        },
        {
            id: 6,
            name: 'Products & Services',
            href: '/creator/profile/services',
            image: '/assets/creatorProfileNavIcons/productsFcous.png',
            unSelectedImg: '/assets/creatorProfileNavIcons/conversationsUnfocus.png'
        }
    ]

    //code for getitng assistant data
    useEffect(() => {
        const localData = localStorage.getItem('assistantData');
        const Data = JSON.parse(localData);
        console.log("Assistant data is", Data);
        setGetAssistantData(Data);
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('User');
        // router.push("/tate.ai")
        router.push('https://www.mycreatorx.com/');
    }

    const handleSideBtnsClick = (e, link) => {
        e.preventDefault();
        router.push(link);
    }


    useEffect(() => {
        const formatName = (name) => {
            if (name.length <= 8) {
                return name;
            }
            else if (name.length > 8) {
                return name.slice(0, 8) + "...";
            }
        };
        const reduceName = (name) => {
            if (name.length) {
                return name.slice(0, 1).toUpperCase()
            }
        }
        const A = localStorage.getItem('User');
        let name = null;
        if (A) {
            const B = JSON.parse(A);
            name = B.data.user.name;
        }
        // setProfileData(B);
        if (name) {
            setformattedName(formatName(name));
            setSeparateLetters(reduceName(name));
        };


    }, []);

    useEffect(() => {
        const formatEmail = (email) => {
            if (email.length <= 15) {
                return email;
            }
            else if (email.length > 15) {
                return email.slice(0, 15) + "...";
            }
        };
        const reduceemail = (email) => {
            if (email.length) {
                return email.slice(0, 1).toUpperCase()
            }
        }
        const A = localStorage.getItem('User');
        let email = null;
        if (A) {
            const B = JSON.parse(A);
            email = B.data.user.email;
        }
        // setProfileData(B);
        if (email) {
            setformattedEmail(formatEmail(email));
            setSeparateLetters(reduceemail(email));
        };


    }, []);

    //showing user profile data
    useEffect(() => {
        const localData = localStorage.getItem('User');
        if (localData) {
            const data = JSON.parse(localData);
            console.log("Get user details", data.data.user);
            setUserDetails(data.data.user);
        }
    }, []);

    //code to make triangle
    const triangle = {
        width: 5,
        height: 5,
        // border: "2px solid red",
        borderTop: "4px solid transparent",
        borderBottom: "4px solid transparent",
        borderLeft: "6px solid #000000"
    }



    return (
        <div className='w-full flex flex-flex-col justify-center' style={{ height: '100%' }}>
            <div className='w-full'>

                <div style={{ marginTop: 20 }}>
                    <div className='px-4 flex gap-4 flex-row items-center py-1'
                        style={{ borderRadius: 50, backgroundColor: "#ffffff30", width: "fit-content" }}>
                        <div className='flex flex-row items-center'>
                            <div style={{ border: "2px solid black", borderRadius: "50%" }}>
                                {
                                    userDetails && userDetails.profile_image ?
                                        <Image src={userDetails.profile_image} alt='profilephoto' height={40} width={40} style={{ resize: "cover", padding: 2, borderRadius: "50%" }} /> :
                                        <Image src={"/assets/placeholderImg.jpg"} alt='profilephoto' height={40} width={40} style={{ resize: "cover", padding: 2, borderRadius: "50%" }} />
                                }
                            </div>
                            {/* <div style={triangle} /> */}
                        </div>
                        <div>
                            <div className='flex flex-row items-center gap-8' style={{ fontSize: 16, fontWeight: "400", fontFamily: "inter" }}>

                                {
                                    userDetails && userDetails.name ?
                                        <div style={{ fontSize: 16, fontWeight: "400", fontFamily: "inter" }}>
                                            {formattedName}
                                        </div> :
                                        <div style={{ fontSize: 16, fontWeight: "400", fontFamily: "inter" }}>
                                            {userDetails &&
                                                { formattedEmail }
                                            }
                                        </div>
                                }

                            </div>
                            {/* <div className='flex flex-row gap-4'>
                                <button>
                                    <Image
                                        // layout='responsive'
                                        objectFit='contain' src={"/assets/twitter.png"} alt='social' height={11} width={11} style={{ resize: "cover" }} />
                                </button>
                                <button>
                                    <Image
                                        // layout='responsive'
                                        objectFit='contain' src={"/assets/instagram.png"} alt='social' height={11} width={11} style={{ resize: "cover" }} />
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>

                <div className='flex flex-col items-start w-full items-center' style={{ marginTop: 10 }}>
                    <div className='flex flex-col gap-3 items-start w-11/12'>

                        <div>
                            {
                                navLinks.map((link) => {
                                    return (
                                        <div key={link.id} className='mt-3'>
                                            <Link className='flex flex-row gap-4 items-center py-2' sx={{ textDecoration: 'none', cursor: "pointer", color: "black" }}
                                                key={link.name}
                                                // href={link.href}
                                                onClick={(e) => handleSideBtnsClick(e, link.href)}
                                                style={{
                                                    fontWeight: '400', fontSize: 13, fontFamily: 'inter',
                                                    color: pathName === link.href ? 'white' : '#00000070',
                                                    backgroundColor: pathName === link.href ? 'blue' : '',
                                                    // padding: pathName === link.href ? 6 : "", 
                                                    borderRadius: "50px",
                                                    paddingInline: 10
                                                }}> {/* 2548FD40 */}
                                                <div>
                                                    <Image src={pathName === link.href ? link.image : link.unSelectedImg} height={25} width={25} alt='abc' />
                                                </div>
                                                <div
                                                    style={{
                                                        fontWeight: '400', fontSize: 13, fontFamily: 'inter',
                                                        color: pathName === link.href ? 'white' : '#00000070',
                                                        backgroundColor: pathName === link.href ? 'blue' : '',
                                                        // padding: pathName === link.href ? 6 : "",
                                                        borderRadius: "50px",
                                                        // paddingInline: pathName === link.href ? 20 : ""
                                                    }}>
                                                    {link.name}
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div>
                            <button className='px-4 py-1' onClick={handleLogout}
                                style={{ backgroundColor: '#FF424250', fontWeight: '400', fontFamily: 'inter', color: '#FF4242', cursor: "pointer", borderRadius: '25px' }}>
                                Logout
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileNav