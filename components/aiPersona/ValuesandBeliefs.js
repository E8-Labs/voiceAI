import { Popover } from '@mui/material';
import { DotsThree } from '@phosphor-icons/react'
import React, { useState } from 'react'

const ValuesandBeliefs = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const id = anchorEl ? 'simple-popover' : undefined;
    const [valueAnchorEl, setValueAnchorEl] = useState(null);
    const valuedPopoverId = valueAnchorEl ? 'simple-popover' : undefined;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setValueAnchorEl(null);
    };

    const handleValuesEditClick = (event) => {
        setValueAnchorEl(event.currentTarget);
    }

    //My data
    const beliefsData = [
        {
            id: 1,
            myBelief: "I believe in ALLAH"
        },
        {
            id: 2,
            myBelief: "I believe in ALLAH"
        },
        {
            id: 3,
            myBelief: "I believe in ALLAH"
        },
        {
            id: 4,
            myBelief: "I believe in ALLAH"
        },
    ];

    const valuesData = [
        {
            id: 1,
            value: "Good working"
        },
        {
            id: 2,
            value: "Good working"
        },
        {
            id: 3,
            value: "Good working"
        },
        {
            id: 4,
            value: "Good working"
        },
    ]


    return (
        <div className='w-10/12 max-h-[65vh] overflow-auto scrollbar scrollbar-track-transparent scrollbar-thumb-purple scrollbar-thin'>
            <div className='flex flex-row items-center w-full justify-between'>
                <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                    Beliefs
                </div>
                <button
                    className='text-purple'
                // onClick={() => { setOpenExamplesPopup(true) }}
                >
                    Edit
                </button>
            </div>
            {
                beliefsData.map((item) => (
                    <div key={item.id} className='flex flex-row items-center p-4 border border-[#00000010] mt-8 justify-between'>
                        <div>
                            {item.myBelief}
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
                ))
            }

            {/* code for values */}
            <div className='flex flex-row items-center w-full justify-between mt-12'>
                <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                    Values
                </div>
                <button
                    className='text-purple underline'
                // onClick={() => { setOpenExamplesPopup(true) }}
                >
                    Add new
                </button>
            </div>
            {
                valuesData.map((item) => (
                    <div key={item.id} className='flex flex-row items-center p-4 border border-[#00000010] mt-8 justify-between'>
                        <div>
                            {item.value}
                        </div>
                        <div>
                            <button aria-describedby={valuedPopoverId} variant="contained" color="primary" onClick={handleValuesEditClick}>
                                <DotsThree size={32} weight="bold" />
                            </button>
                            <Popover
                                id={valuedPopoverId}
                                open={Boolean(valueAnchorEl)}
                                anchorEl={valueAnchorEl}
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
                ))
            }

        </div>
    )
}

export default ValuesandBeliefs