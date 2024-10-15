import { CircularProgress, Popover } from '@mui/material'
import { DotsThree } from '@phosphor-icons/react'
import React, { useState } from 'react'

const PhrasesandQuotes = () => {


    const [phrasesData, setPhrasesData] = useState([
        {
            id: 1,
            details: "Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. Tincidunt pharetra quam ac viverra. Sit pellentesque faucibus non sit. Feugiat consequat ultrices erat est. Nulla."
        },
        {
            id: 2,
            details: "Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. Tincidunt pharetra quam ac viverra. Sit pellentesque faucibus non sit. Feugiat consequat ultrices erat est. Nulla."
        },
    ]);

    const [phrasesAnchorel, setPhrasesAnchorel] = useState(null);
    const phrasesPopoverId = phrasesAnchorel ? 'simple-popover' : undefined;
    const [phrasesLoader, setPhrasesLoader] = useState(false);


    const handePhrasesMoreClick = (event, item) => {
        setPhrasesAnchorel(event.currentTarget);
    }

    const handleClose = () => {
        setPhrasesAnchorel(null);
    };


    return (
        <div>
            <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                Communication
            </div>
            <div style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter", marginTop: 35 }}>
                Key Quotes
            </div>
            {
                phrasesData.map((item, index) => (
                    <div key={item.id} className='flex flex-row items-start p-4 border border-[#00000010] mt-8 justify-between'>
                        <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                            {item.details}
                        </div>
                        <div>
                            <button className='-mt-2' aria-describedby={phrasesPopoverId} variant="contained" color="primary" onClick={(event) => { handePhrasesMoreClick(event, item) }}>
                                <DotsThree size={32} weight="bold" />
                            </button>
                            <Popover
                                id={phrasesPopoverId}
                                open={Boolean(phrasesAnchorel)}
                                anchorEl={phrasesAnchorel}
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
                                        phrasesLoader ?
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

export default PhrasesandQuotes