"use client"
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
// import Apis from '../Apis/Apis';
import Image from 'next/image';
import { Alert, Fade, Link, Snackbar } from '@mui/material';
import CallerMenu from '../CallerMenu';
import loginFunction from '@/components/loginFunction';

const CallerProfileNav = ({ handleCloseMenu }) => {
    const router = useRouter();

    loginFunction();
    // useEffect(() => {
    //     console.log("Check 1");
    //     const localData = localStorage.getItem("User");
    //     if (localData) {
    //         console.log("Check 2");
    //         const Data = JSON.parse(localData)
    //     } else {
    //         router.push("/tristan.ai");
    //         // window.open('https://www.youtube.com/watch?v=YINxH2VLP-A&list=RDMM&index=5', "_blank")
    //         console.log("Check 3");
    //     }
    // }, []);

    const pathName = usePathname();
    const [formattedName, setformattedName] = useState('');
    const [formattedEmail, setformattedEmail] = useState('');
    const [separateLetters, setSeparateLetters] = useState('');
    const [getAssistantData, setGetAssistantData] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [showFullName, setShowFullName] = useState(false);


    const links = [
        {
            id: 1,
            name: 'My Account',
            href: '/caller/profile',
            image: '/assets/about.png',
            unSelectedImg: '/profileIcon.png'
        },
        {
            id: 2,
            name: 'Calls',
            href: '/caller/profile/calls',
            image: '/assets/selectedCallIcon.png',
            unSelectedImg: '/assets/unselectedCallIcon.png'
        },
        {
            id: 3,
            name: 'Products',
            href: '/caller/profile/myProducts',
            image: '/assets/selectedCreatorIcon.png',
            unSelectedImg: '/assets/unselectedCreatorIcon.png'
        },
        {
            id: 4,
            name: 'Payment Method',
            href: '/caller/profile/plans',
            image: '/assets/selectedPlansIcon.png',
            unSelectedImg: '/assets/plansI.png'
        },
        {
            id: 5,
            name: 'Feedback',
            href: '',
            image: '/assets/selectedfeedbackIcon.png',
            unSelectedImg: '/assets/feedback.png'
        },
        {
            id: 6,
            name: 'Terms & Condition',
            href: '/caller/profile/termsandconditions',
            image: '/assets/selectedTermsIcon.png',
            unSelectedImg: '/assets/terms.png'
        },
        {
            id: 7,
            name: 'Privay Policy',
            href: '/caller/profile/privacypolicy',
            image: '/assets/selectedTermsIcon.png',
            unSelectedImg: '/assets/terms.png'
        }
    ]

    useEffect(() => {
        const localData = localStorage.getItem('User');
        if (localData) {
            const data = JSON.parse(localData);
            console.log("Get user details", data.data.user);
            setUserDetails(data.data.user);
        }

        //code for recieving event listener
        const handleEvent = (event) => {
            console.log('Received event:', event.detail.message);
            window.location.reload();
        }

        window.addEventListener('updateProfile', handleEvent);

        return () => {
            window.removeEventListener('updateProfile', handleEvent);
        };

    }, []);

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
            console.log("Local value is", B);
            console.log("Email value is", email);
        }
        // return
        // setProfileData(B);
        if (email) {
            setformattedEmail(formatEmail(email));
            setSeparateLetters(reduceemail(email));
        }
        else {
            return
        }

    }, []);

    const handleSideBtnsClick = (e, link) => {
        e.preventDefault();
        router.push(link);
    }


    const triangle = {
        width: 5,
        height: 5,
        // border: "2px solid red",
        borderTop: "4px solid transparent",
        borderBottom: "4px solid transparent",
        borderLeft: "6px solid #000000"
    }



    return (
        <div className='w-full'>
            <div className='w-full flex flex-flex-col justify-center' style={{ height: '100%' }}>
                <div className='w-full'>


                    <div className='flex flex-col items-start w-full items-center' style={{ marginTop: 10 }}>
                        <div className='flex flex-col gap-3 items-start md:w-11/12'>

                            <div style={{ marginTop: 20 }}>
                                <div className='px-4 flex gap-4 flex-row items-center py-1'
                                    style={{ borderRadius: 50, backgroundColor: "#ffffff30", width: "fit-content" }}>
                                    <div className='flex flex-row items-center'>
                                        <button style={{ border: "2px solid black", cursor: 'pointer', borderRadius: "50%" }}>
                                            {/* <Image src={"/assets/placeholderImg.jpg"} alt='profilephoto' height={40} width={40} style={{ resize: "cover", padding: 2, borderRadius: "50%" }} /> */}
                                            {
                                                userDetails && userDetails.profile_image ?
                                                    // <img src={userDetails.profile_image} alt='profilephoto' style={{ resize: "cover", padding: 2, borderRadius: "50%", height: 40, width: 40 }} />
                                                    <Image
                                                        src={userDetails.profile_image}
                                                        alt='profile'
                                                        height={40}
                                                        width={40}
                                                        style={{
                                                            width: '40px',
                                                            height: '40px',
                                                            backgroundColor: "",
                                                            borderRadius: "50%",
                                                            border: "3px solid white",
                                                            objectFit: 'cover',
                                                            objectPosition: 'center',
                                                            // backgroundColor: 'red'
                                                        }}
                                                    />
                                                    :
                                                    <Image src={"/assets/placeholderImg.jpg"} alt='profilephoto' height={40} width={40} style={{ resize: "cover", padding: 2, borderRadius: "50%" }} />
                                            }
                                        </button>
                                        {/* <div style={triangle} /> */}
                                    </div>
                                    <div>
                                        <div className='flex flex-row items-center gap-8' style={{ fontSize: 16, fontWeight: "400", fontFamily: "inter" }}>
                                            {/* Hamza */}
                                            {
                                                userDetails && userDetails.name ?
                                                    <div style={{ fontSize: 16, fontWeight: "400", fontFamily: "inter" }}>
                                                        {/* {formattedName} */}
                                                        {formattedName.charAt(0).toUpperCase() + formattedName.slice(1)}
                                                    </div> :
                                                    <div style={{ fontSize: 16, fontWeight: "400", fontFamily: "inter" }}>
                                                        {/* {userDetails &&
                                                        { formattedEmail }
                                                    } */}
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

                            <div>
                                {
                                    links.map((link) => {
                                        return (
                                            <div key={link.id} className='mt-3'>
                                                <Link className='flex flex-row gap-4 items-center py-2' sx={{ textDecoration: 'none', cursor: "pointer", color: "black" }}
                                                    key={link.name}
                                                    href={link.href}
                                                    onClick={(e) => {
                                                        handleSideBtnsClick(e, link.href);
                                                        if (handleCloseMenu) {
                                                            handleCloseMenu(false);
                                                        }
                                                    }}
                                                    style={{
                                                        fontWeight: '400', fontSize: 13, fontFamily: 'inter',
                                                        color: pathName === link.href ? 'white' : '#00000070',
                                                        backgroundColor: pathName === link.href ? 'blue' : '',
                                                        // padding: pathName === link.href ? 6 : "", 
                                                        borderRadius: "50px",
                                                        paddingInline: 10
                                                    }}> {/* 2548FD40 */}
                                                    <Image src={pathName === link.href ? link.image : link.unSelectedImg}
                                                        height={20} width={20} alt='icon'
                                                        style={{ objectFit: 'contain' }}
                                                    />
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

                        </div>
                    </div>
                </div>


            </div>
            {/* <div className='lg:hidden' style={{ overflowY: 'hidden' }}>
                <CallerMenu />
            </div> */}
        </div>
    )
}

export default CallerProfileNav;