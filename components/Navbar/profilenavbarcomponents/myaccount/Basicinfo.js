import React from 'react'
import Image from 'next/image'

const BasicInfo = () => {
    const styles = {
        inputContainer: {
            marginTop: 30,
            display: "flex",
            alignItems: "center",
            // backgroundColor: "#EDEDED", /* Light grey background */
            bordeRadius: 20, /* Rounded orners */
            padding: "8px 8px" /* Padding around input */

        },
        inputContainer2: {
            marginTop: 10,
            display: "flex",
            // backgroundColor: "#EDEDED40", /* Light grey background */
            bordeRadius: 5, /* Rounded orners */
            padding: "8px 8px" /* Padding around input */

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
            paddingTop: 8, paddingBottom: 8, paddingLeft: 5, paddingRight: 5, borderRadius: 5
        }
    }
    return (
        <div className='w-full flex flex-col'>
            <div className='w-4/12 flex flex-col mt-5'>

                <div className='w-full rounded bg-grayBg' style={styles.inputContainer}>
                    <input className='w-8/12' style={styles.input}
                        placeholder="voice.ai/name"
                    />
                    <button className='w-2/12'
                    // onClick={}
                    >
                        <div className='text-purple'>
                            Edit
                        </div>
                    </button>
                </div>

                <div className='w-full rounded bg-grayBg' style={styles.inputContainer}>
                    <input className='w-8/12' style={styles.input}
                        placeholder="tate@gmail.com"
                    />
                    <button className='w-2/12'
                    // onClick={}
                    >
                        <div className='text-purple'>
                            Edit
                        </div>
                    </button>
                </div>

                <div className='w-full rounded bg-grayBg' style={styles.inputContainer}>
                    <input className='w-8/12' style={styles.input}
                        placeholder="Phone number"
                    />
                    <button className='w-2/12'
                    // onClick={}
                    >
                        <div className='text-purple'>
                            Edit
                        </div>
                    </button>
                </div>

            </div>
            {/* ?\divider */}
            <div className='w-full bg-gray-100 h-0.5 mt-20'></div>

            <div style={{}}
                className='w-full flex flex-row justify-between pt-5'>

                <div className='w-4/12 flex flex-col items-start mt-3'
                    style={{ height: "45vh", overflow: "auto", scrollbarWidth: "none", msOverflowStyle: 'none', }}>
                    <div style={{ fontSize: 12, color: '#00000050' }}>
                        AI Name
                    </div>

                    <div className='w-full mt-2 bg-grayBg rounded' style={styles.inputContainer2}>
                        <input className='w-8/12' style={styles.input}
                            placeholder="Noah's ai"
                        />
                        <button className='w-2/12'
                        // onClick={}
                        >
                            <div className='text-purple'>
                                Edit
                            </div>
                        </button>
                    </div>


                    <div style={{ fontSize: 12, color: '#00000050', marginTop: 30 }}>
                        What does (name) do as a creator or influencer?
                    </div>

                    <div className='w-full mt-2 bg-grayBg rounded' style={styles.inputContainer2}>
                        <input className='w-8/12' style={styles.input}
                            placeholder="Content Creator"
                        />
                        <button className='w-2/12'
                        // onClick={}
                        >
                            <div className='text-purple'>
                                Edit
                            </div>
                        </button>
                    </div>


                    <div style={{ fontSize: 12, color: '#00000050', marginTop: 30 }}>
                        What does (name) help your community with?
                    </div>

                    <div className='w-full bg-grayBg flex  flex-row items-start mt-2 rounded' style={styles.inputContainer2}>
                        <textarea
                            className="w-8/12"
                            style={{
                                border: 'none',
                                outline: 'none',
                                backgroundColor: 'transparent',
                                flexGrow: 1, resize: 'none',
                                fontSize: '16px',
                                paddingLeft: '10px',
                                color: '#000',
                            }}
                            placeholder="Empowering creators and users to harness the power of AI through our AI prompt marketplace."
                            rows={3} // Adjust the number of rows to set the height of the textarea
                            multiple
                        />
                        <button className='w-2/12 self-start'
                        // onClick={}
                        >
                            <div className='text-purple'>
                                Edit
                            </div>
                        </button>
                    </div>

                    <div style={{ fontSize: 12, color: '#00000050', marginTop: 30 }}>
                        Do you sell any products or services that (name) can offer to qualified callers?
                    </div>
                    <div className='w-full mt-2 rounded bg-grayBg' style={styles.box}>
                        <div className='w-full flex flex-row justify-between '>
                            <div style={{ fontSize: 16, color: '#000' }}>
                                Mentorship
                            </div>
                            <button className='w-2/12 self-start'
                            // onClick={}
                            >
                                <div className='text-purple'>
                                    Edit
                                </div>
                            </button>
                        </div>
                        <div className='text-purple w-full mt-3'>
                            bit.me/htnao30r3xzlsipq
                        </div>
                    </div>

                    <div className='w-full mt-2 rounded bg-grayBg' style={styles.box}>
                        <div className='w-full flex flex-row justify-between '>
                            <div style={{ fontSize: 16, color: '#000' }}>
                                Course
                            </div>
                            <button className='w-2/12 self-start'
                            // onClick={}
                            >
                                <div className='text-purple mt-3'>
                                    Edit
                                </div>
                            </button>
                        </div>
                        <div className='text-purple'>
                            bit.me/htnao30r3xzlsipq
                        </div>
                    </div>
                    <div className='w-full mt-2 rounded bg-grayBg' style={styles.box}>
                        <div className='w-full flex flex-row justify-between '>
                            <div style={{ fontSize: 16, color: '#000' }}>
                                Consultation
                            </div>
                            <button className='w-2/12 self-start'
                            // onClick={}
                            >
                                <div className='text-purple'>
                                    Edit
                                </div>
                            </button>
                        </div>
                        <div className='text-purple mt-3'>
                            bit.me/htnao30r3xzlsipq
                        </div>
                    </div>
                </div>

                <div className='w-4/12 flex flex-col mt-3 mr-20 '
                    style={{ height: "45vh", overflow: "auto", scrollbarWidth: "none", msOverflowStyle: 'none', }}>

                    <div style={{ fontSize: 15, color: '#000' }}>Social Accounts</div>


                    <div className='flex flex-row gap-5 mt-5 mb-5'>
                        <Image style={styles.image}
                            src={'/assets/fbIcon.png'} alt='facebook'
                            height={30} width={30} />
                        <div className='bg-grayBg w-8/12' style={styles.button}>
                            <button style={{ color: '#000' }}>
                                Paste url
                            </button>

                        </div>
                    </div>

                    <div className='flex flex-row gap-5 mb-5'>
                        <Image style={styles.image}
                            src={'/assets/youtubeIcon.png'} alt='Youtube'
                            height={30} width={30} />
                        <div className='bg-grayBg w-8/12' style={styles.button}>
                            <button style={{ color: '#000' }}>
                                Paste url
                            </button>

                        </div>
                    </div>

                    <div className='flex flex-row gap-5 mb-5'>
                        <Image style={styles.image}
                            src={'/assets/icon.png'} alt='Icon'
                            height={30} width={30} />
                        <div className='bg-grayBg w-8/12' style={styles.button}>
                            <button style={{ color: '#000' }}>
                                Paste url
                            </button>

                        </div>
                    </div>

                    <div className='flex flex-row gap-5 mb-5'>
                        <Image style={styles.image}
                            src={'/assets/twiterIcon.png'} alt='twiter'
                            height={30} width={30} />
                        <div className='bg-grayBg w-8/12' style={styles.button}>
                            <button style={{ color: '#000' }}>
                                Paste url
                            </button>

                        </div>
                    </div>

                    <div className='flex flex-row gap-5 mb-5'>
                        <Image style={styles.image}
                            src={'/assets/tiktokIcon.png'} alt='tiktok'
                            height={30} width={30} />
                        <div className='bg-grayBg w-8/12' style={styles.button}>
                            <button style={{ color: '#000' }}>
                                Paste url
                            </button>

                        </div>
                    </div>

                    <div className='flex flex-row gap-5 mb-5'>
                        <Image style={styles.image}
                            src={'/assets/webIcon.png'} alt='web'
                            height={30} width={30} />
                        <div className='bg-grayBg w-8/12' style={styles.button}>
                            <button style={{ color: '#000' }}>
                                Paste url
                            </button>

                        </div>
                    </div>


                    <div style={{ fontSize: 12, color: '#00000050' }}>
                        Total Followers
                    </div>
                    <div className='w-10/12 mt-2 bg-grayBg rounded' style={styles.inputContainer2}>
                        <input className='w-full' style={styles.input}
                            placeholder="400k"
                        />
                        <button className='w-2/12'
                        // onClick={}
                        >
                            <div className='text-purple'>
                                Edit
                            </div>
                        </button>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default BasicInfo