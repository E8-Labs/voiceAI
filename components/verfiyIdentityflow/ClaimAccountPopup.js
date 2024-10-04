import Image from 'next/image'
import React from 'react'

const ClaimAccountPopup = ({ getAssistantData }) => {
    return (
        <div>
            <div className='mt-2 flex flex-row justify-between items-center'>
                <Image src="/assets/claimIcon.png" alt='claimimg' height={38} width={38} />
                <button //</div>onClick={(() => setOpenClaimPopup(false))}
                >
                    <Image src="/assets/crossBtn.png" alt='cross' height={14} width={14} />
                </button>
            </div>
            <div className='mt-8' style={{ fontWeight: '600', fontSize: 24, fontFamily: 'inter' }}>
                Claim Account
            </div>
            <div className='text-black' style={{ fontWeight: "400", fontSize: 15, fontFamily: "inter", marginTop: 10 }}>
                This account hasn't been claimed by its creator. In order to claim this creator, you must be the real creator and verify your identity.
            </div>
            <div className='flex flex-row mt-4'>
                <div style={{ fontSize: 12, color: "#000000", fontWeight: "400", fontFamily: "inter" }}>
                    Calls:
                </div>
                <div className='' style={{ fontWeight: "300", fontFamily: "inter", fontSize: 12 }}>
                    {
                        getAssistantData &&
                        <div>
                            {getAssistantData.calls ?
                                <div className='ms-1' style={{ fontWeight: "600", fontFamily: "inter", fontSize: 12 }}>
                                    {getAssistantData.calls}
                                </div> :
                                <div className='ms-1' style={{ fontWeight: "600", fontFamily: "inter", fontSize: 12 }}>
                                    0
                                </div>
                            }
                        </div>
                    }
                </div>
                <div className='ms-2' style={{ fontSize: 12, color: "#000000", fontWeight: "400", fontFamily: "inter" }}>
                    Earned:
                </div>
                <div className='' style={{ fontWeight: "300", fontFamily: "inter", fontSize: 13 }}>
                    {
                        getAssistantData &&
                        <div>
                            {getAssistantData.earned ?
                                <div className='ms-1' style={{ fontWeight: "600", fontFamily: "inter", fontSize: 12 }}>
                                    ${Number(getAssistantData.earned).toFixed(2)}
                                </div> :
                                <div className='ms-1' style={{ fontWeight: "600", fontFamily: "inter", fontSize: 12 }}>
                                    $ 0
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
            <div className='flex flex-row justify-start mt-4 w-full' style={{ marginTop: 30 }}>
                <div>
                    <button
                        onClick={() => {
                            window.open("https://www.youtube.com", '_blank')
                        }} className='bg-purple px-6 py-2 text-white'
                        style={{ fontWeight: "400", fontFamily: "inter", fontSize: 15, borderRadius: "50px" }}>
                        Verify Identity
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ClaimAccountPopup