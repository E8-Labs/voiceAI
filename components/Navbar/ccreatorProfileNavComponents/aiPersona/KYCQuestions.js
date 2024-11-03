import Apis from '@/components/apis/Apis';
import { Alert, Box, CircularProgress, Fade, Modal, Popover, Snackbar } from '@mui/material';
import { DotsThree } from '@phosphor-icons/react';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const KYCQuestions = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const id = anchorEl ? 'simple-popover' : undefined;
  const [KYCLoader, setKYCLoader] = useState(false);
  const [SelectedItem, setSelectedItem] = useState(null);
  const [SuccessSnack, setSuccessSnack] = useState(null);
  const [ErrSnack, setErrSnack] = useState(null);


  const [KYCQuestionsList, setKYCQuestionsList] = useState([]);
  //code to add KYC Question
  const [AddKycModal, setAddKycModal] = useState(false);
  const [inputs, setInputs] = useState([
    { value: "", placeholder: "What is your name?", example1: "", example2: "", example3: "" },
    // { value: "", placeholder: "Where are you from?" },
  ]);
  const [openInputModal, setOpenInputModal] = useState(null);
  const [indexSelected, setIndexSelected] = useState(null);


  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index].value = event.target.value;
    setInputs(newInputs);
    //console.log(newInputs);
  };

  const handleExample1InputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index].example1 = event.target.value;
    setInputs(newInputs);
  };

  const handleExample2InputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index].example2 = event.target.value;
    setInputs(newInputs);
  };

  const handleExample3InputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index].example3 = event.target.value;
    setInputs(newInputs);
  };

  const addInputField = () => {
    setInputs([...inputs, { value: "", placeholder: "New Question", example1: "", example2: "", example3: "" }]);
  };

  const handleDeleteInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1); // Remove the input at the given index
    setInputs(newInputs);
    //console.log(newInputs);
  };

  const handleOpenInputModal = (item, index) => {
    console.log("Check 1 clear")
    console.log("Data settin in modal is", item, index)
    setOpenInputModal(item);
    setIndexSelected(index)
  }

  // const handleAddKYC = async () => {
  //   console.log("New kycs array is :-----", inputs)
  // }


  useEffect(() => {
    const localAiPersonaDetails = localStorage.getItem("aiPersonaDetails");
    if (localAiPersonaDetails) {
      const AiDetails = JSON.parse(localAiPersonaDetails);
      setKYCQuestionsList(AiDetails.questions);
      console.log("Aidetails recieved from local storage are", AiDetails);
    }
  }, []);

  const handleMoreClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
    console.log("Selected item is", item);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //code to update ai
  const handleUpdateAi = async () => {
    console.log("New kycs array is :-----", inputs)
    try {
      setKYCLoader(true);
      const localData = localStorage.getItem("User");
      if (localData) {
        const loginDetails = JSON.parse(localData);
        const Authtoken = loginDetails.data.token;
        const ApiPath = Apis.UpdateBuilAI;
        const formData = new FormData();

        inputs.forEach((row, index) => {
          formData.append(`kycQuestions[${index}][question]`, row.value);
          formData.append(`kycQuestions[${index}][example1]`, row.example1);
          formData.append(`kycQuestions[${index}][example2]`, row.example2);
          formData.append(`kycQuestions[${index}][example3]`, row.example3);
        });

        console.log("Data sending in update ai api is");
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }

        const response = await axios.post(ApiPath, formData, {
          headers: {
            "Authorization": "Bearer " + Authtoken,
          }
        });

        console.log("Api path is :----", ApiPath);
        // return
        if (response) {
          console.log("Response of update api is", response.data.data);
          if (response.data.status === true) {
            localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
            setSuccessSnack(response.data.message);
            setKYCQuestionsList(response.data.data.questions);
            setAddKycModal(false);
          } else if (response.data.status === false) {
            setErrSnack(response.data.message);
          }
        }

      } else {
        alert("Cannot Proceed!! No user logged in");
        return
      }
    }
    catch (error) {
      console.error("Error occured in update ai api is", error);
    }
    finally {
      setKYCLoader(false);
    }
  }


  //code to delete AI
  const handleDelKyc = async () => {
    try {
      setKYCLoader(true)
      const localData = localStorage.getItem("User");
      if (localData) {
        const loginDetails = JSON.parse(localData);
        const Authtoken = loginDetails.data.token;
        console.log("Auth token is", Authtoken);
        const ApiPath = Apis.DeleteKYC;
        console.log("Api path is", ApiPath);
        // const ApiData = {
        //   id: SelectedItem.id
        // }
        const formData = new FormData();
        formData.append("kycId", SelectedItem.id);
        console.log("Data sending in kyc del api is : --- ");
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }

        const response = await axios.post(ApiPath, formData, {
          headers: {
            "Authorization": "Bearer " + Authtoken,

          }
        });

        if (response) {
          console.log("Response of del lyc api is : --", response.data);
          if (response.data.status === true) {
            setSuccessSnack(response.data.message);
            handleClose();
            localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
            setKYCQuestionsList(response.data.data.questions);
          } else if (response.data.status === false) {
            setErrSnack(response.data.message);
            handleClose();
          }
        }

      }
    } catch (error) {
      console.error("Error occured in Del KYC Api is : ----", error);
    } finally {
      setKYCLoader(false);
    }
  }

  const styles = {
    text1: {
      fontWeight: "500",
      fontFamily: "inter",
      fontSize: 15
    },
    examplesModalStyle: {
      height: "auto",
      bgcolor: "transparent",
      // p: 2,
      mx: "auto",
      my: "50vh",
      transform: "translateY(-55%)",
      borderRadius: 2,
      border: "none",
      outline: "none",
    },
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
    },
    inputContainer: {
      marginTop: 15,
      // display: "flex",
      // alignItems: "center",
      backgroundColor: "#EDEDED29", //EDEDED29 /* Light grey background */
      bordeRadius: 20 /* Rounded corners */,
      padding: "10px 10px" /* Padding around input */,
      display: "flex",
      alignItems: "center",
      marginBottom: "8px",
    },
  }

  return (
    <div>
      <div className='flex flex-row items-center justify-between'>
        <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
          <span style={{ color: "#00000060" }}>Call Strategy |</span> KYC Questions
        </div>
        <button className='text-purple underline' onClick={() => { setAddKycModal(true) }}>
          Add New
        </button>
      </div>

      <div className='max-h-[70vh] overflow-auto'>
        {
          KYCQuestionsList.map((item, index) => (
            <div key={item.id} className='flex flex-col items-center w-full mt-8'>
              <div className='flex flex-row items-center p-4 border-[1px] border-[#00000010] w-full justify-between rounded-lg'>
                <div className='w-full flex flex-row items-center'>
                  <div style={{ width: "10%" }}>
                    <div className='text-white bg-purple flex flex-row items-center justify-center p-0 m-0'
                      style={{
                        borderRadius: "50%",
                        height: "30px",
                        width: "30px",
                        fontSize: 15,
                        resize: "contain"
                      }}>
                      {index + 1}
                    </div>
                  </div>
                  <div style={{ ...styles.text1, width: "90%" }}>
                    {item.question}
                  </div>
                </div>
                <div>
                  <button aria-describedby={id} variant="contained" color="primary" onClick={(event) => { handleMoreClick(event, item) }}>
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
                      <button className='text-purple' style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter" }}>
                        Edit
                      </button>
                      {
                        KYCLoader ?
                          <CircularProgress size={15} /> :
                          <button style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter", marginTop: 8 }} onClick={handleDelKyc}>
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

      </div>

      {/* Code to add CallStrategy */}
      <Modal
        open={AddKycModal}
        onClose={() => setAddKycModal(false)}
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
                  <p>Add KycModal Strategy</p>
                  <button onClick={() => { setAddKycModal(false) }}>
                    <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                  </button>
                </div>
                <div className='mt-8 w-full'>
                  {/* Inputs here */}
                  {inputs.map((input, index) => (
                    <div
                      key={index}
                      // style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
                      style={styles.inputContainer}
                      className="flex -flex-row justify-between items-center rounded-lg"
                    >
                      {/* <input
                        className="w-full bg-transparent border-none outline-none"
                        type="text"
                        value={input.value}
                        // autoFocus={index ? true : ""}
                        // autoFocus={true}
                        onChange={(e) => handleInputChange(index, e)}
                        placeholder={input.placeholder}
                        style={{
                          marginRight: "8px",
                          fontSize: 13,
                          fontWeight: "400",
                          fontFamily: "inter",
                        }}
                      /> */}
                      <button className="border-none outline-none" onClick={() => { handleOpenInputModal(input, index) }}>
                        {
                          input.value ?
                            <div>
                              {input.value}
                            </div> :
                            <div>
                              {input.placeholder}
                            </div>
                        }
                      </button>
                      <button onClick={() => { handleDeleteInput(index) }}>
                        <Image
                          src="/assets/croseBtn.png"
                          alt="cross"
                          height={20}
                          width={20}
                        />
                      </button>
                    </div>
                  )
                  )}
                  {/* Modal to update donnot */}
                  <Modal
                    open={openInputModal}
                    onClose={() => setOpenInputModal(null)}
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
                            <div className='flex flex-row items-center justify-between p-2' style={{ fontWeight: '500', fontFamily: "inter", fontSize: 20 }}>
                              {/* <p /> */}
                              <p>Add KYC Question</p>
                              <button onClick={() => { setOpenInputModal(null) }}
                              >
                                <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                              </button>
                            </div>
                            <div>
                              {/* {indexSelected} */}
                              <input
                                className="w-full bg-transparent border p-2 rounded outline-none"
                                type="text"
                                value={openInputModal?.value}
                                // autoFocus={index ? true : ""}
                                // autoFocus={true}
                                onChange={(e) => handleInputChange(indexSelected, e)}
                                placeholder={openInputModal?.placeholder}
                                style={{
                                  marginRight: "8px",
                                  fontSize: 13,
                                  fontWeight: "400",
                                  fontFamily: "inter",
                                }}
                              />
                            </div>
                            <div className="mt-2">
                              <input
                                className='border-2'
                                placeholder={openInputModal?.example1}
                                value={openInputModal?.example1}
                                onChange={(e) => handleExample1InputChange(indexSelected, e)}
                              />
                            </div>
                            <div>
                              <input
                                className='border-2'
                                placeholder={openInputModal?.example2}
                                value={openInputModal?.example2}
                                onChange={(e) => handleExample2InputChange(indexSelected, e)}
                              />
                            </div>
                            <div>
                              <input
                                className='border-2'
                                placeholder={openInputModal?.example3}
                                value={openInputModal?.example3}
                                onChange={(e) => handleExample3InputChange(indexSelected, e)}
                              />
                            </div>
                            <div className="mt-4 w-full flex flex-row justify-end">
                              <button className="bg-purple text-white px-3 py-1"
                                onClick={() => { setOpenInputModal(false) }}
                                style={{
                                  borderRadius: "20px"
                                }}
                              >
                                Done
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Box>
                  </Modal>
                </div>
                {inputs.length < 10 && (
                  <button
                    onClick={addInputField}
                    className="text-purple mt-4 outline-none border-none"
                    style={{ textDecoration: "underline" }}
                  >
                    New Question
                  </button>
                )}
                <div>
                  {
                    KYCLoader ?
                      <div className='w-full flex flex-row justify-center mt-8'>
                        <CircularProgress size={25} />
                      </div> :
                      <button className='bg-purple text-white w-full mt-8'
                        style={{ height: "48px", borderRadius: "50px" }}
                        onClick={handleUpdateAi}
                      >
                        Add
                      </button>
                  }
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>


      <div>
        <Snackbar
          open={SuccessSnack}
          autoHideDuration={3000}
          onClose={() => {
            setSuccessSnack(null);
          }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          TransitionComponent={Fade}
          TransitionProps={{
            direction: 'center'
          }}
        >
          <Alert
            onClose={() => {
              setSuccessSnack(null)
            }} severity="success"
            // className='bg-purple rounded-lg text-white'
            sx={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}
          >
            {SuccessSnack}
          </Alert>
        </Snackbar>
      </div>

      <div>
        <Snackbar
          open={ErrSnack}
          autoHideDuration={3000}
          onClose={() => {
            setErrSnack(null);
          }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          TransitionComponent={Fade}
          TransitionProps={{
            direction: 'center'
          }}
        >
          <Alert
            onClose={() => {
              setErrSnack(null)
            }} severity="success"
            // className='bg-purple rounded-lg text-white'
            sx={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}
          >
            {ErrSnack}
          </Alert>
        </Snackbar>
      </div>

    </div>
  )
}

export default KYCQuestions;
