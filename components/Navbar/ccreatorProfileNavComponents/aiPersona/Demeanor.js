import { CircularProgress, Popover } from '@mui/material';
import { DotsThree } from '@phosphor-icons/react';
import React, { useState } from 'react'

const Demeanor = ({ recallApi, aiData }) => {

    const [demenorData, setDemenorData] = useState([
        {
            id: 1,
            description: "Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. "
        },
        {
            id: 2,
            description: "Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. "
        },
        {
            id: 3,
            description: "Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. "
        },
        {
            id: 4,
            description: "Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. "
        },
        {
            id: 5,
            description: "Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. "
        },
        {
            id: 6,
            description: "Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. "
        },
    ]);
    const [anchorEl, setAnchorEl] = useState(null);
    const id = anchorEl ? 'simple-popover' : undefined;
    const [demeanorLoader, setDemeanorLoader] = useState(false);


    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event, item) => {
        setAnchorEl(event.currentTarget);
    };

    // const []

    return (
        <div>
            <div className='flex flex-row items-center justify-between' style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}>
                <div>
                    Demeanor
                </div>
                <button className='text-purple underline'>
                    Add New
                </button>
            </div>

            <div className='max-h-[55vh] overflow-auto scrollbar scrollbar-thumb-purple scrollbar-track-transparent scrollbar-thin'>
                {
                    demenorData.map((item) => (
                        <div key={item.id}>
                            <div className='border-2 rounded-lg p-4 mt-8 flex flex-row items-start justify-between'>
                                <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                                    {item.description}
                                </div>

                                <div>
                                    <button aria-describedby={id} variant="contained" color="primary" onClick={(event) => { handleClick(event, item) }}>
                                        <DotsThree size={32} weight="bold" />
                                    </button>
                                    <Popover
                                        id={id}
                                        open={Boolean(anchorEl)}
                                        anchorEl={anchorEl}
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
                                            <button
                                                className='text-purple' style={{
                                                    fontSize: 13, fontWeight: "500",
                                                    fontFamily: "inter"
                                                }}>
                                                Edit
                                            </button>
                                            {
                                                demeanorLoader ?
                                                    <CircularProgress size={15} /> :
                                                    <button style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter", marginTop: 8 }}>
                                                        Delete
                                                    </button>
                                            }
                                        </div>
                                    </Popover>
                                </div>

                            </div>
                        </div>
                    ))
                }
            </div>



        </div>
    )
}

export default Demeanor