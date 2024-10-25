import React, { useState } from 'react'

const Objectionhandling = () => {

    const [selectedObjection, setSelectedObjection] = useState(null);

    const objectionDetails = [
        {
            id: 1,
            detail: "Provide detailed explanation"
        },
        {
            id: 2,
            detail: "Offer re-assurance and solution"
        },
        {
            id: 3,
            detail: "Redirect to positive aspects"
        },
        {
            id: 4,
            detail: "Acknowledge and validate concerns"
        },
        {
            id: 5,
            detail: "Seek compromises and alternatives"
        },
    ];


    const toggleSelectObjection = (id) => {
        setSelectedObjection(id);
    }

    return (
        <div>
            <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                Objection Handling
            </div>

            <div>
                {
                    objectionDetails.map((item) => (
                        <div key={item.id} className='flex flex-row items-center justify-between p-4 border rounded-lg mt-6'>
                            <div>
                                {item.detail}
                            </div>
                            <div>
                                {
                                    selectedObjection === item.id ?
                                        <button onClick={() => { setSelectedObjection(null) }}>
                                            <div className='border border-purple flex flex-row items-center justify-center' style={{ height: "30px", width: "30px", borderRadius: "50%" }}>
                                                <div className='bg-purple' style={{ height: "18px", width: "18px", borderRadius: "50%" }} />
                                            </div>
                                        </button> :
                                        <button onClick={() => { toggleSelectObjection(item.id) }}>
                                            <div className='border' style={{ height: "27px", width: "27px", borderRadius: "50%" }} />
                                        </button>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <div>
                {
                    selectedObjection && (
                        <button className='bg-purple py-1 rounded-full px-6 mt-6 text-white'>
                            Save
                        </button>
                    )
                }
            </div>

        </div>
    )
}

export default Objectionhandling