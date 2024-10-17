import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Apis from '@/components/apis/Apis'
import axios from 'axios'
import SocialOAuth from '@/components/creatorOnboarding/SocialOAuth'
import { AppleLogo, ApplePodcastsLogo, FacebookLogo, InstagramLogo, SpotifyLogo, XLogo, YoutubeLogo } from '@phosphor-icons/react'
import { Box, CircularProgress, Modal } from '@mui/material'
import Knowledgebase from '@/components/buildai/Knowledgebase'

export const SocialKB = () => {

  const [aiData, setAiData] = useState(null);
  const [fbUrl, setFburl] = useState("");
  const [youtubeUrl, setYoutubeurl] = useState("");
  const [appleProducts, setAppleProducts] = useState("");
  const [twitterUrl, setTwitterurl] = useState("");
  const [spotifyurl, setSpotifyurl] = useState("");
  const [instaUrl, setInstaurl] = useState("");
  const [showKbPopup, setKbPopup] = useState(false);
  const [knowledgeData, setKnowledgeData] = useState([]);
  const [delKBLoader, setDelKBLoader] = useState(null);

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
      console.log("Response of getai api", response.data);
      if (response.data) {
        setAiData(response.data.data);
        if (response.data.data.ai) {
          if (response.data.data.ai.fbUrl) {
            setFburl(response.data.data.ai.fbUrl);
          }
          if (response.data.data.ai.youtubeUrl) {
            setYoutubeurl(response.data.data.ai.youtubeUrl);
          }
          if (response.data.data.ai.twitterUrl) {
            setTwitterurl(response.data.data.ai.twitterUrl);
          }
          if (response.data.data.ai.discordUrl) {
            setAppleProducts(response.data.data.ai.discordUrl);
          }
          if (response.data.data.ai.spotify_Url) {
            setSpotifyurl(response.data.data.ai.spotify_Url);
          }
          if (response.data.data.ai.instaUrl) {
            setInstaurl(response.data.data.ai.instaUrl);
          }
        }
        setKnowledgeData(response.data.data.kb)
        //can be useful to show no data msg
        // if (response.data.data.kb.length > 0) {
        //   setkbData(false);
        // } else {
        //   setkbData(true);
        // }
      }
    }
  }

  useEffect(() => {
    getAiApi()
  }, []);

  //kb popup close
  const handleCloseModal = (status) => {
    setKbPopup(status)
  }

  const getknowledgeData = (data) => {
    getAiApi();
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
            getAiApi();
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

  const styles = {
    inputContainer: {
      marginTop: 30,
      display: "flex",
      alignItems: "center",
      backgroundColor: "red", /* Light grey background */
      bordeRadius: 5, /* Rounded orners */
      padding: "8px 8px" /* Padding around input */

    },
    inputContainer2: {
      marginTop: 10,
      display: "flex",
      backgroundColor: "transparent", /* Light grey background */
    },
    input: {
      border: 'none',
      outline: 'none',
      backgroundColor: 'transparent',
      flexGrow: 1,
      fontSize: '16px',
      paddingLeft: '10px',
      color: '#000', // Ensure text is black
    },
    box: {
      marginTop: 10,
      alignItems: "center",
      // backgroundColor: "#f5f5f5", /* Light grey background */
      bordeRadius: 20, /* Rounded orners */
      padding: "8px 8px" /* Padding around input */

    },
    image: {
      resize: "cover", objectFit: "contain"
    },
    button: {
      paddingTop: 6, paddingBottom: 8, paddingLeft: 8, paddingRight: 8, borderRadius: 5
    }
  }

  const kbPopupStyle = {
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


  return (
    <div
      className='w-full flex flex-col p-15 pl-5 '
      style={{ height: '90vh', overflow: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', marginTop: 20 }}
    >

      <div className='flex flex-row gap-6 w-full'>

        <div className='w-4/12 px-8 py-4 rounded-2xl' style={{ backgroundColor: "#ffffff40" }}>
          <div className='mt-1' style={{ fontSize: 15, fontWeight: 700, fontFamily: "inter" }}>
            URL Links
          </div>

          <div className='flex flex-col gap-4'>
            <div className='flex flex-row gap-5 mt-7 items-center'>
              <FacebookLogo size={25} />
              <div className='bg-transparent w-full flex flex-row justify-between gap-2'
                style={styles.button}
              >
                <div className='w-full'>
                  <input className='w-full bg-transparent outline-none border-none'
                    value={fbUrl}
                    onChange={(e) => setFburl(e.target.value)}
                    placeholder='URL' />
                </div>

              </div>
            </div>

            <div className='flex flex-row gap-5 items-center'>
              <YoutubeLogo size={25} />
              <div className='bg-transparent w-full flex flex-row justify-between gap-2'
                style={styles.button}
              >
                <div className='w-full'>
                  <input className='w-full bg-transparent outline-none border-none'
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeurl(e.target.value)}
                    placeholder='URL' />
                </div>

              </div>
            </div>

            <div className='flex flex-row gap-5 items-center'>
              <XLogo size={25} />
              <div className='bg-transparent w-full flex flex-row justify-between gap-2'
                style={styles.button}
              >
                <div className='w-full'>
                  <input className='w-full bg-transparent outline-none border-none'
                    value={twitterUrl}
                    onChange={(e) => setTwitterurl(e.target.value)}
                    placeholder='URL' />
                </div>

              </div>
            </div>

            <div className='flex flex-row gap-5 items-center'>
              <ApplePodcastsLogo size={25} />
              <div className='bg-transparent w-full flex flex-row justify-between gap-2'
                style={styles.button}
              >
                <div className='w-full'>
                  <input className='w-full bg-transparent outline-none border-none'
                    value={appleProducts}
                    onChange={(e) => setAppleProducts(e.target.value)}
                    placeholder='URL' />
                </div>

              </div>
            </div>

            <div className='flex flex-row items-center gap-5'>
              <SpotifyLogo size={25} />
              <div className='bg-transparent w-full flex flex-row justify-between gap-2'
                style={styles.button}
              >
                <div className='w-full'>
                  <input className='w-full bg-transparent outline-none border-none'
                    value={spotifyurl}
                    onChange={(e) => setSpotifyurl(e.target.value)}
                    placeholder='URL' />
                </div>

              </div>
            </div>

            <div className='flex flex-row gap-5 mb-5 items-center'>
              <InstagramLogo size={25} />
              <div className='bg-transparent w-full flex flex-row justify-between gap-2'
                style={styles.button}
              >
                <div className='w-full'>
                  <input className='w-full bg-transparent outline-none border-none'
                    value={instaUrl}
                    onChange={(e) => setInstaurl(e.target.value)}
                    placeholder='URL' />
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className='w-5/12 px-8 py-4 rounded-2xl' style={{ backgroundColor: "#ffffff40" }}>
          <SocialOAuth />
        </div>

        {/* <div className='w-5/12 px-8 py-4 rounded-2xl' style={{ backgroundColor: "#ffffff40" }}>
          <div className='mt-4' style={{ fontSize: 24, fontWeight: 300 }}>
            O Auth
          </div>

          <div>
            <div className='flex flex-row gap-5 mt-5 mb-5'>
              <Image style={styles.image}
                src={'/assets/fbIcon.png'} alt='facebook'
                height={30} width={30} />
              <div className='bg-transparent w-full flex flex-row justify-between gap-2'
                style={styles.button}
              >
                <div className='w-full' style={{ fontSize: 15, fontWeight: "400", fontFamily: "inter" }}>
                  Facebook
                </div>
                <button className='text-white px-4 py-2 bg-purple' style={{ fontWeight: "400", fontSize: 15, fontFamily: "inter", borderRadius: "50px" }}>
                  Connect
                </button>

              </div>
            </div>

            <div className='flex flex-row gap-5 mb-5'>
              <Image style={styles.image}
                src={'/assets/youtubeIcon.png'} alt='Youtube'
                height={30} width={30} />
              <div className='bg-transparent w-full flex flex-row justify-between gap-2'
                style={styles.button}
              >
                <div className='w-full' style={{ fontSize: 15, fontWeight: "400", fontFamily: "inter" }}>
                  Youtube
                </div>
                <button className='text-white px-4 py-2 bg-purple' style={{ fontWeight: "400", fontSize: 15, fontFamily: "inter", borderRadius: "50px" }}>
                  Connect
                </button>

              </div>
            </div>

            <div className='flex flex-row gap-5 mb-5'>
              <Image style={styles.image}
                src={'/assets/twiterIcon.png'} alt='Icon'
                height={30} width={30} />
              <div className='bg-transparent w-full flex flex-row justify-between gap-2'
                style={styles.button}
              >
                <div className='w-full' style={{ fontSize: 15, fontWeight: "400", fontFamily: "inter" }}>
                  X (Formerly Twitter)
                </div>
                <button className='text-white px-4 py-2 bg-purple' style={{ fontWeight: "400", fontSize: 15, fontFamily: "inter", borderRadius: "50px" }}>
                  Connect
                </button>

              </div>
            </div>

            <div className='flex flex-row gap-5 mb-5'>
              <Image style={styles.image}
                src={'/assets/appleProducts.png'} alt='appleProducts'
                height={30} width={30} />
              <div className='bg-transparent w-full flex flex-row justify-between gap-2'
                style={styles.button}
              >
                <div className='w-full' style={{ fontSize: 15, fontWeight: "400", fontFamily: "inter" }}>
                  Apple Podcast
                </div>
                <button className='text-white px-4 py-2 bg-purple' style={{ fontWeight: "400", fontSize: 15, fontFamily: "inter", borderRadius: "50px" }}>
                  Connect
                </button>

              </div>
            </div>

            <div className='flex flex-row gap-5 mb-5'>
              <Image style={styles.image}
                src={'/assets/spotify.png'} alt='spotifyIcon'
                height={30} width={30} />
              <div className='bg-transparent w-full flex flex-row justify-between gap-2'
                style={styles.button}
              >
                <div className='w-full' style={{ fontSize: 15, fontWeight: "400", fontFamily: "inter" }}>
                  Spotify Podcast
                </div>
                <button className='text-white px-4 py-2 bg-purple' style={{ fontWeight: "400", fontSize: 15, fontFamily: "inter", borderRadius: "50px" }}>
                  Connect
                </button>

              </div>
            </div>

            <div className='flex flex-row gap-5 mb-5'>
              <Image style={styles.image}
                src={'/assets/instagram.png'} alt='insta'
                height={30} width={30} />
              <div className='bg-transparent w-full flex flex-row justify-between gap-2'
                style={styles.button}
              >
                <div className='w-full' style={{ fontSize: 15, fontWeight: "400", fontFamily: "inter" }}>
                  Instagram
                </div>
                <button className='text-white px-4 py-2 bg-purple' style={{ fontWeight: "400", fontSize: 15, fontFamily: "inter", borderRadius: "50px" }}>
                  Connect
                </button>

              </div>
            </div>
          </div>
        </div> */}

      </div>
      <div className='w-4/12 mt-4 px-6 rounded-2xl flex flex-col mb-12' style={{ backgroundColor: "#ffffff40" }}>

        <div>
          <Modal
            open={showKbPopup}
            onClose={(() => setKbPopup(false))}
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
              sx={kbPopupStyle}
            >
              <div className='flex flex-row justify-center'>
                <Knowledgebase closeModal={handleCloseModal} getknowledgeData={getknowledgeData} />
              </div>
            </Box>
          </Modal>
        </div>

        <div className='flex flex-row justify-between items-center' style={{ marginTop: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "inter" }}>
            Knowledge Base
          </div>
          <button className='text-purple underline self-start outline-none border-none' onClick={() => { setKbPopup(true) }}>
            Add New
          </button>
        </div>

        <div className='w-full flex flex-col '>
          <div style={{ fontSize: 12, fontWeight: 300, color: '#00000060', marginTop: 20 }}>
            Sell a Product
          </div>

          <div className='w-full bg-transparent flex  flex-row items-start mt-2 rounded'
            style={styles.inputContainer2}
          >
            <textarea
              className="w-full"
              style={{
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                flexGrow: 1, resize: 'none',
                fontSize: '14px',
                paddingLeft: '5px',
                color: '#000',
              }}
              placeholder="Lorem ipsum dolor sit amet consectetur. Volutpat sit condimentum purus lorem. Praesent odio morbi sit sem risus habitant vitae. Neque aliquam risus gravida vivamus non. Suscipit ut sed elementum ullamcorper varius integer. Sit penatibus posuere."
              rows={4} // Adjust the number of rows to set the height of the textarea
              multiple
            />
            {/* <button className='w-2/12 self-start'>
              <div className='text-purple'>
                Edit
              </div>
            </button> */}
          </div>

          <div className='w-full flex flex-col gap-5'>

            <div
              className='overflow-y-auto scrollbar scrollbar-thumb-purple scrollbar-track-transparent scrollbar-thin'
              style={{ maxHeight: "50vh", overflow: "auto", scrollbarWidth: "none", paddingBottom: 20 }}>
              {
                knowledgeData.map((item) => (
                  <div key={item.id} className='mt-6 rounded-lg' style={{ borderColor: '' }}>
                    <div className='flex flex-row w-full justify-between items-center'>
                      {/* <div style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 13, color: '#303240' }}>
                        {item.type}
                      </div> */}
                      <div className='w-full' style={{
                        fontWeight: '400', fontFamily: 'inter',
                        fontSize: 15, color: '#000000',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis', textDecoration: 'underline'
                      }}>
                        {item.documentUrl ?
                          (
                            <button
                              className='overflow-x-auto scrollbar scrollbar-thumb-purple scrollbar-track-transparent scrollbar-thin'
                              onClick={() => {
                                let path = item.documentUrl
                                window.open(path, "_blank")
                              }} style={{ width: "90%", border: "", overflowX: "auto" }}>
                              {item.documentUrl}
                            </button>
                          ) : (
                            <button
                              className='text-start underline'
                              onClick={() => {
                                let path = item.content
                                window.open(path, "_blank")
                              }}>
                              {item.content}
                            </button>
                          )}
                      </div>
                      <div className='flex flex-row gap-4 items-center'>
                        <button className='text-purple' style={{ fontWeight: "400", fontSize: 13, fontFamily: "inter" }}>
                          Edit
                        </button>
                        {
                          delKBLoader === item.id ?
                            <CircularProgress size={20} /> :
                            <button className='text-red' style={{ fontWeight: "400", fontSize: 13, fontFamily: "inter" }}
                              onClick={() => handleDelAddedData(item.id)}
                            >
                              {/* <Image src="/assets/delIcon.png" height={20} width={20} alt='del' /> */}
                              Delete
                            </button>
                        }
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
