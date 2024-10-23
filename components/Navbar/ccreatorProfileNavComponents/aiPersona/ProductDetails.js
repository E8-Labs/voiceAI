import moment from 'moment';
import React, { useEffect, useState } from 'react'

const ProductDetails = ({ aiData, recallApi }) => {

    const [productsData, setProductsData] = useState([]);

    useEffect(() => {
        if (aiData) {
            setProductsData(aiData.products);
        }
    }, [recallApi])

    return (
        <div>
            <div className='flex flex-row items-center justify-between'>
                <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                    <span style={{ color: "#00000060" }}>Products & Services |</span> Product Details 
                </div>
                <button className='underline text-purple'>
                    Add New
                </button>
            </div>
            {
                productsData && productsData.length > 0 ?
                    <div>
                        {
                            productsData.map((item, index) => (
                                <div key={item.id} className='w-full flex flex-row gap-1 mt-6 justify-between border p-4 rounded-lg'>
                                    <div>
                                        <div style={{ color: "#000000", fontSize: 15, fontWeight: "500" }}>{item.name}</div>
                                        <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter", color: "#00000060" }}>
                                            {/* {item.createdAt} */}
                                            {moment(item.createdAt).format("MM/DD/YYYY")}
                                        </div>
                                    </div>
                                    <div className='flex flex-col items-end'>
                                        <div style={{ color: "#000000", fontSize: 20, fontFamily: "inter", fontWeight: "500" }}>
                                            ${Number(item.productPrice).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div> :
                    <div className='text-xl font-bold text-center'>
                        No Product Yet
                    </div>
            }
        </div>
    )
}

export default ProductDetails