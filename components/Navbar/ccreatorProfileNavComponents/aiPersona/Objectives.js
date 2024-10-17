import { Popover } from '@mui/material';
import { DotsThree } from '@phosphor-icons/react'
import React, { useState } from 'react'

const Objectives = () => {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // const open = Boolean(anchorEl);
    const id = anchorEl ? 'simple-popover' : undefined;

    return (
        <div className='w-full'>
            <div style={{ fontWeight: "medium", fontSize: 20, fontFamily: "inter" }}>
                Objectives
            </div>
            <div className='flex flex-row items-center justify-between w-11/12 border-[2px] border-[#00000010] p-4 rounded mt-4'>
                <div>
                    My objective details
                </div>
                <div>
                    <button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
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
                            <button className='text-purple' style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter" }}>
                                Edit
                            </button>
                            <button style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter", marginTop: 8 }}>
                                Delete
                            </button>
                        </div>
                    </Popover>
                </div>
            </div>
        </div>
    )
}

export default Objectives