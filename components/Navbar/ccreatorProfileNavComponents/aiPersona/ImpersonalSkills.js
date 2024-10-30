import { Box, CircularProgress, Modal, Popover } from '@mui/material';
import { DotsThree } from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Apis from '@/components/apis/Apis';
import axios from 'axios';

const ImpersonalSkills = ({ recallApi, aiData }) => {

    const [personalSkillsData, SetPersonalSkillsData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const id = anchorEl ? 'simple-popover' : undefined;
    const [skillsLoader, setSkillsLoader] = useState(false);
    const [successSnack, setSuccessSnack] = useState(false);
    const [errSnack, setErrSnack] = useState(false);
    const [skillLoader, setSkillLoader] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState(null);

    //code to add Personal SKill
    const [addSkillModal, setAddSkillModal] = useState(false);
    const [addSkillTitle, setAddSkillTitle] = useState("");
    const [addSkillDescription, setAddSkillDescription] = useState("");

    //code to update Personal SKill
    const [updateSkillModal, setUpdateSkillModal] = useState(false);
    const [updateSkillTitle, setUpdateSkillTitle] = useState("");
    const [updateSkillDescription, setUpdateSkillDescription] = useState("");


    useEffect(() => {
        const localAiPersonaDetails = localStorage.getItem("aiPersonaDetails");
        if (localAiPersonaDetails) {
            const AiDetails = JSON.parse(localAiPersonaDetails);
            SetPersonalSkillsData(AiDetails.interpersonalSkills);
            console.log("Aidetails recieved from local storage are", AiDetails);
        }
    }, []);


    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event, item) => {
        setAnchorEl(event.currentTarget);
        setSelectedSkill(item);
        setUpdateSkillTitle(item.title);
        setUpdateSkillDescription(item.description);
    };

    //add Framework
    const handleAddSkill = async () => {
        setSkillsLoader(true);
        try {
            const ApiPath = Apis.AddInterPersonalSkills;
            const localData = localStorage.getItem('User');
            const Data = JSON.parse(localData);
            const AuthToken = Data.data.token;
            console.log("Authtoken is", AuthToken);
            console.log("Apipath is", ApiPath);

            const ApiData = {
                title: addSkillTitle,
                description: addSkillDescription
            }

            console.log("Data sendgin in api is", ApiData);

            const response = await axios.post(ApiPath, ApiData, {
                headers: {
                    "Authorization": "Bearer " + AuthToken,
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("Response of add framework api is", response.data);
                if (response.data.status === true) {
                    setAddSkillModal(false);
                    setAddSkillTitle("");
                    setAddSkillDescription("");
                    SetPersonalSkillsData(response.data.data.interpersonalSkills);
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                } else {
                    console.log("Error occured")
                }
            }

        } catch (error) {
            console.error("ERR occured in add framework api is", error);
        } finally {
            setSkillsLoader(false);
        }
    }

    //style for the Modal
    const styles = {
        AddNewValueModal: {
            height: "auto",
            bgcolor: "transparent",
            // p: 2,
            mx: "auto",
            my: "50vh",
            transform: "translateY(-55%)",
            borderRadius: 2,
            border: "none",
            outline: "none",
        }
    }

    // const []

    return (
        <div>
            <div className='flex flex-row items-center justify-between' style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}>
                <div>
                    Impersonal Skills
                </div>
                <button className='text-purple underline' onClick={() => { setAddSkillModal(true) }}>
                    Add New
                </button>
            </div>

            {
                personalSkillsData.length > 0 ?
                    <div className='max-h-[55vh] overflow-auto scrollbar scrollbar-thumb-purple scrollbar-track-transparent scrollbar-thin'>
                        {
                            personalSkillsData.map((item) => (
                                <div key={item.id}>
                                    <div className='border-2 rounded-lg p-4 mt-8 flex flex-row items-start justify-between'>
                                        <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                                            {item.description}
                                        </div>

                                        <div>
                                            <button aria-describedby={id} variant="contained" color="primary" onClick={(event) => { handleClick(event, item) }}>
                                                <DotsThree size={32} weight="bold" />
                                            </button>
                                            <Popover
                                                id={id}
                                                open={Boolean(anchorEl)}
                                                anchorEl={anchorEl}
                                                onClose={handleClose}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'center',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                }}
                                            >
                                                <div className='p-2 flex flex-col justify-start items-start w-[100px]'>
                                                    <button
                                                        className='text-purple' style={{
                                                            fontSize: 13, fontWeight: "500",
                                                            fontFamily: "inter"
                                                        }}>
                                                        Edit
                                                    </button>
                                                    {
                                                        skillsLoader ?
                                                            <CircularProgress size={15} /> :
                                                            <button style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter", marginTop: 8 }}>
                                                                Delete
                                                            </button>
                                                    }
                                                </div>
                                            </Popover>
                                        </div>

                                    </div>
                                </div>
                            ))
                        }
                    </div> :
                    <div className='text-xl font-bold text-center mt-8'>
                        <div className='flex flex-col items-center w-full gap-3 mt-4'>
                            <div className='flex flex-row items-center justify-center bg-purple' style={{ height: "70px", width: "70px", borderRadius: "50%" }}>
                                <Image src="/assets/creatorProfileNavIcons/settingIcon.png" height={32} width={32} alt='seting' />
                            </div>
                            <div style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}>
                                No personal skill found yet
                            </div>
                            <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter", color: "#050A0860", textAlign: "center" }}>
                                Please add your personal skill
                            </div>
                            <button className='bg-purple px-4 py-2 text-white' style={{ borderRadius: "50px" }} onClick={() => { setAddSkillModal(true) }}>
                                Add New
                            </button>
                        </div>
                    </div>
            }


            {/* Modal to add personal skill */}
            <Modal
                open={addSkillModal}
                onClose={() => setAddSkillModal(false)}
                closeAfterTransition
                BackdropProps={{
                    timeout: 1000,
                    sx: {
                        backgroundColor: "transparent",
                        backdropFilter: "blur(20px)",
                    },
                }}
            >
                <Box className="lg:w-5/12 sm:w-7/12 w-full" sx={styles.AddNewValueModal}>
                    {/* <LoginModal creator={creator} assistantData={getAssistantData} closeForm={setOpenLoginModal} /> */}
                    <div className="flex flex-row justify-center w-full">
                        <div
                            className="sm:w-7/12 w-full"
                            style={{
                                backgroundColor: "#ffffff20",
                                padding: 20,
                                borderRadius: 10,
                            }}
                        >
                            <div style={{ backgroundColor: "#ffffff", borderRadius: 7, padding: 10 }}>
                                <div className='flex flex-row items-center justify-between p-2' style={{ fontWeight: '500', fontFamily: "inter", fontSize: 18 }}>
                                    <p />
                                    <p>Add Personal Skill</p>
                                    <button onClick={() => { setAddSkillModal(false) }}>
                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                    </button>
                                </div>
                                <div className='mt-8 w-full'>
                                    <div>
                                        <input className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={addSkillTitle}
                                            onChange={(e) => setAddSkillTitle(e.target.value)}
                                            placeholder='Title'
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13 }}
                                        />
                                    </div>
                                    <div className='mt-12'>
                                        <textarea className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                                            value={addSkillDescription}
                                            onChange={(e) => setAddSkillDescription(e.target.value)}
                                            placeholder='Description'
                                            rows={4}
                                            style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13, resize: "none" }}
                                        />
                                    </div>
                                    {
                                        skillsLoader ?
                                            <div className='w-full flex flex-row justify-center' style={{ marginTop: 35 }}>
                                                <CircularProgress size={25} />
                                            </div> :
                                            <button className='w-full py-2 text-white bg-purple ' style={{ borderRadius: "50px", marginTop: 35 }}
                                                onClick={handleAddSkill}>
                                                Add
                                            </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>




        </div>
    )
}

export default ImpersonalSkills