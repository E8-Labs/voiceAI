import React from 'react'

const BillingandPlans = () => {

    const Plans = [
        {
            id: 0,
            discouuntPrice: "$97",
            realPrice: "$162",
            offPercentage: "40%",
            duration: "120",
            isPopular: false,
            isBest: false,
            description: "Approx 1,000 calls. Perfect for community updates.",
            isActive: true
        },
        {
            id: 1,
            discouuntPrice: "$269",
            realPrice: "$162",
            offPercentage: "40%",
            duration: "120",
            isPopular: false,
            isBest: false,
            description: "Approx 1,000 calls. Perfect for community updates.",
            isActive: false
        },
        {
            id: 2,
            discouuntPrice: "$479",
            realPrice: "$162",
            offPercentage: "40%",
            duration: "120",
            isPopular: false,
            isBest: false,
            description: "Approx 1,000 calls. Perfect for community updates.",
            isActive: false
        },
    ];

    const styles = {
        Price: {
            fontWeight: "600",
            fontFamily: "inter",
            color: "#552AFF65",
            fontSize: 17
        },
        billingHeader: {
            fontSize: 15,
            fontWeight: "500",
            fontFamily: "inter"
        },
        billingListItems: {
            fontSize: 13,
            fontWeight: "500",
            fontFamily: "inter"
        }
    }

    return (
        <div className='w-full'>
            <div className='w-full flex flex-row items-center justify-between'>
                <div style={{ fontWeight: "500", fontFamily: "inter", fontSize: 20 }}>
                    Plans
                </div>
                <div className='underline' style={{ color: "#552AFF", fontWeight: "500", fontSize: 13, fontFamily: "inter" }}>
                    Cancel My Subscription
                </div>
            </div>

            <div className='flex flex-row gap-6 items-center mt-8'>
                {
                    Plans.map((item, index) => (
                        <div className='w-4/12 border bg-white rounded-lg py-3 px-3' key={index}>
                            <div className='flex flex-row items-center gap-2'>
                                <p style={styles.Price}>
                                    <del>
                                        {item.realPrice}
                                    </del>
                                </p>
                                <p style={{ ...styles.Price, color: "#000000" }}>
                                    {item.discouuntPrice}
                                </p>
                            </div>
                            <div className='mt-4' style={{ fontWeight: "700", fontFamily: "inter", fontSize: 15 }}>
                                {item.duration} mins
                            </div>
                            <div className='mt-4' style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13 }}>
                                {item.description}
                            </div>
                            {
                                item.isActive ?
                                    <button className='w-full text-center mt-4 outline-none' style={{ fontWeight: "500", fontFamily: "inter", fontSize: 11, height: "48px" }}>
                                        Active
                                    </button> :
                                    <button className='w-full bg-purple text-white text-center mt-4 outline-none' style={{ fontWeight: "500", fontFamily: "inter", fontSize: 11, height: "48px", borderRadius: "50px" }}>
                                        Upgrade
                                    </button>
                            }
                        </div>
                    ))
                }
            </div>

            <div className='mt-8' style={{ fontWeight: "500", fontFamily: "inter", fontSize: 13 }}>
                My Billing History
            </div>

            <div className='w-10/12'>
                <div className='flex flex-row items-center mt-4'>
                    <div className='w-4/12' style={styles.billingHeader}>Name</div>
                    <div className='w-2/12' style={styles.billingHeader}>Amount</div>
                    <div className='w-2/12' style={styles.billingHeader}>Status</div>
                    <div className='w-2/12' style={styles.billingHeader}>Date</div>
                    <div className='w-2/12' style={styles.billingHeader}>Action</div>
                </div>
                <div className='flex flex-row items-center mt-4'>
                    <div className='w-4/12' style={styles.billingListItems}>Noah</div>
                    <div className='w-2/12' style={styles.billingListItems}>$4.00</div>
                    <div className='w-2/12' style={styles.billingListItems}>
                        <p className='px-3 py-1' style={{ ...styles.billingListItems, backgroundColor: "#01CB7615", color: "#01CB76", width: "fit-content", borderRadius: "50px" }}>
                            Paid
                        </p>
                    </div>
                    <div className='w-2/12' style={styles.billingListItems}>09/10/2024</div>
                    <div className='w-2/12' style={{ ...styles.billingListItems, color: "#402FFF" }}>Download</div>
                </div>
            </div>

        </div>
    )
}

export default BillingandPlans