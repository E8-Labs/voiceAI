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
    const [userName, setUserName] = useState("");
    const [formattedEmail, setFormattedEmail] = useState('');
    const [separateLetters, setSeparateLetters] = useState('');
    const [getAssistantData, setGetAssistantData] = useState(null);

    const links1 = [
        {
            id: 1,
            name: 'My Account',
            href: '/profile',
            image: '/assets/about.png'
        },
        {
            id: 2,
            name: 'Plans',
            href: '/profile/plans',
            image: '/assets/plansI.png'
        },
        {
            id: 3,
            name: 'Feedback',
            href: '',
            image: '/assets/feedback.png'
        },
        {
            id: 4,
            name: 'Terms & Condition',
            href: '',
            image: '/assets/terms.png'
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
        router.push("/tate")
    }

    const handleSideBtnsClick = (e, link) => {
        e.preventDefault();
        router.push(link);
    }


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
        const B = JSON.parse(A);
        const email = B.data.user.email;
        // setProfileData(B);
        if (email) {
            setFormattedEmail(formatEmail(email));
            setSeparateLetters(reduceemail(email));
        };

        if (B.data.user.name) {
            setUserName(B.data.user.name)
        }
    }, []);

    //showing user profile data
    useEffect(() => {
        const localData = localStorage.getItem('User');
        const data = JSON.parse(localData);
        console.log("Get user details", data.data.user);
        
    }, [])



    return (
        <div className='w-full flex flex-flex-col justify-center' style={{ height: '100%' }}>
            <div className='w-full'>

                <div style={{ marginTop: 20 }}>
                    <div className='px-4 flex gap-4 flex-row items-center'
                        style={{ border: "2px solid #ffffff", borderRadius: 50 }}>
                        <div className='flex flex-row items-center'>
                            <div style={{ border: "2px solid black", borderRadius: "50%" }}>
                                <Image src={"/assets/profile.png"} alt='profilephoto' height={40} width={40} style={{ resize: "cover", padding: 2 }} />
                            </div>
                            <div style={{ height: "5px", width: "5px", backgroundColor: "black", borderTopRightRadius: "10px", borderBottomRightRadius: "10px" }} />
                        </div>
                        <div>
                            <div className='flex flex-row items-center gap-8' style={{ fontSize: 16, fontWeight: "400", fontFamily: "inter" }}>
                                
                                {/* <div className='flex flex-row gap-4'>
                                    <button>
                                        <Image
                                            layout='responsive'
                                            objectFit='contain' src={"/assets/twitter.png"} alt='social' height={11} width={11} style={{ resize: "cover" }} />
                                    </button>
                                    <button>
                                        <Image
                                            layout='responsive'
                                            objectFit='contain' src={"/assets/instagram.png"} alt='social' height={11} width={11} style={{ resize: "cover" }} />
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col items-start w-full items-center' style={{ marginTop: 10 }}>
                    <div className='flex flex-col gap-3 items-start w-11/12'>

                        <div>
                            {
                                links1.map((link) => {
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
                                                    paddingInline: 20
                                                }}> {/* 2548FD40 */}
                                                <div>
                                                    <Image src={link.image} height={25} width={25} alt='abc' />
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