import { CircularProgress, Popover } from '@mui/material'
import { DotsThree } from '@phosphor-icons/react'
import React, { useState } from 'react'

const FAQ = () => {


    const [FAQData, setFAQData] = useState([
        {
            id: 1,
            question: "Question 1",
            details: "Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. Tincidunt pharetra quam ac viverra. Sit pellentesque faucibus non sit. Feugiat consequat ultrices erat est. Nulla."
        },
        {
            id: 2,
            question: "Question 2",
            details: "Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. Tincidunt pharetra quam ac viverra. Sit pellentesque faucibus non sit. Feugiat consequat ultrices erat est. Nulla."
        },
    ]);

    const [FAQAnchorel, setFAQAnchorel] = useState(null);
    const FAQPopoverId = FAQAnchorel ? 'simple-popover' : undefined;
    const [FAQLoader, setFAQLoader] = useState(false);


    const handeFAQMoreClick = (event, item) => {
        setFAQAnchorel(event.currentTarget);
    }

    const handleClose = () => {
        setFAQAnchorel(null);
    };


    return (
        <div>
            <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                Communication
            </div>
            <div className='flex flex-row justify-between items-center mt-8'>
                <div style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}>
                    FAQ
                </div>
                <button className='underline text-purple' style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}>
                    Add New
                </button>
            </div>
            {
                FAQData.map((item, index) => (
                    <div key={item.id} className='flex flex-row items-start p-4 border border-[#00000010] mt-8 justify-between'>
                        <div>
                            <div style={{ fontWeight: "600", fontSize: 13, fontFamily: "inter" }}>
                                {item.question}
                            </div>
                            <div className='mt-4' style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                                {item.details}
                            </div>
                        </div>
                        <div>
                            <button className='-mt-2' aria-describedby={FAQPopoverId} variant="contained" color="primary" onClick={(event) => { handeFAQMoreClick(event, item) }}>
                                <DotsThree size={32} weight="bold" />
                            </button>
                            <Popover
                                id={FAQPopoverId}
                                open={Boolean(FAQAnchorel)}
                                anchorEl={FAQAnchorel}
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
                                    // onClick={() => { setUpdateIntractionModal(true) }}
                                    >
                                        Edit
                                    </button>
                                    {
                                        FAQLoader ?
                                            <CircularProgress style={{ marginTop: 8 }} size={15} /> :
                                            <button style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter", marginTop: 8 }}
                                            // onClick={handleDeleteteIntraction}
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

            <div>
                <button className='text-purple underline mt-4' style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                    Advance Settings
                </button>
            </div>
        </div>
    )
}

export default FAQ