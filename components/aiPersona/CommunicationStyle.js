import React from 'react'

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
    ]

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
        </div>
    )
}

export default CommunicationStyle;
