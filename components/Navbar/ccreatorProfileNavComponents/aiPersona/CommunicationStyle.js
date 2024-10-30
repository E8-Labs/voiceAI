import { CircularProgress, Popover } from '@mui/material';
import { DotsThree } from '@phosphor-icons/react';
import React, { useState } from 'react'

const CommunicationStyle = () => {

    const [donotDiscussData, setDonotDiscussData] = useState([]);

    const [donotDisturbAnchorel, setDonotDiscussAnchorel] = useState(null);
    const donotDisturbPopoverId = donotDisturbAnchorel ? 'simple-popover' : undefined;
    const [donotDisturbLoader, setDonotDisturbLoader] = useState(false);



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
                <div>

                    {
                        donotDiscussData.map((item, index) => (
                            <div key={item.id} className='flex flex-row items-start p-4 border border-[#00000010] mt-8 justify-between'>
                                <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                                    {item.description}
                                </div>
                                <div>
                                    <button className='-mt-2' aria-describedby={donotDisturbPopoverId} variant="contained" color="primary" onClick={(event) => { handeDonotDiscussMoreClick(event, item) }}>
                                        <DotsThree size={32} weight="bold" />
                                    </button>
                                    <Popover
                                        id={donotDisturbPopoverId}
                                        open={Boolean(donotDisturbAnchorel)}
                                        anchorEl={donotDisturbAnchorel}
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
                                                onClick={() => { setOpenUpdateModal(true) }}
                                            >
                                                Edit
                                            </button>
                                            {
                                                donotDisturbLoader ?
                                                    <CircularProgress style={{ marginTop: 8 }} size={15} /> :
                                                    <button style={{ fontSize: 13, fontWeight: "500", fontFamily: "inter", marginTop: 8 }}
                                                        onClick={handleDeleteDonotDescription}
                                                    >
                                                        Delete
                                                    </button>
                                            }
                                        </div>
                                    </Popover>
                                </div>
                            </div >
                        ))
                    }
                </div>
            </div>


        </div>
    )
}

export default CommunicationStyle;
