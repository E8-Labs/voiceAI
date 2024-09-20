import Image from 'next/image'
import React from 'react'

const BuyingProduct = () => {
    return (
        <div>

            {/* <div>
                Product Name
            </div> */}

            <div className='mt-6'>
                Price
            </div>
            <div
                className='px-4 py-2 rounded-lg mt-2 flex flex-row gap-3 items-center'
                style={{
                    border: "1px solid #00000015",

                }}>
                <div>
                    <Image className='rounded' src="/us.jpg" alt='flag' height={20} width={40} />
                </div>
                <div>
                    $ 20
                </div>
            </div>

            <div className='w-full flex flex-row justify-center mt-12'>
                <button className='w-full py-3 w-10/12 bg-purple'
                    style={{ fontWeight: '400', fontSize: 15, fontFamily: 'inter', color: 'white', borderRadius: '50px' }}>
                    Buy
                </button>
            </div>
        </div>
    )
}

export default BuyingProduct