import { Box, CircularProgress, Modal, Popover } from '@mui/material'
import { DotsThree } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'
import Apis from '@/components/apis/Apis';
import axios from 'axios';
import Image from 'next/image';

const FrameWorkAndTec = ({ recallApi, aiData }) => {

  //get framework
  const [frameWorkData, setFrameWorkData] = useState([]);
  const [frameworkanchorel, setFrameworkanchorel] = useState(null);
  const FrameworkPopoverId = frameworkanchorel ? 'simple-popover' : undefined;
  const [frameWorkLoader, setFrameWorkLoader] = useState(false);
  //add framework
  const [addFrameWorkModal, setAddFrameWorkModal] = useState(false);
  const [addFrameWorkTitle, setAddFrameWorkTitle] = useState("");
  const [addFrameWorkDescription, setAddFrameWorkDescription] = useState("");
  //update framework
  const [updateFrameWorkModal, setUpdateFrameWorkModal] = useState(false);
  const [updateFrameWorkTitle, setUpdateFrameWorkTitle] = useState("");
  const [updateFrameWorkDescription, setUpdateFrameWorkDescription] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);


  useEffect(() => {
    const localAiPersonaDetails = localStorage.getItem("aiPersonaDetails");
    if (localAiPersonaDetails) {
      const AiDetails = JSON.parse(localAiPersonaDetails);
      setFrameWorkData(AiDetails.frameworks);
      console.log("Aidetails recieved from local storage are", AiDetails);
    }
    // if (aiData) {
    //   setFrameWorkData(aiData.frameworks);
    // }
  }, []);

  const handleClose = () => {
    setFrameworkanchorel(null);
  };

  const handeFramerworkMoreClick = (event, item) => {
    setFrameworkanchorel(event.currentTarget);
    setSelectedItem(item);
    setUpdateFrameWorkDescription(item.description);
    setUpdateFrameWorkTitle(item.title);
  }

  //add Framework
  const handleAddFramWork = async () => {
    try {
      setFrameWorkLoader(true);
      const ApiPath = Apis.AddFrameWork;
      const localData = localStorage.getItem('User');
      const Data = JSON.parse(localData);
      const AuthToken = Data.data.token;
      console.log("Authtoken is", AuthToken);
      console.log("Apipath is", ApiPath);

      const ApiData = {
        title: addFrameWorkTitle,
        description: addFrameWorkDescription
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
          setAddFrameWorkModal(false);
          setAddFrameWorkDescription("");
          setAddFrameWorkTitle("");
          setFrameWorkData(response.data.data.frameworks);
          localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
        } else {
          console.log("Error occured")
        }
      }

    } catch (error) {
      console.error("ERR occured in add framework api is", error);
    } finally {
      setFrameWorkLoader(false);
    }
  }

  //delete Framework
  const handleDeleteteFrameWork = async () => {
    try {
      setFrameWorkLoader(true);
      const ApiPath = Apis.DeleteFrameWork;
      const localData = localStorage.getItem('User');
      const Data = JSON.parse(localData);
      const AuthToken = Data.data.token;
      console.log("Authtoken is", AuthToken);
      console.log("Apipath is", ApiPath);

      const ApiData = {
        id: selectedItem.id,
      }

      console.log("Data sendgin in api is", ApiData);

      const response = await axios.post(ApiPath, ApiData, {
        headers: {
          "Authorization": "Bearer " + AuthToken,
          "Content-Type": "application/json"
        }
      });
      if (response) {
        console.log("Response of del framwork and tec api is", response.data);
        if (response.data.status === true) {
          setFrameworkanchorel(null);
          setFrameWorkData(response.data.data.frameworks);
          localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
          // setFrameWorkData(frameWorks =>
          //   frameWorks.filter(preFrameWork => preFrameWork.id !== selectedItem.id)
          // )
        } else {
          console.log("Error occured")
        }
      }

    } catch (error) {
      console.error("ERR occured in del framwork api is", error);
    } finally {
      setFrameWorkLoader(false);
    }
  }

  //update Framework
  const handleUpdateFrameWork = async () => {
    try {
      setFrameWorkLoader(true);
      const ApiPath = Apis.UpdateFramWork;
      const localData = localStorage.getItem('User');
      const Data = JSON.parse(localData);
      const AuthToken = Data.data.token;
      console.log("Authtoken is", AuthToken);
      console.log("Apipath is", ApiPath);

      const ApiData = {
        id: selectedItem.id,
        title: updateFrameWorkTitle,
        description: updateFrameWorkDescription
      }

      console.log("Data sendgin in api is", ApiData);

      const response = await axios.post(ApiPath, ApiData, {
        headers: {
          "Authorization": "Bearer " + AuthToken,
          "Content-Type": "application/json"
        }
      });
      if (response) {
        console.log("Response of update framwork and tec api is", response.data);
        if (response.data.status === true) {
          setUpdateFrameWorkModal(false);
          setUpdateFrameWorkDescription("");
          setUpdateFrameWorkTitle("");
          setFrameworkanchorel(null);
          setFrameWorkData(response.data.data.frameworks);
          localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
        } else {
          console.log("Error occured")
        }
      }

    } catch (error) {
      console.error("ERR occured in update framwork api is", error);
    } finally {
      setFrameWorkLoader(false);
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

  return (
    <div>
      <div className='flex flex-row items-center w-full justify-between mt-12'>
        <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
          Framework & Techniques
        </div>
        <button
          className='text-purple underline'
          onClick={() => setAddFrameWorkModal(true)}
        >
          Add new
        </button>
      </div>

      {
        frameWorkData.length > 0 ?
          <div className='max-h-[50vh] overflow-auto scrollbar scrollbar-track-transparent scrollbar-thumb-purple scrollbar-thin'>
            {
              frameWorkData.map((item) => (
                <div key={item.id} className='flex flex-row items-start p-4 border border-[#00000010] mt-8 justify-between'>
                  <div>
                    <div>
                      {item.title}
                    </div>
                    <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                      {item.description}
                    </div>
                  </div>
                  <div>
                    <button className='-mt-2' aria-describedby={FrameworkPopoverId} variant="contained" color="primary" onClick={(event) => { handeFramerworkMoreClick(event, item) }}>
                      <DotsThree size={32} weight="bold" />
                    </button>
                    <Popover
                      id={FrameworkPopoverId}
                      open={Boolean(frameworkanchorel)}
                      anchorEl={frameworkanchorel}
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
                        <button className='text-purple' style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter" }}
                          onClick={() => { setUpdateFrameWorkModal(true) }}
                        >
                          Edit
                        </button>
                        {
                          frameWorkLoader ?
                            <CircularProgress style={{ marginTop: 8 }} size={15} /> :
                            <button style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter", marginTop: 8 }}
                              onClick={handleDeleteteFrameWork}
                            >
                              Delete
                            </button>
                        }
                      </div>
                    </Popover>
                  </div>
                </div>
              ))
            }
          </div> :
          <div className='text-xl font-bold text-center mt-8'>
            No Framework Added
          </div>
      }


      {/* Modal to add values */}
      <Modal
        open={addFrameWorkModal}
        onClose={() => setAddFrameWorkModal(false)}
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
                  <p>Add Framework & Techniques</p>
                  <button onClick={() => { setAddFrameWorkModal(false) }}>
                    <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                  </button>
                </div>
                <div className='mt-8 w-full'>
                  <div>
                    <input className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                      value={addFrameWorkTitle}
                      onChange={(e) => setAddFrameWorkTitle(e.target.value)}
                      placeholder='Title'
                      style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13 }}
                    />
                  </div>
                  <div className='mt-12'>
                    <textarea className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                      value={addFrameWorkDescription}
                      onChange={(e) => setAddFrameWorkDescription(e.target.value)}
                      placeholder='Description'
                      rows={4}
                      style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13, resize: "none" }}
                    />
                  </div>
                  {
                    frameWorkLoader ?
                      <div className='w-full flex flex-row justify-center' style={{ marginTop: 35 }}>
                        <CircularProgress size={25} />
                      </div> :
                      <button className='w-full py-2 text-white bg-purple ' style={{ borderRadius: "50px", marginTop: 35 }}
                        onClick={handleAddFramWork}>
                        Add
                      </button>
                  }
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>

      {/* Modal to add values */}
      <Modal
        open={updateFrameWorkModal}
        onClose={() => setUpdateFrameWorkModal(false)}
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
                  <p>Update Framework & Techniques</p>
                  <button onClick={() => { setUpdateFrameWorkModal(false) }}>
                    <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                  </button>
                </div>
                <div className='mt-8 w-full'>
                  <div>
                    <input className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                      value={updateFrameWorkTitle}
                      onChange={(e) => setUpdateFrameWorkTitle(e.target.value)}
                      placeholder='Title'
                      style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13 }}
                    />
                  </div>
                  <div className='mt-12'>
                    <textarea className='w-full p-2 rounded-lg bg-[#EDEDED80] outline-none border-none'
                      value={updateFrameWorkDescription}
                      onChange={(e) => setUpdateFrameWorkDescription(e.target.value)}
                      placeholder='Description'
                      rows={4}
                      style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13, resize: "none" }}
                    />
                  </div>
                  {
                    frameWorkLoader ?
                      <div className='w-full flex flex-row justify-center' style={{ marginTop: 35 }}>
                        <CircularProgress size={25} />
                      </div> :
                      <button className='w-full py-2 text-white bg-purple ' style={{ borderRadius: "50px", marginTop: 35 }}
                        onClick={handleUpdateFrameWork}>
                        Update
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

export default FrameWorkAndTec