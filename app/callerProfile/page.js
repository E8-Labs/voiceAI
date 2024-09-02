import React from 'react'
import Image from 'next/image'
const Page = () => {

    const styles = {
        text: {
            fontSize: 12,
            color: '#00000090'
        },
        text2: {
            textAlignLast: 'left',
            fontSize: 18,
            color: '#000000',
            fontWeight: 300,
            whiteSpace: 'nowrap',  // Prevent text from wrapping
            overflow: 'hidden',    // Hide overflow text
            textOverflow: 'ellipsis'  // Add ellipsis for overflow text
        }
    }

    const products = [
        {
            id: 1,
            disc: '30 days transformation journey for the mind and body',
            price: "$400"
        },
        {
            id: 2,
            disc: '30 days transformation journey for the mind and body',
            price: "$400"
        },
        {
            id: 3,
            disc: '30 days transformation journey for the mind and body',
            price: "$400"
        },
    ]

    const productsDetails = [
        {
            id: 1,
            name: '30 days transformation journey for the mind and body',
            price: '$400',
            creator: 'Andrew Tate',
            date: '10/3/2007'
        },
        {
            id: 2,
            name: '30 days transformation journey for the mind and body',
            price: '$400',
            creator: 'Andrew Tate',
            date: '10/3/2007'
        },
        {
            id: 3,
            name: '30 days transformation journey for the mind and body',
            price: '$400',
            creator: 'Andrew Tate',
            date: '10/3/2007'
        },
    ]

    return (
        <div className='h-screen w-full' style={{ backgroundColor: "#ffffff40", overflow: 'auto', scrollbarWidth: 0, }}>
            <div className='w-10/12 flex flex-col gap-2 pt-10 ps-10'>
                <div style={{ fontSize: 20, fontWeight: 400, fontFamily: 'inter' }}>
                    Products
                </div>
                <div className='w-full flex flex-row gap-2'>

                    <div className='w-6/12 p-5 rounded-xl'
                        style={{ backgroundColor: "#FFFFFF30" }}
                    >
                        <div className='flex flex-row gap-2'>
                            <Image src="/assets/placeholderImg.jpg" alt='profile'
                                height={50} width={50} style={{ borderRadius: "50%" }}
                            />
                            <div className='flex flex-col'>
                                <div style={{ fontSize: 18, fontWeight: 400, fontFamily: 'inter' }}>
                                    Andrew Tate
                                </div>
                                <div style={{ fontSize: 15, fontWeight: 400, fontFamily: 'inter', color: '#00000090' }}>
                                    3 products
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex flex-col gap-5'>
                            {
                                products.map((item) => (
                                    <div key={item.id} className='w-full flex flex-col'>
                                        <div className='flex flex-row justify-between items-start'>
                                            <div className='flex flex-col'>
                                                <div className='w-10/12'
                                                    style={{ fontSize: 14, fontWeight: 400, fontFamily: 'inter' }}>
                                                    {item.disc}
                                                </div>
                                                <div style={{ fontSize: 16, fontWeight: 400, fontFamily: 'inter' }}>
                                                    {item.price}
                                                </div>
                                            </div>

                                            <button className='px-3 py-2'
                                                style={{ color: 'white', backgroundColor: '#552AFF', borderRadius: 20, fontSize: 14 }}>
                                                Buy
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className='w-6/12 p-5 rounded-xl'
                        style={{ backgroundColor: "#FFFFFF30" }}
                    >
                        <div className='flex flex-row gap-2'>
                            <Image src="/assets/placeholderImg.jpg" alt='profile'
                                height={50} width={50} style={{ borderRadius: "50%" }}
                            />
                            <div className='flex flex-col'>
                                <div style={{ fontSize: 18, fontWeight: 400, fontFamily: 'inter' }}>
                                    Andrew Tate
                                </div>
                                <div style={{ fontSize: 15, fontWeight: 400, fontFamily: 'inter', color: '#00000090' }}>
                                    3 products
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex flex-col gap-5'>
                            {
                                products.map((item) => (
                                    <div key={item.id} className='w-full flex flex-col'>
                                        <div className='flex flex-row justify-between items-start'>
                                            <div className='flex flex-col'>
                                                <div className='w-10/12'
                                                    style={{ fontSize: 14, fontWeight: 400, fontFamily: 'inter' }}>
                                                    {item.disc}
                                                </div>
                                                <div style={{ fontSize: 16, fontWeight: 400, fontFamily: 'inter' }}>
                                                    {item.price}
                                                </div>
                                            </div>

                                            <button className='px-3 py-2'
                                                style={{ color: 'white', backgroundColor: '#552AFF', borderRadius: 20, fontSize: 14 }}>
                                                Buy
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>

                <div className='w-full flex flex-row gap-2'>

                    <div className='w-6/12 p-5 rounded-xl'
                        style={{ backgroundColor: "#FFFFFF30" }}
                    >
                        <div className='flex flex-row gap-2'>
                            <Image src="/assets/placeholderImg.jpg" alt='profile'
                                height={50} width={50} style={{ borderRadius: "50%" }}
                            />
                            <div className='flex flex-col'>
                                <div style={{ fontSize: 18, fontWeight: 400, fontFamily: 'inter' }}>
                                    Andrew Tate
                                </div>
                                <div style={{ fontSize: 15, fontWeight: 400, fontFamily: 'inter', color: '#00000090' }}>
                                    3 products
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex flex-col gap-5'>
                            {
                                products.map((item) => (
                                    <div key={item.id} className='w-full flex flex-col'>
                                        <div className='flex flex-row justify-between items-start'>
                                            <div className='flex flex-col'>
                                                <div className='w-10/12'
                                                    style={{ fontSize: 14, fontWeight: 400, fontFamily: 'inter' }}>
                                                    {item.disc}
                                                </div>
                                                <div style={{ fontSize: 16, fontWeight: 400, fontFamily: 'inter' }}>
                                                    {item.price}
                                                </div>
                                            </div>

                                            <button className='px-3 py-2'
                                                style={{ color: 'white', backgroundColor: '#552AFF', borderRadius: 20, fontSize: 14 }}>
                                                Buy
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className='w-6/12 p-5 rounded-xl'
                        style={{ backgroundColor: "#FFFFFF30" }}
                    >
                        <div className='flex flex-row gap-2'>
                            <Image src="/assets/placeholderImg.jpg" alt='profile'
                                height={50} width={50} style={{ borderRadius: "50%" }}
                            />
                            <div className='flex flex-col'>
                                <div style={{ fontSize: 18, fontWeight: 400, fontFamily: 'inter' }}>
                                    Andrew Tate
                                </div>
                                <div style={{ fontSize: 15, fontWeight: 400, fontFamily: 'inter', color: '#00000090' }}>
                                    3 products
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex flex-col gap-5'>
                            {
                                products.map((item) => (
                                    <div key={item.id} className='w-full flex flex-col'>
                                        <div className='flex flex-row justify-between items-start'>
                                            <div className='flex flex-col'>
                                                <div className='w-10/12'
                                                    style={{ fontSize: 14, fontWeight: 400, fontFamily: 'inter' }}>
                                                    {item.disc}
                                                </div>
                                                <div style={{ fontSize: 16, fontWeight: 400, fontFamily: 'inter' }}>
                                                    {item.price}
                                                </div>
                                            </div>

                                            <button className='px-3 py-2'
                                                style={{ color: 'white', backgroundColor: '#552AFF', borderRadius: 20, fontSize: 14 }}>
                                                Buy
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>

                <div className='w-full p-8 rounded-xl' style={{ backgroundColor: '#FFFFFF30' }}>
                    <div className='w-full flex flex-row justify-between'>
                        <div style={{ fontSize: 18, fontWeight: 400, fontFamily: 'inter' }}>
                            Products
                        </div>
                        <button className='px-3 py-2'
                            style={{ color: 'white', backgroundColor: '#552AFF', borderRadius: 20, fontSize: 14 }}>
                            View All
                        </button>
                    </div>

                    <div className='w-full flex flex-row justify-between mt-10'>
                        <div className='w-4/12'>
                            <div style={styles.text}>Name</div>
                        </div>
                        <div className='w-2/12 '>
                            <div style={styles.text}>Amount</div>
                        </div>
                        <div className='w-3/12'>
                            <div style={styles.text}>Creator</div>
                        </div>
                        <div className='w-2/12'>
                            <div style={styles.text}>Date</div>
                        </div>
                    </div>

                    {productsDetails.map((item) => (
                        <>
                            <button className='w-full' //</>style={{}} onClick={() => { setOpen(item) }}
                            >
                                <div className='w-full flex flex-row justify-between mt-10' key={item.id}>
                                    <div className='w-4/12' style={{}}>
                                        <div style={styles.text2}>{item.name}</div>
                                    </div>
                                    <div className='w-2/12'>
                                        <div style={styles.text2}>{item.price}</div>
                                    </div>
                                    <div className='w-3/12 '>
                                        <div style={styles.text2}>{item.creator}</div>
                                    </div>
                                    <div className='w-2/12'>
                                        <div style={styles.text2}>{item.date}</div>
                                    </div>
                                </div>
                                <div className='w-full h-0.5 rounded mt-2' style={{ backgroundColor: '#00000011' }}></div>
                            </button>
                        </>
                    ))}
                </div>

            </div>

        </div >
    )
}

export default Page