"use client";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Fade,
  IconButton,
  InputAdornment,
  Modal,
  Snackbar,
  TextField,
  Visibility,
  VisibilityOff,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PhoneNumberInput from "../PhoneNumberInput";
import Apis from "../apis/Apis";
import axios from "axios";
import AiSocialLinks from "./AiSocialLinks";
import { useRouter } from "next/navigation";
// import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import Knowledgebase from "../buildai/Knowledgebase";
import SocialOAuth from "./SocialOAuth";

const boxVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0.4,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0.4,
  }),
};

export default function ScriptAnimation({ onChangeIndex }) {

  useEffect(() => {
    const Data = localStorage.getItem('BuildaiIndex');
    if (Data) {
      const localdata = JSON.parse(Data);
      setCurrentIndex(localdata);
      setDirection(localdata);
    }
    // else{
    //   setCurrentIndex(0);
    //   setDirection(0);
    // }
  })
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(3);
  const [direction, setDirection] = useState(0);

  //code for getting value of input fields
  const [aiName, setAiName] = useState("");
  const [talkAbout, setTalkAbout] = useState("");
  const [helpTagline, setHelpTagline] = useState("");
  const [buildAiLoader, setBuildAiLoader] = useState(false);
  const [kbData, setkbData] = useState(false);
  const [skipLoader, setSkipLoader] = useState(false);
  // const [selectedAudio, setSelectedAudio] = useState(null);
  // const [audioUrl, setAudioUrl] = useState(null);
  const [selectedAudios, setSelectedAudios] = useState([]);
  const [audioUrls, setAudioUrls] = useState([]);
  const [compressedAudioUrl, setCompressedAudioUrl] = useState(null);
  const [showBuildAiErr, setShowBuildAiErr] = useState(false);
  //state to get sociallinks data
  const [socialLinks, setSocialLinks] = useState(null);
  const [knowledgeModal, setKnowledgeModal] = useState(false);
  const [knowledgeData, setKnowledgeData] = useState([]);
  const [delKBLoader, setDelKBLoader] = useState(null);
  const fileInputRef = useRef(null);
  const [uploadLoader, setUploadLoader] = useState(false);

  const getAiData = async () => {
    const localData = localStorage.getItem('User');
    const Data = JSON.parse(localData);
    // setAiLoader(true);
    // console.log("Data from local for nowledge", Data);
    const AuthToken = Data.data.token;
    console.log("Auth token is", AuthToken);
    try {
      const response = await axios.get(Apis.MyAiapi, {
        headers: {
          'Authorization': 'Bearer ' + AuthToken,
          'Content-Type': 'application/json'
        }
      });

      if (response) {
        console.log("Response of kb api is", response.data.data);
        if (response.data.status === true) {
          setKnowledgeData(response.data.data.kb)
          if (response.data.data.kb.length > 0) {
            setkbData(false);
          } else {
            setkbData(true);
          }
          // setAiData(response.data.data.kb);
          // setUserSelectedData(response.data.data.kb);
          // getknowledgeData(response.data.data.kb);
          // closeModal(false);
          // localStorage('KnowledgeBase', JSON.stringify(response.data.data.kb));
        } else {
          console.error("Status of kb api", response.data.message);
        }
      }
    } catch (error) {
      console.error("Error occured in kb", error);
    } finally {
      // setAiLoader(false);
    }

  }

  useEffect(() => {
    getAiData();
  }, [])

  // const handleSocialLinks = () => {}
  useEffect(() => {
    const localData = localStorage.getItem('User');
    if (localData) {
      const Data = JSON.parse(localData);
      console.log("Local Data recieved from localstorage", Data)
      if (Data.data.user.username) {
        setAiName(Data.data.user.username)
      }
    }
  }, [])

  //code for multiple audios
  const handleAudioChange = (event) => {
    const files = Array.from(event.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));

    setSelectedAudios((prevSelectedAudios) => [...prevSelectedAudios, ...files]);
    setAudioUrls((prevAudioUrls) => [...prevAudioUrls, ...urls]);
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveAudio = (index) => {
    setAudioUrls((prevAudioUrls) => prevAudioUrls.filter((_, i) => i !== index));
    setSelectedAudios((prevSelectedAudios) => prevSelectedAudios.filter((_, i) => i !== index));
  };

  // const handleAudioChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setSelectedAudio(file);
  //     const url = URL.createObjectURL(file);
  //     setAudioUrl(url);
  //     console.log("Selected audio file url is", url);
  //   }
  // };

  // const handleUploadClick = () => {
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click();
  //   }
  // };

  // const compressAudio = async (file) => {
  //   if (!ffmpeg.isLoaded()) {
  //     await ffmpeg.load();
  //   }
  //   ffmpeg.FS("writeFile", "input.mp3", await fetchFile(file));

  //   // Convert to a lower bitrate mp3 file
  //   await ffmpeg.run("-i", "input.mp3", "-b:a", "96k", "output.mp3");

  //   const data = ffmpeg.FS("readFile", "output.mp3");
  //   const compressedBlob = new Blob([data.buffer], { type: "audio/mp3" });
  //   const compressedUrl = URL.createObjectURL(compressedBlob);
  //   setCompressedAudioUrl(compressedUrl);
  // };

  //calling api of ld your ai

  // useEffect(() => {
  //   if (selectedAudio) {
  //     console.log("Trying to call api")
  //     handleBuildAI();
  //   }
  // }, [selectedAudio])

  const handleBuildAI = async (event) => {

    try {

      if (event) {
        setSkipLoader(true);
      } else {
        // setUploadLoader(true);
        setBuildAiLoader(true)
      }

      const ApiPath = Apis.BuildAI;
      const LocalData = localStorage.getItem("User");
      const Data = JSON.parse(LocalData);
      const AuthToken = Data.data.token;
      console.log("Authtoken is", AuthToken);
      const formData = new FormData();
      formData.append("name", aiName);
      formData.append("action", helpTagline);
      formData.append("tagline", talkAbout);

      const localData = localStorage.getItem("socialsUrl");
      if (localData) {
        const Data = JSON.parse(localData);
        console.log("social inks data recieved", Data);
        if (Data.discord_url) {
          formData.append("discord_url", Data.discord_url);
        }
        if (Data.fb_url) {
          formData.append("fb_url", Data.fb_url);
        }
        if (Data.insta_url) {
          formData.append("insta_url", Data.insta_url);
        }
        if (Data.spotify_url) {
          formData.append("spotify_url", Data.spotify_url);
        }
        if (Data.twitter_url) {
          formData.append("twitter_url", Data.twitter_url);
        }
        if (Data.youtube_url) {
          formData.append("youtube_url", Data.youtube_url);
        }
      }

      if (selectedAudios) {
        formData.append("media", selectedAudios);
        console.log("Audi sending in api", selectedAudios);
      }
      console.log("Data sending in api is", formData);
      const response = await axios.post(ApiPath, formData, {
        headers: {
          Authorization: "Bearer " + AuthToken,
        },
      });
      // return
      if (response) {
        console.log("Response of create builai api is", response.data);
        if (response.data.status === true) {
          router.push("/creator/buildscript2");
          console.log("response of build ai apis is", response.data.data);
        } else {
          console.log("status of api", response.data.status);
          setShowBuildAiErr(true);
        }
      }
    } catch (error) {
      console.error("ERror occured in build ai api", error);
    } finally {
      // setUploadLoader(false);
      setBuildAiLoader(false);
      setSkipLoader(false);
    }
  };

  //move to script2 flow
  const handleContinueToScript2 = () => {
    router.push("/creator/buildscript2");
  };

  const handleContinue = () => {
    // handleCurrentIndex();
    setDirection(1);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleTempContinue = () => {
    // handleCurrentIndex();
    setDirection(2);
    setCurrentIndex((prevIndex) => prevIndex + 2);
  };

  const handleBack = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  useEffect(() => {
    onChangeIndex(currentIndex);
  }, [currentIndex]);

  const containerStyles = {
    position: "relative",
    // height: '40vh',
    width: "100%",
    overflow: "hidden",
  };

  const styles = {
    // position: 'absolute', // Ensures the boxes are stacked on top of each other
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: "blue",
    // height: "20vh",
    // marginLeft: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // marginInline: 10,ƒ
  };

  //styles for mui fields
  const MuiFieldStyle = {
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiFilledInput-root": {
      fontSize: 13,
      fontWeight: "400",
      backgroundColor: "#EDEDED78", //"#EDEDEDC7", // Optional: Removes the background color
      "&:before": {
        borderBottom: "none", // Remove the default inactive state bottom border
      },
      "&:after": {
        borderBottom: "none", // Remove the focused state bottom border
      },
      "&:hover:before": {
        borderBottom: "none", // Remove the hover state bottom border
      },
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      height: "48px",
      backgroundColor: "#EDEDEDC7",
      color: "black",
      "& fieldset": {
        borderColor: "transparent",
      },
      "&:hover fieldset": {
        borderColor: "transparent",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#00000000",
        color: "#000000",
      },
      "& .MuiOutlinedInput-input": {
        color: "black !important",
      },
      "&.Mui-focused .MuiOutlinedInput-input": {
        color: "black !important",
      },
    },
  };

  const styleLoginModal = {
    height: 'auto',
    // bgcolor: 'white',
    p: 2,
    mx: 'auto',
    my: '50vh',
    transform: 'translateY(-50%)',
    borderRadius: 2,
    border: "none",
    outline: "none",
    // border: "2px solid green"
  };

  const handleCloseModal = (status) => {
    setKnowledgeModal(status)
  }

  const getknowledgeData = (data) => {
    // setKnowledgeData(data)
    getAiData();
  }

  const handleDelAddedData = async (itemId) => {
    const localData = localStorage.getItem('User');
    if (localData) {
      setDelKBLoader(itemId);
      const Data = JSON.parse(localData);
      const AuthToken = Data.data.token;
      const ApiPath = Apis.DelKnowledgeBase;
      console.log("Authtoken", ApiPath, AuthToken);
      const apiData = {
        kbId: itemId
      }
      console.log("Kb id sending in api", apiData);
      try {
        const response = await axios.post(ApiPath, apiData, {
          headers: {
            'Authorization': 'Bearer ' + AuthToken,
            'Content-Type': 'application/json'
          }
        });
        if (response) {
          console.log("Response of api is", response.data);
          if (response.data.status === true) {
            console.log("Response of api is", response.data);
            getAiData();
          } else {
            console.log("Response of api is", response.data.message);
          }
        }
      } catch (error) {
        console.error("Error occured in api", error);
      } finally {
        setDelKBLoader(null);
        setKnowledgeData(knowledgeData.filter(knowledgeData => knowledgeData.id !== itemId));
      }

    }
  }

  return (
    <div style={containerStyles}>
      <AnimatePresence initial={false} custom={direction}>
        {currentIndex === 0 && (
          <div
            style={{ height: "" }}
          >
            <motion.div
              key="box1"
              custom={direction}
              variants={boxVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0 }}
              style={styles}
            >
              <div className="w-full flex sm:justify-center justify-start">
                <div className="w-full">
                  <div>
                    {/* <button onClick={handleBack}>
                                            <Image src={'/assets/backarrow.png'} alt='back' height={14} width={16} />
                                        </button> */}
                  </div>
                  <div
                    // className="mt-6"
                    style={{
                      fontSize: 24,
                      fontWeight: "600",
                      fontFamily: "inter",
                    }}
                  >
                    Name your AI
                  </div>
                  <div className="w-full sm:w-9/12 mt-10">
                    <TextField
                      className="w-full"// sm:w-9/12" //style={{marginTop: 6}}
                      autofill="off"
                      id="filled-basic"
                      // label="Name"
                      variant="outlined"
                      value={aiName}
                      onChange={(e) => setAiName(e.target.value)}
                      placeholder="For ex: Hormozi, Tate.ai"
                      sx={MuiFieldStyle}
                      inputProps={{
                        maxLength: 6
                      }}
                    />
                  </div>

                  <div className="w-full sm:w-9/12">
                    {aiName ? (
                      <button
                        onClick={handleContinue}
                        // onClick={() => {
                        //   console.log("Ai name is", aiName)
                        // }}
                        className="bg-purple hover:bg-purple text-white w-full mt-8"
                        style={{
                          fontSize: 15,
                          fontWeight: "400",
                          height: "52px",
                          borderRadius: "50px",
                        }}
                      >
                        Continue
                      </button>
                    ) : (
                      <button
                        disabled
                        // onClick={handleContinue}
                        className="bg-purple2 hover:bg-purple text-white w-full mt-8"
                        style={{
                          fontSize: 15,
                          fontWeight: "400",
                          height: "52px",
                          borderRadius: "50px",
                          color: "white",
                        }}
                      >
                        Continue
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        {currentIndex === 1 && (
          <div
            className="flex flex-col sm:justify-center justify-start"
            style={{ height: "" }}
          >
            <motion.div
              key="box2"
              custom={direction}
              variants={boxVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0 }}
              style={styles}
            >
              <div className="w-full flex sm:justify-center justify-start">
                <div className="w-full">
                  <div>
                    <button onClick={handleBack}>
                      <Image
                        src={"/assets/backarrow.png"}
                        alt="back"
                        height={14}
                        width={16}
                      />
                    </button>
                  </div>
                  <div
                    className="mt-6 w-full sm:w-9/12"
                    style={{
                      fontSize: 24,
                      fontWeight: "600",
                      fontFamily: "inter",
                    }}
                  >
                    Describe what {aiName} does as a creator or influencer?
                  </div>

                  <TextField
                    className="w-full sm:w-9/12 mt-8"
                    autofill="off"
                    id="filled-basic"
                    autoFocus={true}
                    // label="Description"
                    variant="filled"
                    multiline
                    rows={3}
                    value={talkAbout}
                    onChange={(e) => setTalkAbout(e.target.value)}
                    placeholder=" talk about dating, business, fitness ..."
                    sx={{
                      marginTop: 4,
                      "& label.Mui-focused": {
                        color: "#050A0890",
                      },
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#EDEDED78", // Background color of the input
                        fontSize: 13,
                        fontWeight: "400",
                        fontFamily: "inter",
                        borderRadius: 2
                      },
                      "& .MuiFilledInput-root:before": {
                        borderBottom: "none", // Remove the default inactive state bottom border
                      },
                      "& .MuiFilledInput-root:after": {
                        borderBottom: "none", // Remove the focused state bottom border
                      },
                      "& .MuiFilledInput-root:hover:not(.Mui-disabled):before":
                      {
                        borderBottom: "none", // Remove the hover state bottom border
                      },
                      "& .MuiFilledInput-root.Mui-focused:before": {
                        borderBottom: "none", // Ensure no border is shown when the field is focused
                      },
                      "& .MuiFilledInput-root.Mui-focused": {
                        borderBottom: "none", // Ensure no border is shown when the field is focused
                        boxShadow: "none", // Remove any box-shadow
                      },
                    }}
                  />

                  <div className="w-full sm:w-9/12">
                    {talkAbout ? (
                      <button
                        onClick={handleContinue}
                        className="bg-purple hover:bg-purple text-white w-full mt-12"
                        style={{
                          fontSize: 15,
                          fontWeight: "400",
                          height: "52px",
                          borderRadius: "50px",
                        }}
                      >
                        Continue
                      </button>
                    ) : (
                      <button
                        disabled
                        // onClick={handleContinue}
                        className="bg-purple2 hover:bg-purple text-white w-full mt-12"
                        style={{
                          fontSize: 15,
                          fontWeight: "400",
                          height: "52px",
                          borderRadius: "50px",
                          color: "white",
                        }}
                      >
                        Continue
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        {currentIndex === 2 && (
          <div
            className="flex flex-col sm:justify-center justify-start"
            style={{ height: "" }}
          >
            <motion.div
              key="box3"
              custom={direction}
              variants={boxVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0 }}
              style={styles}
            >
              <div className="w-full flex sm:justify-center justify-start">
                <div className="w-full">
                  <div>
                    <button onClick={handleBack}>
                      <Image
                        src={"/assets/backarrow.png"}
                        alt="back"
                        height={14}
                        width={16}
                      />
                    </button>
                  </div>
                  <div
                    className="mt-6 w-full sm:w-9/12"
                    style={{
                      fontSize: 24,
                      fontWeight: "600",
                      fontFamily: "inter",
                    }}
                  >
                    What does {aiName} help your community with?
                  </div>
                  <div className="mt-8">
                    <TextField
                      className="w-full sm:w-9/12"
                      autofill="off"
                      id="filled-basic"
                      // label="Ai help tagline"
                      variant="filled"
                      multiline
                      autoFocus={true}
                      rows={3}
                      value={helpTagline}
                      onChange={(e) => setHelpTagline(e.target.value)}
                      placeholder="I help my community of followers with understanding their feelings for others, overcoming obstacles with their relationships, etc"
                      sx={{
                        "& label.Mui-focused": {
                          color: "#050A0890",
                        },
                        "& .MuiFilledInput-root": {
                          backgroundColor: "#EDEDED78", // Optional: Removes the background color
                          // padding: '6px 8px', // Decrease the padding inside the input container
                          fontSize: 13,
                          fontWeight: "400",
                          fontFamily: "inter",
                          borderRadius: 2
                        },
                        "& .MuiFilledInput-root:before": {
                          borderBottom: "none", // Remove the default inactive state bottom border
                        },
                        "& .MuiFilledInput-root:after": {
                          borderBottom: "none", // Remove the focused state bottom border
                        },
                        "& .MuiFilledInput-root:hover:before": {
                          borderBottom: "none", // Remove the hover state bottom border
                        },
                        "& .MuiFilledInput-root.Mui-focused:before": {
                          borderBottom: "none", // Ensure no border is shown when the field is focused
                        },
                      }}
                    />
                  </div>

                  <div className="w-full sm:w-9/12">
                    {helpTagline ? (
                      <button
                        onClick={handleContinue}
                        className="bg-purple hover:bg-purple text-white w-full mt-12"
                        style={{
                          fontSize: 15,
                          fontWeight: "400",
                          height: "52px",
                          borderRadius: "50px",
                        }}
                      >
                        Continue
                      </button>
                    ) : (
                      <button
                        disabled
                        // onClick={handleContinue}
                        className="bg-purple2 hover:bg-purple text-white w-full mt-12"
                        style={{
                          fontSize: 15,
                          fontWeight: "400",
                          height: "52px",
                          borderRadius: "50px",
                          color: "white",
                        }}
                      >
                        Continue
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        {currentIndex === 3 && (
          <div
            className="flex flex-col sm:justify-center justify-start"
            style={{ height: "" }}
          >
            <motion.div
              key="box4"
              custom={direction}
              variants={boxVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0 }}
              style={styles}
            >
              <div className="w-full flex sm:justify-center justify-start">
                <div className="w-full" //style={{ border: '2px solid red',  }}>
                >
                  <div className="flex flex-row w-full sm:w-9/12 justify-between items-center">
                    <button onClick={handleBack}>
                      <Image
                        src={"/assets/backarrow.png"}
                        alt="back"
                        height={14}
                        width={16}
                      />
                    </button>
                    <button
                      onClick={handleContinue}
                      style={{
                        fontWeight: '400',
                        fontFamily: 'inter',
                        fontSize: 15
                      }}>
                      Skip
                    </button>
                  </div>

                  <div>
                    <AiSocialLinks handleContinue={handleContinue} aiName={aiName} />
                  </div>

                  {/* <div className='w-10/12'>
                                        <Button onClick={handleTempContinue}
                                            className='bg-purple hover:bg-purple text-white w-full mt-12'
                                            style={{ fontSize: 15, fontWeight: "400", height: "52px", borderRadius: "50px" }}>
                                            Continue
                                        </Button>
                                    </div> */}
                </div>
              </div>
            </motion.div>
          </div>
        )}
        {/* {currentIndex === 4 && (
          <div
            className="flex flex-col h-screen sm:justify-center justify-start"
            style={{ height: "" }}
          >
            <motion.div
              key="box5"
              custom={direction}
              variants={boxVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0 }}
              style={styles}
            >
              <div className="w-full flex sm:justify-center justify-start">
                <div className="w-full">
                  <div className="flex flex-row w-full sm:w-10/12 justify-between items-center">
                    <button onClick={() => {
                      localStorage.removeItem('BuildaiIndex');
                      handleBack();
                    }}>
                      <Image
                        src={"/assets/backarrow.png"}
                        alt="back"
                        height={14}
                        width={16}
                      />
                    </button>
                    <button
                      onClick={handleContinue}
                      style={{
                        fontWeight: '400',
                        fontFamily: 'inter',
                        fontSize: 15
                      }}>
                      Skip
                    </button>
                  </div>

                  <div>
                    <SocialOAuth currentIndex={currentIndex} handleContinue={handleContinue} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )} */}
        {currentIndex === 4 && (
          <div
            className="flex flex-col sm:justify-center justify-start"
            style={{ height: "" }}
          >
            <motion.div
              key="box5"
              custom={direction}
              variants={boxVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0 }}
              style={styles}
            >
              <div className="w-full flex sm:justify-center justify-start">
                <div className="w-full">
                  <div className="w-full flex flex-row justify-between items-center">
                    <button onClick={handleBack}>
                      <Image
                        src={"/assets/backarrow.png"}
                        alt="back"
                        height={14}
                        width={16}
                      />
                    </button>
                    {
                      kbData ?
                        <button
                          onClick={handleContinue}
                          style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 15, }}>
                          Skip
                        </button> :
                        <button onClick={() => { setKnowledgeModal(true) }} className="bg-purple px-1 lg:px-2 px-1 py-1 sm:py-2 text-xs"// text-sm"
                          style={{ fontWeight: '400', fontFamily: 'inter', color: 'white', borderRadius: "50px" }}>
                          Add knowledge
                        </button>
                    }
                  </div>
                  <div
                    className="mt-6 flex flex-row w-full justify-between items-center"
                    style={{
                      fontSize: 24,
                      fontWeight: "600",
                      fontFamily: "inter",
                    }}
                  >
                    <div
                      // className="mt-6"
                      style={{
                        fontSize: 24,
                        fontWeight: "600",
                        fontFamily: "inter",
                      }}
                    >
                      Knowledge base
                    </div>
                  </div>
                  <Modal
                    open={knowledgeModal}
                    onClose={(() => setKnowledgeModal(false))}
                    closeAfterTransition
                    BackdropProps={{
                      timeout: 1000,
                      sx: {
                        backgroundColor: 'transparent',
                        backdropFilter: 'blur(30px)',
                      },
                    }} //style={{ backgroundColor: "red" }}
                  >
                    <Box className="lg:w-4/12 md:w-5/12 sm:w-7/12"
                      sx={styleLoginModal}
                    >
                      {/* <LoginModal creator={creator} assistantData={getAssistantData} closeForm={setOpenLoginModal} /> */}
                      <div className='flex flex-row justify-center'>
                        <Knowledgebase closeModal={handleCloseModal} getknowledgeData={getknowledgeData} />
                      </div>
                    </Box>
                  </Modal>
                  <div
                    className="text-lightWhite mt-2"
                    style={{
                      fontSize: 13,
                      fontWeight: "400",
                      fontFamily: "inter",
                    }}
                  >
                    Upload documents, paste plain text or a web url
                  </div>

                  <div className="mt-8">
                    {/* <Knowledgebase handleContinue={handleContinue} /> */}
                    <div style={{ maxHeight: "50vh", overflow: "auto", scrollbarWidth: "none" }}>
                      {
                        knowledgeData.map((item) => (
                          <div key={item.id} className='border-2 mt-8 p-4 rounded-lg' style={{borderColor: '#E6E6E6'}}>
                            <div className='flex flex-row w-full justify-between items-center'>
                              <div style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 13, color: '#303240' }}>
                                {item.type}
                              </div>
                              <div>
                                {
                                  delKBLoader === item.id ?
                                    <CircularProgress size={20} /> :
                                    <button
                                      onClick={() => handleDelAddedData(item.id)}
                                    >
                                      <Image src="/assets/delIcon.png" height={20} width={20} alt='del' />
                                    </button>
                                }
                              </div>
                            </div>
                            <div className='w-full' style={{
                              fontWeight: '400', fontFamily: 'inter',
                              fontSize: 15, color: '#000000',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}>
                              {item.content}
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>

                  <div className='w-full'>
                    {
                      kbData ?
                        <button onClick={() => { setKnowledgeModal(true) }}
                          className='bg-purple hover:bg-purple text-white w-full mt-12'
                          style={{ fontSize: 15, fontWeight: "400", height: "44px", borderRadius: "50px" }}>
                          Add knowledge
                        </button> :
                        <button onClick={handleContinue}
                          className='bg-purple hover:bg-purple text-white w-full mt-12'
                          style={{ fontSize: 15, fontWeight: "400", height: "44px", borderRadius: "50px" }}>
                          Continue
                        </button>
                    }
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        {currentIndex === 5 && (
          <div
            className="flex flex-col sm:justify-center justify-start"
            style={{ height: "" }}
          >
            <motion.div
              key="box6"
              custom={direction}
              variants={boxVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0 }}
              style={styles}
            >
              <div className="w-full flex justify-center">
                <div className="w-full flex flex-row items-center gap-4">
                  {/* <div style={{ height: "100%", width: "2px", backgroundColor: 'black' }} /> */}

                  <div>
                    <div className="flex flex-row w-full justify-between items-center">
                      <button onClick={handleBack}>
                        <Image
                          src={"/assets/backarrow.png"}
                          alt="back"
                          height={14}
                          width={16}
                        />
                      </button>
                      {
                        selectedAudios.length === 0 ?
                          <div>
                            {
                              skipLoader ?
                                <CircularProgress size={25} /> :
                                <button onClick={(event) => handleBuildAI(event)}>
                                  Skip
                                </button>
                            }
                          </div> : ''
                      }
                    </div>
                    <div
                      className="mt-6"
                      style={{
                        fontSize: 24,
                        fontWeight: "600",
                        fontFamily: "inter",
                      }}
                    >
                      Voice - Lets's clone your voice
                    </div>
                    <div
                      className="text-lightWhite mt-2"
                      style={{ fontSize: 13, fontWeight: "400" }}
                    >
                      Upload a high quality audio of your voice.<br />
                      For best results, upload at least 10 minutes of audio. Max 20MB (mp3, wave, mov)
                    </div>

                    <div className="mt-6">
                      Upload mp3, wave mov.
                    </div>

                    <div className="flex flex-col items-center mt-6">
                      <input
                        type="file"
                        // accept="audio/*"
                        accept="audio/*,.mov,.mp3,.wav, .mp4/*"
                        ref={fileInputRef}
                        onChange={handleAudioChange}
                        className="hidden"
                      />

                      {audioUrls.length > 0 && (
                        <div className="flex flex-col gap-4">
                          {audioUrls.map((audioUrl, index) => (
                            <div key={index} className="flex items-center gap-4">
                              <audio controls className="mb-">
                                <source src={audioUrl} type="audio/mpeg" />
                                Your browser does not support the audio element.
                              </audio>
                              <button onClick={() => handleRemoveAudio(index)}>
                                <Image src="/assets/croseBtn.png" alt="cross" height={30} width={30} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* {selectedAudios.length > 0 && (
                        <button onClick={handleSendApi} className="btn-send-api">
                          Send to API
                        </button>
                      )} */}


                      {/* {audioUrl && (
                        <div className="flex flex-row items-center gap-4">
                          <audio controls className="mb-">
                            <source src={audioUrl} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                          <div>
                            <button onClick={() => {
                              setAudioUrl(null);
                              setSelectedAudio(null);
                              if (fileInputRef.current) {
                                fileInputRef.current.value = '';
                              }
                            }}>
                              <Image src="/assets/croseBtn.png" alt="cross" height={30} width={30} />
                            </button>
                          </div>
                        </div>
                      )} */}
                    </div>

                    <div className="mt-6 flex flex-row items-center">
                      <div className="w-6/12">
                        {
                          uploadLoader ?
                            <div className="w-full flex flex-row justify-center">
                              <CircularProgress size={25} />
                            </div> :
                            <button
                              onClick={handleUploadClick}
                              className="bg-purple hover:bg-purple text-white w-full py-2"
                              style={{
                                fontSize: 15,
                                fontWeight: "400",
                                borderRadius: "50px",
                              }}
                            >
                              {
                                selectedAudios.length === 0 ? "Upload" : 'Upload more'
                              }
                            </button>
                        }
                      </div>

                    </div>

                    <div className="w-full flex flex-row justify-center">
                      {
                        selectedAudios.length === 0 ?
                          "" :
                          <div className="w-full">
                            {
                              buildAiLoader ? (
                                <div className="w-full flex justify-center mt-12">
                                  <CircularProgress size={30} />
                                </div>
                              ) : (
                                <button
                                  onClick={handleBuildAI}
                                  className="bg-purple hover:bg-purple text-white w-full mt-12 py-2"
                                  style={{
                                    fontSize: 15,
                                    fontWeight: "400",
                                    borderRadius: "50px",
                                  }}
                                >
                                  Continue
                                </button>
                              )}
                          </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        {currentIndex === 6 && (
          <div
            className="flex flex-col sm:justify-center justify-start"
            style={{ height: "" }}
          >
            <motion.div
              key="box7"
              custom={direction}
              variants={boxVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0 }}
              style={styles}
            >
              <div style={{ height: "auto" }}>
                <div style={{ height: 14 }}>
                  <button onClick={handleBack}>
                    <Image
                      src={"/assets/backarrow.png"}
                      alt="back"
                      height={14}
                      width={16}
                    />
                  </button>
                </div>
                {/* <Image src={'/assets/congratulations.png'} alt='congrats' height={445} width={445} /> */}
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: "600",
                    textAlign: " center",
                  }}
                >
                  Congratulations
                </div>
                <Image
                  src={"/congrats.png"}
                  alt="congrats"
                  height={550}
                  width={445}
                  layout="responsive"
                  objectFit="contain"
                // style={{
                //     aspectRatio: '3 / 2',
                //     maxWidth: '100%',
                //     height: 'auto'
                // }}
                />
                <div className="flex flex-row mt-6 justify-center w-full gap-1">
                  <button style={{ fontSize: 11, fontWeight: "400" }}>
                    Privacy policy -
                  </button>
                  <button style={{ fontSize: 11, fontWeight: "400" }}>
                    Terms & Condition -
                  </button>
                  <button style={{ fontSize: 11, fontWeight: "400" }}>
                    Cookie Policy
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {showBuildAiErr && (
        <div>
          <Snackbar
            open={showBuildAiErr}
            autoHideDuration={3000}
            onClose={() => setShowBuildAiErr(false)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            TransitionComponent={Fade}
            TransitionProps={{
              timeout: {
                enter: 2000,
                exit: 3000,
              },
            }}
            sx={{
              position: "fixed", // Ensures it stays in place
              top: 20, // Adjust as needed for spacing from the top
              left: "50%", // Center horizontally
              transform: "translateX(-50%)", // Center horizontally
            }}
          >
            <Alert
              // onClose={() => setShowBuildAiErr(false)}
              severity="error"
              sx={{
                width: "100%",
                backgroundColor: "white", // Set background color to white
                color: "black",
                border: "none",
              }}
            >
              <div>
                <div
                  style={{
                    color: "#FF543E",
                    fontWeight: "400",
                    fontSize: 11,
                    fontFamily: "inter",
                  }}
                >
                  Error
                </div>
                <div
                  style={{
                    color: "#000000",
                    fontWeight: "400",
                    fontSize: 13,
                    fontFamily: "inter",
                  }}
                >
                  Some thing went wrong try again to continue
                </div>
              </div>
            </Alert>
          </Snackbar>
        </div>
      )}
    </div>
  );
}
