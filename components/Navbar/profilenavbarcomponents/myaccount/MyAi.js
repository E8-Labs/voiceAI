import React from 'react'
import Image from 'next/image'

const MyAi = () => {
    const styles = {
        inputContainer: {
            marginTop: 30,
            display: "flex",
            alignItems: "center",
            // backgroundColor: "#EDEDED40", /* Light grey background */
            bordeRadius: 5, /* Rounded orners */
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
            backgroundColor: "#f5f5f5", /* Light grey background */
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

        <div style={{}}
            className='w-full flex flex-row justify-between pt-5'>
            <div className='w-4/12 flex flex-col items-start mt-3'>
                <div style={{ fontSize: 12, color: '#00000050', marginTop: 30 }}>
                    Greeting Text
                </div>

                <div className='w-full mt-2 bg-grayBg rounded' style={styles.inputContainer2}>
                    <input className='w-8/12' style={styles.input}
                        placeholder="Lorem ipsum"
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
                    What might users ask you about during the calls?
                </div>

                <div className='w-full bg-grayBg flex flex-row items-start mt-2 rounded' style={styles.inputContainer2}>
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
                        placeholder="Lorem ipsum dolor sit amet consectetur. Volutpat sit condimentum purus lorem. Praesent odio morbi sit sem risus habitant vitae. Neque aliquam risus gravida vivamus non. Suscipit ut sed elementum ullamcorper varius integer. Sit penatibus posuere."
                        rows={6} // Adjust the number of rows to set the height of the textarea
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
            </div>

            <div className='w-4/12 flex flex-col items-start mt-3 mr-20'>
                <div style={{ fontSize: 12, color: '#00000050', marginTop: 30 }}>
                    KYC - What would you like to know about your callers?
                </div>

                <div className='w-full bg-grayBg mt-2 rounded' style={styles.inputContainer2}>
                    <input className='w-8/12' style={styles.input}
                        placeholder="Name"
                    />
                    <div className='w-4/12flex items-center'>
                        <button
                        // onClick={}
                        >
                            <div className='text-purple'>
                                Edit
                            </div>
                        </button>
                    </div>
                </div>

                <div className='w-full bg-grayBg mt-2 rounded' style={styles.inputContainer2}>
                    <input className='w-8/12' style={styles.input}
                        placeholder="Age"
                    />
                    <div className='w-4/12flex flex-row gap-2 justify-center items-center'>

                        <button
                        // onClick={}
                        >
                            <div className='text-purple'>
                                Edit
                            </div>
                        </button>
                    </div>
                </div>

                <div className='w-full bg-grayBg mt-2 rounded' style={styles.inputContainer2}>
                    <input className='w-8/12' style={styles.input}
                        placeholder="Favorite quote"
                    />
                    <div className='w-4/12flex flex-row gap-2 justify-center items-center'>

                        <button
                        // onClick={}
                        >
                            <div className='text-purple'>
                                Edit
                            </div>
                        </button>
                    </div>
                </div>


                <div style={{ fontSize: 12, color: '#00000050', marginTop: 30 }}>
                    Conversation Goals
                </div>

                <div className='w-full bg-grayBg mt-2 rounded' style={styles.inputContainer2}>
                    <input className='w-8/12' style={styles.input}
                        placeholder="Sell Product"
                    />
                    <div className='w-4/12flex items-center'>
                        <button
                        // onClick={}
                        >
                            <div className='text-purple'>
                                Edit
                            </div>
                        </button>
                    </div>
                </div>
                <div style={{ fontSize: 12, color: '#00000050', marginTop: 30 }}>
                    Charge Per Minute
                </div>

                <div className='w-full bg-grayBg mt-2 rounded' style={styles.inputContainer2}>
                    <input className='w-8/12' style={styles.input}
                        placeholder="$10"
                    />
                    <div className='w-4/12flex items-center'>
                        <button
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

export default MyAi