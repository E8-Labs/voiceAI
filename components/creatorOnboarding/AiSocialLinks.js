import Image from 'next/image'
import React, { useState } from 'react'
import { TextField } from '@mui/material'

function AiSocialLinks({ handleContinue, handleBack }) {

    const [text, setText] = useState("");

    const styles = {
        image: {
            resize: "cover", objectFit: "contain"
        },
        button: {
            paddingTop: 8, paddingBottom: 8, paddingLeft: 5, paddingRight: 5, borderRadius: 5
        },
        buttonFont: {
            fontWeight: "400",
            fontSize: 13,
            fontFamily: "inter"
        }
    }

    return (
        <div className='w-full flex flex-col justify-center items-center'style={{}} >
            <div className='w-full'>
                <div className='text-gray-400 text-sm mt-3 mb-10 mb-5 w-11/12'>
                    This is used as your knowledge base to train your ai model.
                </div>
                <div className='flex flex-row gap-5 mb-5'>
                    <Image style={styles.image}
                        src={'/assets/fbIcon.png'} alt='facebook'
                        height={30} width={30} />
                    <div className='bg-grayBg w-8/12' style={styles.button}>
                        <button style={styles.buttonFont}>
                            Paste url
                        </button>

                    </div>
                </div>

                <div className='flex flex-row gap-5 mb-5'>
                    <Image style={styles.image}
                        src={'/assets/youtubeIcon.png'} alt='Youtube'
                        height={30} width={30} />
                    <div className='bg-grayBg w-8/12' style={styles.button}>
                        <button style={styles.buttonFont}>
                            Paste url
                        </button>

                    </div>
                </div>

                <div className='flex flex-row gap-5 mb-5'>
                    <Image style={styles.image}
                        src={'/assets/icon.png'} alt='Icon'
                        height={30} width={30} />
                    <div className='bg-grayBg w-8/12' style={styles.button}>
                        <button style={styles.buttonFont}>
                            Paste url
                        </button>

                    </div>
                </div>

                <div className='flex flex-row gap-5 mb-5'>
                    <Image style={styles.image}
                        src={'/assets/twiterIcon.png'} alt='twiter'
                        height={30} width={30} />
                    <div className='bg-grayBg w-8/12' style={styles.button}>
                        <button style={styles.buttonFont}>
                            Paste url
                        </button>

                    </div>
                </div>

                <div className='flex flex-row gap-5 mb-5'>
                    <Image style={styles.image}
                        src={'/assets/tiktokIcon.png'} alt='tiktok'
                        height={30} width={30} />
                    <div className='bg-grayBg w-8/12' style={styles.button}>
                        <button style={styles.buttonFont}>
                            Paste url
                        </button>

                    </div>
                </div>

                <div className='flex flex-row gap-5 mb-5'>
                    <Image style={styles.image}
                        src={'/assets/instagram.png'} alt='web'
                        height={30} width={30} />
                    <div className='bg-grayBg w-8/12' style={styles.button}>
                        <button style={styles.buttonFont}>
                            Paste url
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AiSocialLinks