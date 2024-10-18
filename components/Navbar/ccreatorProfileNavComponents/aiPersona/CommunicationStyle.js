import React, { useState } from 'react'

const CommunicationStyle = () => {

    const menuItems = [
        {
            id: 1,
            title: "Direct",
            description: "Think of equity as the portion of the house you truly own, it’s like having a slice of the real estate pie"
        },
        {
            id: 2,
            title: "Blunt",
            description: "Let's break down the closing process step by step, so you know exactly what to expect"
        },
        {
            id: 3,
            title: "Sarcastic",
            description: "I can share some articles and videos that explains this concept in easy-to-understand terms"
        },
        {
            id: 4,
            title: "Encouraging",
            description: "Let me draw this out for you. so it’s easier to understand how the mortgage amortisation works"
        },
    ];
    const [selectedCommunication, setSelectedCommunication] = useState(null);

    const toggleSelectCommunication = (id) => {
        setSelectedCommunication(id);
    }


    return (
        <div>
            <div className='flex flex-row items-center justify-between' style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}>
                <div>
                    Communication Style
                </div>
                <button className='text-purple underline'>
                    Add New
                </button>
            </div>

            <div className='overflow-auto max-h-[46vh]'>
                {
                    menuItems.map((item) => (
                        <div key={item.id} className='flex flex-row items-center justify-between p-[2vh] border rounded-lg mt-6'>
                            <div>
                                <div>
                                    {item.title}
                                </div>
                                <div>
                                    {item.description}
                                </div>
                            </div>
                            <div>
                                {
                                    selectedCommunication === item.id ?
                                        <button onClick={() => { setSelectedCommunication(null) }}>
                                            <div className='border border-purple flex flex-row items-center justify-center' style={{ height: "30px", width: "30px", borderRadius: "50%" }}>
                                                <div className='bg-purple' style={{ height: "18px", width: "18px", borderRadius: "50%" }} />
                                            </div>
                                        </button> :
                                        <button onClick={() => { toggleSelectCommunication(item.id) }}>
                                            <div className='border' style={{ height: "27px", width: "27px", borderRadius: "50%" }} />
                                        </button>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>


        </div>
    )
}

export default CommunicationStyle;
