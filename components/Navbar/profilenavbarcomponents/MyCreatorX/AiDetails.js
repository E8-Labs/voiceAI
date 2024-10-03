
import Apis from '@/components/apis/Apis';
import SliderSizes from '@/components/RangeSlider';
import { Box, CircularProgress, Slider } from '@mui/material';
import { CaretDown, CaretRight } from '@phosphor-icons/react';
import axios from 'axios';
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

export const AiDetails = () => {

  const valuesInputRef = useRef(null);
  const fileInputRef = useRef(null);

  //code for showing and hiding the questions
  const [interactionQuestions, setInterractionQuestions] = useState([
    {
      id: 1,
      title: "Question here",
      details: "Hello it is queston 1 how are you?"
    },
    {
      id: 2,
      title: "Another Question",
      details: "Hello it is queston 2 what is your name?"
    },
    {
      id: 3,
      title: "Another Question",
      details: "Hello it is queston 3 where are you from?"
    },
  ])
  const [interactionQuestionsDetails, setInteractionQuestionsDetails] = useState(null);
  const [aggressiveValue, setAggressiveValue] = useState("");
  const [politeValue, setPoliteValue] = useState("");
  const [humorValue, setHumorValue] = useState("");
  const [positiveValue, setPositiveValue] = useState("");
  const [showMoreObjectiveText, setShowMoreObjectiveText] = useState(false);
  const [callInstructions, setShowCallInstructions] = useState(false);
  const [showMoreInstruction, setshowMoreInstruction] = useState(false);
  const [aiData, setAiData] = useState(false);

  const [selectedAudio, setSelectedAudio] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [updateLoader, setUpdateLoader] = useState(false);

  //calling my AI api
  const getAiApi = async () => {
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
    if (response) {
      console.log("Response of getai api", response.data.data);
      if (response.data) {
        setAiData(response.data.data);
      }
    }
  }

  useEffect(() => {
    getAiApi()
  }, []);

  const handleInterRactionQuestionDetails = (id) => {
    setInteractionQuestionsDetails(interactionQuestionsDetails === id ? null : id);
  }

  useEffect(() => {
    console.log("Value slider", aggressiveValue);
  }, [aggressiveValue]);

  const getAiDetails = async () => {
    const localData = localStorage.getItem('User');
    if (localData) {
      const Data = JSON.parse(localData);
      const AuthToken = Data.data.token;
      console.log("Auth token is", AuthToken);
      const response = await axios.get(Apis.MyAiapi, {
        headers: {
          'Authorization': "bearer " + AuthToken,
          "Content-Type": "application/json"
        }
      });
      if (response) {
        console.log("Response of myAi api is", response)
      }
    } else {
      console.log("No user login")
    }
  }

  useEffect(() => {
    getAiDetails()
  }, [])

  const styles = {
    inputContainer: {
      marginTop: 30,
      display: "flex",
      alignItems: "center",
      backgroundColor: "#EDEDED40", /* Light grey background */
      borderRadius: 5, /* Rounded corners */
      padding: "8px 8px" /* Padding around input */
    },
    input: {
      border: 'none',
      outline: 'none',
      backgroundColor: '#EDEDED60',
      flexGrow: 1,
      fontSize: '16px',
      paddingLeft: '10px',
      color: '#000', // Ensure text is black
      padding: 10
    },
    inputContainer2: {
      marginTop: 10,
      display: "flex",
      backgroundColor: "#EDEDED40", /* Light grey background */
      bordeRadius: 5, /* Rounded orners */
      padding: "8px 8px" /* Padding around input */

    },
  }

  const handleAudioChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedAudio(file);
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      console.log("Selected audio file url is", url);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const updateAi = async () => {
    try {
      setUpdateLoader(true);
      const localData = localStorage.getItem('User');
      const Data = JSON.parse(localData);
      const AuthToken = Data.data.token;
      // console.log("Authtoken is", AuthToken);
      const ApiPath = Apis.BuildScript;
      const formData = new FormData();
      // formData.append('media', selectedAudio);
      formData.append('media', selectedAudio);
      console.log("Audio sending in api")
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      const response = await axios.post(ApiPath, formData, {
        headers: {
          "Authorization": "Bearer " + AuthToken,
          "Content-Type": "application/json"
        }
      });
      if (response) {
        console.log("Response of api is", response);
      }
    } catch (error) {
      console.error("Error occured in updateAI api is", error);
    } finally {
      setUpdateLoader(false);
    }
  }

  useEffect(() => {
    updateAi()
  }, [selectedAudio]);

  return (
    <div
      className='w-full flex flex-col p-15 pl-5'
      style={{ height: '90vh', overflow: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', marginTop: 20 }}
    >
      <div className='w-full'>
        <div className='w-full flex flex-row items-start gap-6'>
          <div className=' w-5/12 rounded-xl px-6 pb-4'
            style={{
              backgroundColor: '#ffffff50',
              height: "40vh",
              overflow: "auto", scrollbarWidth: "none"
            }}>
            <div className='mt-8'
              style={{ fontSize: 15, fontWeight: '700', fontFamily: 'inter' }}>
              Objective
            </div>
            <div className={`mt-4 ${showMoreObjectiveText ? 'line-clamp-none' : 'line-clamp-5'}`}>
              Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. Tincidunt pharetra quam ac viverra. Sit pellentesque faucibus non sit. Feugiat consequat ultrices erat est. Nulla.
              Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. Tincidunt pharetra quam ac viverra. Sit pellentesque faucibus non sit. Feugiat consequat ultrices erat est. Nulla.
              Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. Tincidunt pharetra quam ac viverra. Sit pellentesque faucibus non sit. Feugiat consequat ultrices erat est. Nulla.
            </div>
            <button className='mt-4 text-purple'
              onClick={() => { setShowMoreObjectiveText(!showMoreObjectiveText) }}
              style={{ fontSize: 15, fontWeight: '400', fontFamily: 'inter' }}
            >
              {showMoreObjectiveText ? "Read Less" : "Read More"}
            </button>
            {/* Code for the Voice user added */}

            <div className='mt-8'
              style={{ fontSize: 15, fontWeight: '700', fontFamily: 'inter' }}>
              My Voice
            </div>

            <div className='w-full flex flex-row gap-4 mt-2 items-center'>
              <div>
                <Image src='/assets/playIcon.png' alt='ply' height={32} width={32} />
              </div>
              <div className='w-11/12 flex flex-row justify-between items-center'>
                <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                  {audioUrl ?
                    <div>
                      {audioUrl}
                    </div> :
                    <div>
                      {aiData?.ai?.audio ? (
                        <div>
                          {
                            aiData.ai.audio
                          }
                        </div>
                      ) : "No audio"}
                    </div>
                  }

                </div>
                <div>
                  <input
                    type="file"
                    // accept="audio/*"
                    accept="audio/*,.mov,.mp3,.wav, .mp4/*"
                    ref={fileInputRef}
                    onChange={handleAudioChange}
                    className="hidden"
                  />
                  {
                    updateLoader ?
                      <CircularProgress size={20} /> :
                      <button onClick={handleUploadClick}
                        className='text-purple' style={{ fontSize: 13, fontWeight: '500', fontFamily: 'inter' }}>
                        Change
                      </button>
                  }
                </div>
              </div>
            </div>

          </div>
          {/*<div className='w-5/12 rounded-xl' style={{ backgroundColor: '#ffffff', }}>
            Box 2
                </div>*/}
          <div className='w-5/12 flex flex-col rounded-xl' style={{ backgroundColor: "#ffffff50" }}>
            <div className='p-5 flex flex-col shadow items-start  rounded-xl' style={{ backgroundColor: "", height: "40vh", overflow: "auto", scrollbarWidth: "none" }}>

              <div className='mt-3' style={{ fontSize: 15, fontWeight: '700', fontFamily: 'inter' }}>
                Call Instruction
              </div>
              <div className={`mt-4 ${showMoreInstruction ? 'line-clamp-none' : 'line-clamp-5'}`}>
                Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. Tincidunt pharetra quam ac viverra. Sit pellentesque faucibus non sit. Feugiat consequat ultrices erat est. Nulla.
                Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. Tincidunt pharetra quam ac viverra. Sit pellentesque faucibus non sit. Feugiat consequat ultrices erat est. Nulla.
                Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. Tincidunt pharetra quam ac viverra. Sit pellentesque faucibus non sit. Feugiat consequat ultrices erat est. Nulla.
              </div>
              <button
                onClick={() => { setshowMoreInstruction(!showMoreInstruction) }}
                className='mt-4 text-purple'
                style={{ fontSize: 15, fontWeight: '400', fontFamily: 'inter' }}>
                {
                  showMoreInstruction ? "Read Less" : "Read More"
                }
              </button>

              {/* <div style={{ fontSize: 20, fontWeight: "700", fontFamily: 'inter' }}>
                Test Your AI
              </div>

              <input
                className='w-full'
                style={styles.input}
                placeholder="Name"
              />

              <input
                className='w-full'
                style={styles.input}
                placeholder="Phone Number"
              />

              <button className='w-full py-3' style={{
                backgroundColor: '#552AFF', borderRadius: 5, color: 'white', marginTop: 25, borderRadius: "50px"
              }}
              // onClick={handleContinue}
              >
                Test AI
              </button> */}

            </div>
          </div>
        </div>

        <div className='w-full flex flex-row mt-4 mb-6 gap-6'>
          <div className='px-6 rounded-xl w-5/12 pb-4' style={{ backgroundColor: '#ffffff50', }}>
            <div className='mt-6' style={{ fontFamily: 'inter', fontSize: 15, fontWeight: '700' }}>
              Value & Beliefs
            </div>

            <div className='flex flex-row justify-between items-center' style={{ marginTop: 20 }}>
              <input
                ref={valuesInputRef}
                className='outline-none border-none'
                placeholder='Content goes here ...'
                style={{ backgroundColor: "transparent" }} />
              <button className='text-purple'
                onClick={() => {
                  if (valuesInputRef) {
                    valuesInputRef.current.focus()
                  }
                }}
                style={{ fontWeight: '400', fontSize: 13, fontFamily: "inter" }}>
                Edit
              </button>
            </div>

            <div className='mt-6' style={{ fontFamily: 'inter', fontSize: 15, fontWeight: '700' }}>
              Personality Trait
            </div>

            <div className='mt-3' style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 13 }}>
              Agressive
            </div>
            <div className='mt-2 w-full'>
              <Box className="w-full">
                <Slider
                  max={10}
                  min={1}
                  // defaultValue={5}
                  aria-label="Default"
                  valueLabelDisplay="on"
                  value={aggressiveValue}
                  onChange={(e) => setAggressiveValue(e.target.value)}
                  sx={{
                    color: 'blue',
                    '& .MuiSlider-valueLabel': {
                      top: '50px', // Move the value label below the slider
                      '& *': {
                        background: 'transparent', // Make the value label background transparent
                        color: '#000000', // Make the text color blue
                        boxShadow: "none",
                        border: "none"
                      },
                      backgroundColor: "transparent"
                    },
                  }}
                />
              </Box>
            </div>

            <div className='mt-3' style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 13 }}>
              Polite
            </div>
            <div className='mt-2'>
              <Box className="w-full">
                <Slider
                  max={10}
                  min={1}
                  // defaultValue={5}
                  aria-label="Default"
                  valueLabelDisplay="on"
                  value={politeValue}
                  onChange={(e) => setPoliteValue(e.target.value)}
                  sx={{
                    color: 'blue',
                    '& .MuiSlider-valueLabel': {
                      top: '50px', // Move the value label below the slider
                      '& *': {
                        background: 'transparent', // Make the value label background transparent
                        color: '#000000', // Make the text color blue
                        boxShadow: "none",
                        border: "none"
                      },
                      backgroundColor: "transparent"
                    },
                  }}
                />
              </Box>
            </div>

            <div className='mt-3' style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 13 }}>
              Positive
            </div>
            <div className='mt-2'>
              <Box className="w-full">
                <Slider
                  max={10}
                  min={1}
                  // defaultValue={5}
                  aria-label="Default"
                  valueLabelDisplay="on"
                  value={positiveValue}
                  onChange={(e) => setPositiveValue(e.target.value)}
                  sx={{
                    color: 'blue',
                    '& .MuiSlider-valueLabel': {
                      top: '50px', // Move the value label below the slider
                      '& *': {
                        background: 'transparent', // Make the value label background transparent
                        color: '#000000', // Make the text color blue
                        boxShadow: "none",
                        border: "none"
                      },
                      backgroundColor: "transparent"
                    },
                  }}
                />
              </Box>
            </div>

            <div className='mt-3' style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 13 }}>
              Humor
            </div>
            <div className='mt-2'>
              <Box className="w-full">
                <Slider
                  max={10}
                  min={1}
                  // defaultValue={5}
                  aria-label="Default"
                  valueLabelDisplay="on"
                  value={humorValue}
                  onChange={(e) => setHumorValue(e.target.value)}
                  sx={{
                    color: 'blue',
                    '& .MuiSlider-valueLabel': {
                      top: '50px', // Move the value label below the slider
                      '& *': {
                        background: 'transparent', // Make the value label background transparent
                        color: '#000000', // Make the text color blue
                        boxShadow: "none",
                        border: "none"
                      },
                      backgroundColor: "transparent"
                    },
                  }}
                />
              </Box>
            </div>

            <div className='mt-6' style={{ fontFamily: 'inter', fontSize: 15, fontWeight: '400' }}>
              Interaction Examples
            </div>

            {/* <div className={`mt-2 ${callInstructions ? 'line-clamp-none' : 'line-clamp-5'}`} style={{ fontWeight: '500', fontSize: 13, fontFamily: 'inter' }}>
              Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. Tincidunt pharetra quam ac viverra. Sit pellentesque faucibus non sit. Feugiat consequat ultrices erat est. Nulla.
              Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. Tincidunt pharetra quam ac viverra. Sit pellentesque faucibus non sit. Feugiat consequat ultrices erat est. Nulla.
              Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. Tincidunt pharetra quam ac viverra. Sit pellentesque faucibus non sit. Feugiat consequat ultrices erat est. Nulla.
            </div> */}

            {/* <button
              onClick={() => { setShowCallInstructions(!callInstructions) }}
              className='mt-4 text-purple'
              style={{ fontWeight: '500', fontFamily: 'inter' }}>
              Read More
            </button> */}


            {
              interactionQuestions.map((item) => (
                <div key={item.id}>
                  <div className='w-full flex flex-row items-center justify-between mt-4'>
                    <div style={{ fontFamily: 'inter', fontSize: 13, fontWeight: '500' }}>
                      {item.title}
                    </div>
                    <button onClick={() => handleInterRactionQuestionDetails(item.id)}>
                      {
                        interactionQuestionsDetails === item.id ?
                          <CaretDown size={20} /> :
                          <CaretRight size={20} />
                      }
                      {/*<Image alt='up' height={} width={} />*/}
                    </button>
                  </div>
                  {interactionQuestionsDetails === item.id &&
                    <div>
                      {item.details}
                    </div>
                  }
                </div>
              ))
            }

            <button className='mt-4 text-purple' style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 15 }}>
              Add More
            </button>

          </div>
          <div className='px-6 rounded-xl w-5/12 pb-4' style={{ backgroundColor: '#ffffff50', }}>
            <div className='mt-6' style={{ fontFamily: 'inter', fontSize: 15, fontWeight: '700' }}>
              Framework & Techniques
            </div>


            {
              interactionQuestions.map((item) => (
                <div key={item.id}>
                  <div className='w-full flex flex-row items-center justify-between mt-4'>
                    <div style={{ fontFamily: 'inter', fontSize: 13, fontWeight: '500' }}>
                      {item.title}
                    </div>
                    <button onClick={() => handleInterRactionQuestionDetails(item.id)}>
                      {
                        interactionQuestionsDetails === item.id ?
                          <CaretDown size={20} /> :
                          <CaretRight size={20} />
                      }
                      {/*<Image alt='up' height={} width={} />*/}
                    </button>
                  </div>
                  {interactionQuestionsDetails === item.id &&
                    <div>
                      {item.details}
                    </div>
                  }
                </div>
              ))
            }

            <button className='mt-4 text-purple' style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 15 }}>
              Add More
            </button>

            <div className='mt-6' style={{ fontFamily: 'inter', fontSize: 15, fontWeight: '400' }}>
              Expression examples
            </div>

            <div>
              <input
                className='w-full bg-transparent px-2 py-2 mt-4 outline-none border-none'
                placeholder='First expression here'
                style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 13, borderBottom: '2px solid #00000011', }} />
              <input
                className='w-full bg-transparent px-2 py-2 mt-4 outline-none border-none'
                placeholder='Second expression here'
                style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 13, borderBottom: '2px solid #00000011', }} />
              <button className='mt-4 text-purple' style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 15 }}>
                Add More
              </button>
            </div>

            <div className='mt-6' style={{ fontFamily: 'inter', fontSize: 15, fontWeight: '400' }}>
              Key Quotes
            </div>

            <div className='mt-4' style={{ fontFamily: 'inter', fontSize: 13, fontWeight: '400' }}>
              Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. Tincidunt pharetra quam ac viverra. Sit pellentesque faucibus non sit. Feugiat consequat ultrices erat est. Nulla.
            </div>
            <div className='w-full' style={{ height: "2px", backgroundColor: '#00000011', marginTop: 15 }} />

            <button className='mt-4 text-purple' style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 15 }}>
              Add More
            </button>

          </div>
        </div>

      </div>
    </div>

  )
}
