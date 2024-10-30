import Apis from '@/components/apis/Apis';
import { Box, CircularProgress, Modal } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const ProductDetails = ({ aiData, recallApi }) => {

    const [productsData, setProductsData] = useState([]);
    const [addProductModal, setAddProductModal] = useState(false);
    const [inputRows, setInputRows] = useState([
        { productAmount: "", productName: "" },
    ]);
    const [productAmountInputErr, setProductAmountErr] = useState(null);
    const [productsLoader, setProductsLoader] = useState(false);



    useEffect(() => {
        const localAiPersonaDetails = localStorage.getItem("aiPersonaDetails");
        if (localAiPersonaDetails) {
            const AiDetails = JSON.parse(localAiPersonaDetails);
            setProductsData(AiDetails.products);
            console.log("Aidetails recieved from local storage are", AiDetails);
        }
    }, [recallApi]);

    //code for adding products
    const addInputRow = () => {
        setInputRows([...inputRows, { productAmount: "", productName: "" }]);
    };

    const handleInputChange2 = (index, field, event) => {
        // console.log("Some thing changed")
        const newInputRows = [...inputRows];
        newInputRows[index][field] = event.target.value;
        setInputRows(newInputRows);
        //console.log(newInputRows);
    };

    // Function to handle deleting a row of input fields
    const handleDeleteRow = (index) => {
        const newInputRows = [...inputRows];
        newInputRows.splice(index, 1); // Remove the row at the given index
        setInputRows(newInputRows);
        //console.log(newInputRows);
    };

    //code to update AI
    const handleUpdateAi = async (setPriceData) => {
        //console.log("Data of setprice screen", setPriceData);

        try {
            setProductsLoader(true);
            const ApiPath = Apis.UpdateBuilAI;
            const LocalData = localStorage.getItem("User");
            const Data = JSON.parse(LocalData);
            const AuthToken = Data.data.token;
            //console.log("Auth token", AuthToken);
            const formData = new FormData();
            // selectedProducts.forEach((product, index) => {
            //     formData.append(`products[${index}][productName]`, product);
            //     formData.append(`products[${index}][isSelling]`, true);
            // });

            inputRows.forEach((row, index) => {
                formData.append(`products[${index}][name]`, row.productName);
                formData.append(`products[${index}][productPrice]`, row.productAmount);
                formData.append(`products[${index}][isSelling]`, true);
            });
            console.log("Data being sent to the API:");
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            console.log("Api path is", ApiPath);
            // return
            const response = await axios.post(ApiPath, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + AuthToken,
                },
            });

            if (response) {
                console.log("Response of api is", response.data);
                if (response.data.status === true) {
                    console.log("Response of update ai api is", response);
                    setProductsData(response.data.data.products);
                    localStorage.setItem('aiPersonaDetails', JSON.stringify(response.data.data));
                    setAddProductModal(false);
                    setInputRows([{ productAmount: "", productName: "" }]);
                    //add data to api
                }
            }
        } catch (error) {
            console.error("error occured in script api is", error);
        } finally {
            setProductsLoader(false);
        }
    };


    //style for the Modal
    const styles = {
        AddNewProductModal: {
            height: "auto",
            bgcolor: "transparent",
            // p: 2,
            mx: "auto",
            my: "50vh",
            transform: "translateY(-55%)",
            borderRadius: 2,
            border: "none",
            outline: "none",
        }
    }


    return (
        <div>
            <div className='flex flex-row items-center justify-between'>
                <div style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                    <span style={{ color: "#00000060" }}>Products & Services |</span> Product Details
                </div>
                <button className='underline text-purple' onClick={() => { setAddProductModal(true) }}>
                    Add New
                </button>
            </div>
            {
                productsData && productsData.length > 0 ?
                    <div className='max-h-[60vh] overflow-auto scrollbar scrollbar-track-transparent scrollbar-thumb-purple scrollbar-thin'>
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
                    <div className='text-xl font-bold text-center mt-8'>
                        <div className='flex flex-col items-center w-full gap-3 mt-4'>
                            <div className='flex flex-row items-center justify-center bg-purple' style={{ height: "70px", width: "70px", borderRadius: "50%" }}>
                                <Image src="/assets/creatorProfileNavIcons/settingIcon.png" height={32} width={32} alt='seting' />
                            </div>
                            <div style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter" }}>
                                No product found yet
                            </div>
                            <div style={{ fontWeight: "500", fontSize: 13, fontFamily: "inter", color: "#050A0860", textAlign: "center" }}>
                                Please add your product
                            </div>
                            <button className='bg-purple px-4 py-2 text-white' style={{ borderRadius: "50px" }} onClick={() => { setAddProductModal(true) }}>
                                Add New
                            </button>
                        </div>
                    </div>
            }

            {/* Modal to add Products */}
            <Modal
                open={addProductModal}
                onClose={() => setAddProductModal(false)}
                closeAfterTransition
                BackdropProps={{
                    timeout: 1000,
                    sx: {
                        backgroundColor: "transparent",
                        backdropFilter: "blur(20px)",
                    },
                }}
            >
                <Box className="lg:w-5/12 sm:w-7/12 w-full" sx={styles.AddNewProductModal}>
                    <div className="flex flex-row justify-center w-full">
                        <div
                            className="sm:w-7/12 w-full"
                            style={{
                                backgroundColor: "#ffffff20",
                                padding: 20,
                                borderRadius: 10,
                            }}
                        >
                            <div style={{ backgroundColor: "#ffffff", borderRadius: 7, padding: 10 }}>
                                <div className='flex flex-row items-center justify-between p-2' style={{ fontWeight: '500', fontFamily: "inter", fontSize: 18 }}>
                                    <p />
                                    <p>Add new products</p>
                                    <button onClick={() => { setAddProductModal(false) }}>
                                        <Image src="/assets/crossBtn.png" height={15} width={15} alt='*' />
                                    </button>
                                </div>
                                <div className='mt-8 w-full'>

                                    <div //className="max-h-[50vh] overflow-y-auto scrollbar scrollbar-thumb-purple scrollbar-track-transparent scrollbar-thin"
                                    >
                                        {/* Code to make dynamic routes */}
                                        <div //className='w-full sm:w-9/12' //style={{ maxHeight: "40vh", overflowY: "auto", scrollbarWidth: "none" }}
                                            className="mt-8 w-full w-full max-h-[30vh] overflow-y-auto scrollbar scrollbar-thumb-purple scrollbar-track-transparent scrollbar-thin"
                                        >
                                            {inputRows.map((row, index) => (
                                                <div
                                                    className="w-full flex flex-row gap-2 mt-2"
                                                    key={index}
                                                    style={{}}
                                                >
                                                    <div
                                                        className="w-3/12 px-3 py-3 rounded-lg flex flex-row gap-4 items-center"
                                                        style={{
                                                            backgroundColor: "#EDEDED80",
                                                            border:
                                                                productAmountInputErr === index
                                                                    ? "1px solid red"
                                                                    : "none",
                                                        }}
                                                    >
                                                        <div className="flex items-center border-none border-gray-300">
                                                            <span className="mr-1">$</span>
                                                            <input
                                                                className="w-full border-none bg-transparent outline-none"
                                                                type="text"
                                                                inputMode="numeric" // Add this line
                                                                pattern="[0-9]*"
                                                                value={row.productAmount}
                                                                autoFocus={true}
                                                                placeholder="Price"
                                                                // onChange={(e) => handleInputChange2(index, 'productAmount', e)}
                                                                onInput={(e) => {
                                                                    // Remove any non-numeric characters
                                                                    e.target.value = e.target.value.replace(
                                                                        /[^0-9 .]/g,
                                                                        ""
                                                                    );
                                                                    if (e.target.value === "0") {
                                                                        console.log(
                                                                            `Value is zero at index: ${index}`
                                                                        );
                                                                        setProductAmountErr(index);
                                                                    } else {
                                                                        setProductAmountErr(false);
                                                                    }
                                                                    handleInputChange2(index, "productAmount", e); // Update your handler
                                                                }}
                                                                // placeholder="Amount"
                                                                style={{
                                                                    WebkitAppearance: "none",
                                                                    MozAppearance: "textfield",
                                                                    appearance: "none",
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="w-9/12 px-3 py-3 rounded-lg flex flex-row gap-4 items-center"
                                                        style={{ backgroundColor: "#EDEDED80" }}
                                                    >
                                                        <input
                                                            className="w-full border-none bg-transparent outline-none"
                                                            type="text"
                                                            value={row.productName}
                                                            onChange={(e) =>
                                                                handleInputChange2(index, "productName", e)
                                                            }
                                                            placeholder="Product Name"
                                                        />
                                                        <button
                                                            onClick={() => handleDeleteRow(index)}
                                                            style={{ backgroundColor: "" }}
                                                        >
                                                            <Image
                                                                src="/assets/croseBtn.png"
                                                                alt="cross"
                                                                height={20}
                                                                width={20}
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-4">
                                            <button
                                                onClick={addInputRow}
                                                className="text-purple"
                                                style={{
                                                    fontWeight: "400",
                                                    fontSize: 13,
                                                    fontFamily: "inter",
                                                }}
                                            >
                                                <u>Add New</u>
                                            </button>
                                        </div>
                                        <div className='mt-4 w-full flex flex-row justify-center'>
                                            {
                                                productsLoader ?
                                                    <CircularProgress size={35} /> :
                                                    <button className='bg-purple text-white w-full' style={{ fontSize: 15, fontWeight: "500", fontFamily: "inter", borderRadius: "50px", height: "48px" }}
                                                        onClick={handleUpdateAi}
                                                    >
                                                        Add Product
                                                    </button>
                                            }
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default ProductDetails