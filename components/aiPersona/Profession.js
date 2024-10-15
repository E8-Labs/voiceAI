import { CircularProgress, Popover } from '@mui/material'
import { DotsThree } from '@phosphor-icons/react'
import React, { useState } from 'react'

const Profession = () => {


    const [professionData, setProfessionData] = useState([
        {
            id: 1,
            heading: "Describe what {name} does as a creator?",
            details: "Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. Tincidunt pharetra quam ac viverra. Sit pellentesque faucibus non sit. Feugiat consequat ultrices erat est. Nulla."
        },
        {
            id: 2,
            heading: "What does {name} help your community with?",
            details: "Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. Tincidunt pharetra quam ac viverra. Sit pellentesque faucibus non sit. Feugiat consequat ultrices erat est. Nulla."
        },
    ]);

    const [ProfessionAnchorel, setProfessionAnchorel] = useState(null);
    const ProfessionPopoverId = ProfessionAnchorel ? 'simple-popover' : undefined;
    const [professionLoader, setProfessionLoader] = useState(false);


    const handeProfessionMoreClick = (event, item) => {
        setProfessionAnchorel(event.currentTarget);
    }

    const handleClose = () => {
        setProfessionAnchorel(null);
    };


    return (
        <div>
            <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                AI Characteristics
            </div>
            <div style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter", marginTop: 35 }}>
                Profession
            </div>
            {
                professionData.map((item, index) => (
                    <div key={item.id} className='flex flex-row items-start p-4 border border-[#00000010] mt-8 justify-between'>
                        <div>
                            <div style={{ fontWeight: "bold", fontSize: 13, fontFamily: "inter" }}>
                                {item.heading}
                            </div>
                            <div className='mt-4' style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                                {item.details}
                            </div>
                        </div>
                        <div>
                            <button className='-mt-2' aria-describedby={ProfessionPopoverId} variant="contained" color="primary" onClick={(event) => { handeProfessionMoreClick(event, item) }}>
                                <DotsThree size={32} weight="bold" />
                            </button>
                            <Popover
                                id={ProfessionPopoverId}
                                open={Boolean(ProfessionAnchorel)}
                                anchorEl={ProfessionAnchorel}
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
                                        professionLoader ?
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
        </div>
    )
}

export default Profession