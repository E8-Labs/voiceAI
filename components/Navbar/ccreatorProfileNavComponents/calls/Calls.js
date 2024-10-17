'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Drawer from '@mui/material/Drawer';
import { Modal, Box, CircularProgress } from '@mui/material';
import moment from 'moment';
import Apis from '@/components/apis/Apis';
import { FormControl, MenuItem, Select } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { CalendarDots } from '@phosphor-icons/react';
// import { FormControl, MenuItem, Select } from '@mui/material';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Calls = () => {
  const [open, setOpen] = useState('');
  const [callsData, setCallsData] = useState({ calls: [] });
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [productType, setProductType] = useState('none');
  const callDetails = [
    { id: 1, name: "Rayna Passaquindici Arcand", talkTime: '2mins 19sec', date: '21.12.2024 01:25', amount: '$1.0' },
    { id: 2, name: "Gretchen Workman", talkTime: '2mins 19sec', date: '21.12.2024 01:25', amount: '$1.0' },
    { id: 3, name: "Zain Baptista", talkTime: '2mins 19sec', date: '21.12.2024 01:25', amount: '$1.0' },
    { id: 4, name: "Jordyn Korsgaard", talkTime: '2mins 19sec', date: '21.12.2024 01:25', amount: '$1.0' },
    { id: 5, name: "Lincoln Stanton", talkTime: '2mins 19sec', date: '21.12.2024 01:25', amount: '$1.0' },
  ];
  console.log("Data of drawer", open);

  //code for calender
  const [date, setDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [endDate, setEndDate] = useState(null);
  const [showEndDateCalendar, setEndDateCalendar] = useState(false);
  const [callLoader, setCallsLoader] = useState(false);

  // Function to format date as MM/DD/YYYY
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    setShowCalendar(false); // Hide calendar after date selection
  };

  const handleEndDateChange = (selectedDate) => {
    setEndDate(selectedDate);
    setEndDateCalendar(false); // Hide calendar after date selection
  };

  const styles = {
    inputContainer: {
      // marginTop: 30,
      // display: "flex",
      // alignItems: "center",
      backgroundColor: "#00000006", /* Light grey background */
      borderRadius: 5, /* Rounded corners */
      padding: "8px 8px" /* Padding around input */
    },
    input: {
      border: 'none',
      outline: 'none',
      backgroundColor: 'transparent',
      flexGrow: 1,
      fontSize: '16px',
      // paddingLeft: '10px',
      color: '#000000',
    },
    text: {
      fontSize: 12,
      color: '#00000090',
      fontWeight: '500',
      fontFamily: "inter"
    },
    callStatHeading: {
      fontSize: 11,
      color: '#ffffff70',
      fontWeight: '400',
      fontFamily: "inter"
    },
    statsDetail: {
      fontSize: 20,
      color: '#ffffff',
      fontWeight: '500',
      fontFamily: "inter"
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
  };


  const styleLoginModal = {
    height: 'auto',
    bgcolor: 'transparent',
    // p: 2,
    mx: 'auto',
    my: '50vh',
    transform: 'translateY(-55%)',
    borderRadius: 2,
    border: "none",
    outline: "none",
    // border: "2px solid green"
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpen(open);
  };

  useEffect(() => {
    getCallsData();
  }, []);

  const getCallsData = async () => {
    try {
      setCallsLoader(true);
      const LocalData = localStorage.getItem('User');
      const Data = JSON.parse(LocalData);
      console.log("Local data is", Data);
      const AuthToken = Data.data.token;
      console.log("Authtoken is", AuthToken);
      // const token = m;
      const ApiPath = Apis.CallsApi;
      const result = await fetch(ApiPath, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + AuthToken
        },
      });
      if (result) {
        let json = await result.json();

        if (json.status === true) {
          console.log('calls data is', json.data);
          setCallsData(json.data);
        } else {
          console.log('calls api message is', json.message);
        }
      }
    } catch (e) {
      console.log('calls api error is', e);
    }
    finally {
      setCallsLoader(false);
    }
  }

  const formateDate = (date) => {
    let formatedDate = moment(date).format("DD.MM.YYYY hh:mmA").toLowerCase()
    return formatedDate
  }

  //open drawer

  const handleFilterDrawer = (status) => {
    setOpenFilterModal(status);
  };

  const handleProductType = (e) => {
    setProductType(e.target.value);
  }

  return (
    <div className='w-full flex flex-col pt-10'
      style={{ height: '', overflow: "", scrollbarWidth: "none", msOverflowStyle: 'none', }}>

      <div className='w-full px-6 py-4 rounded-2xl bg-purple'>
        <div style={{ fontSize: 24, color: '#ffffff70', fontWeight: "500" }}>
          Call Stat
        </div>

        <div className='w-full flex flex-row justify-between items-center mt-10'>
          <div className='w-4/12 pl-4'>
            <div style={styles.callStatHeading}>Total calls</div>
            <div style={styles.statsDetail}>
              {callsData.totalCalls ?
                <div>
                  {callsData.totalCalls}
                </div> : "0"}
            </div>
          </div>
          <div className='w-4/12 '>
            <div style={styles.callStatHeading}>
              Total Talk Time
            </div>
            <div className='flex flex-row  items-end'>
              <div style={styles.statsDetail}>
                {callsData.totalMinutes ?
                  <div>
                    {callsData.totalMinutes}
                  </div> : "0"}
              </div>
              {/* <div style={{ fontSize: 15, color: '#00000095', paddingBottom: 8, fontWeight: 200 }}>
                Mins
              </div> */}
            </div>
          </div>
          <div className='w-4/12'>
            <div style={styles.callStatHeading}>Revenue gen</div>
            <div className='flex flex-row items-center'>
              <div style={styles.statsDetail}>${callsData.revenue}</div>
            </div>
          </div>
        </div>
      </div>


      {/* Cal details */}
      <div className='w-full mt-8 px-6 py-8 rounded-2xl' style={{ backgroundColor: "#ffffff40" }}>

        <div className='flex flex-row items-center justify-between w-full'>
          <div style={{ fontSize: 15, fontWeight: "500", fontFamily: "inter" }}>
            Call Log
          </div>
          <div className='flex flex-row items-center gap-4'>
            <div className='flex flex-row items-center gap-4'>
              <div className='w-full rounded flex flex-row items-center' style={styles.inputContainer}>
                <input
                  // className='w-[80%]'
                  style={styles.input}
                  placeholder="Search caller"
                />
                <Image src={"/assets/searchIcon.png"} width={20} height={20} />
              </div>
              <button onClick={() => handleFilterDrawer(true)} className='text-purple outline-none border-none' style={{ fontWeight: "400", fontFamily: "inter", fontSize: 15 }}>
                Filter
              </button>
              <div className='w-full'>
                <Modal
                  open={openFilterModal}
                  onClose={(() => setOpenFilterModal(false))}
                  closeAfterTransition
                  BackdropProps={{
                    timeout: 1000,
                    sx: {
                      backgroundColor: 'transparent',
                      backdropFilter: 'blur(40px)',
                      height: "100%"
                    },
                  }}
                  className=' '
                >
                  <Box className="lg:w-4/12 sm:w-7/12 w-11/12"
                    sx={styleLoginModal}
                  >
                    {/* <LoginModal creator={creator} assistantData={getAssistantData} closeForm={setOpenLoginModal} /> */}
                    <div className='rounded' style={{ padding: 20, backgroundColor: '#ffffff60' }}>
                      <div className='w-full' style={{}}>
                        <div className='pt-6 px-8 pb-6' style={{ backgroundColor: "#ffffff70", height: "100%" }}>
                          <div className='flex flex-row w-full justify-between items-center'>
                            <div style={{ color: 'black', fontWeight: '400', fontSize: 15, fontFamily: 'inter' }}>
                              Filter
                            </div>
                            <div>
                              <button onClick={() => handleFilterDrawer(false)}>
                                <Image src="/assets/croseBtn.png" alt='cross' height={15} width={15} />
                              </button>
                            </div>
                          </div>
                          <div className='mt-6' style={{ fontWeight: '400', fontSize: 11, fontFamily: 'inter' }}>
                            Range
                          </div>

                          {/* Code for calender input fields */}

                          <div className='mt-1 w-full'>
                            {/* <input className='w-full bg-gray-200' type='text' placeholder='Start Date' /> */}
                            {/* <Calendar onChange={setDate} value={date} /> */}
                            <div className='w-full bg-gray-200 rounded' style={{ position: 'relative', display: 'inline-block' }}>
                              <div className='flex flex-row justify-between items-center w-full' style={{ padding: '10px', backgroundColor: "" }}>
                                <input
                                  className='w-full'
                                  type="text"
                                  placeholder='Start date'
                                  value={date ? formatDate(date) : ''}
                                  onClick={() => setShowCalendar(!showCalendar)}
                                  readOnly
                                  style={{ cursor: 'pointer', width: '150px', backgroundColor: "transparent" }}
                                />
                                <button onClick={() => setShowCalendar(!showCalendar)}>
                                  <CalendarDots size={20} />
                                </button>
                              </div>
                              {showCalendar && (
                                <div style={{ position: 'absolute', zIndex: 100 }}>
                                  <Calendar onChange={handleDateChange} value={date} />
                                </div>
                              )}
                            </div>
                          </div>

                          <div className='mt-4 w-full'>
                            {/* <input className='w-full bg-gray-200' type='text' placeholder='End Date' /> */}
                            <div className='w-full bg-gray-200 rounded' style={{ position: 'relative', display: 'inline-block' }}>
                              <div className='flex flex-row justify-between items-center w-full' style={{ padding: '10px', backgroundColor: "" }}>
                                <input
                                  className='w-full'
                                  type="text"
                                  placeholder='End date'
                                  value={endDate ? formatDate(endDate) : ''}
                                  onClick={() => setEndDateCalendar(!showEndDateCalendar)}
                                  readOnly
                                  style={{ cursor: 'pointer', width: '150px', backgroundColor: "transparent" }}
                                />
                                <button onClick={() => setEndDateCalendar(!showEndDateCalendar)}>
                                  <CalendarDots size={20} />
                                </button>
                              </div>
                              {showEndDateCalendar && (
                                <div style={{ position: 'absolute', zIndex: 100 }}>
                                  <Calendar onChange={handleEndDateChange} value={endDate} />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* <div className='mt-6' style={{ fontWeight: '600', fontSize: 11, fontFamily: 'inter' }}>
                            Produt
                          </div>

                          Dropdown for products
                          <div>
                            <FormControl className='w-full mt-4'>
                              <Select
                                className=' border-none rounded-md'
                                displayEmpty
                                value={productType}
                                onChange={handleProductType}
                                // renderValue={(selected) => {
                                //   if (selected.length === 0) {
                                //     return <em>Select Type</em>;
                                //   }
                                //   return selected;
                                // }}
                                sx={{
                                  backgroundColor: '#EDEDED80',
                                  '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                  },
                                }}
                                MenuProps={{
                                  PaperProps: {
                                    sx: { backgroundColor: '#ffffff' },
                                  },
                                }}
                              >
                                <MenuItem value="none">
                                  <em>Select Product</em>
                                </MenuItem>
                                <MenuItem value="P1">Product 1</MenuItem>
                                <MenuItem value="P2">Product 2</MenuItem>
                                <MenuItem value="P3">Product 3</MenuItem>
                              </Select>
                            </FormControl>
                          </div> */}

                          <div className='flex flex-row items-center'>
                            <div className='w-6/12 flex flex-row justify-center mt-12'>
                              <button
                                onClick={() => {
                                  let Data = {
                                    startDate: date,
                                    endDate: endDate,
                                    product: productType
                                  }
                                  console.log("Data for filters is :", Data);
                                }}
                                className='w-full py-3 w-10/12 bg-none'
                                style={{ fontWeight: '400', fontSize: 15, fontFamily: 'inter', borderRadius: '50px' }}>
                                Reset
                              </button>
                            </div>
                            <div className='w-6/12 flex flex-row justify-center mt-12'>
                              <button
                                onClick={() => {
                                  let Data = {
                                    startDate: date,
                                    endDate: endDate,
                                    product: productType
                                  }
                                  console.log("Data for filters is :", Data);
                                }}
                                className='w-full py-3 w-10/12 bg-purple'
                                style={{ fontWeight: '400', fontSize: 15, fontFamily: 'inter', color: 'white', borderRadius: '50px' }}>
                                Apply
                              </button>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </Box>
                </Modal>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full flex flex-row justify-between mt-10'>
          <div className='w-3/12'>
            <div style={styles.text}>Name</div>
          </div>
          <div className='w-3/12 '>
            <div style={styles.text}>Talk Time</div>
          </div>
          <div className='w-3/12'>
            <div style={styles.text}>Date</div>
          </div>
          <div className='w-2/12'>
            <div style={styles.text}>Amount spent</div>
          </div>
        </div>

        <div className='overflow-auto max-h-[30vh] scrollbar-track-transparent scrollbar-thin scrollbar-thumb-purple'>
          {
            callLoader ?
              <div className='w-full flex flex-row justify-center mt-8'>
                <CircularProgress />
              </div> :
              <div className='w-full'>
                {callsData && callsData.calls && callsData.calls.length > 0 ? callsData.calls.map((item) => (
                  <>
                    <button className='w-full' style={{}} onClick={() => { setOpen(item) }}>
                      <div className='w-full flex flex-row justify-between mt-10' key={item.id}>
                        <div className='w-3/12' style={{}}>
                          <div style={styles.text2}>{item.caller.name}</div>
                        </div>
                        <div className='w-3/12'>
                          <div style={styles.text2}>
                            {item.durationString}
                          </div>
                        </div>
                        <div className='w-3/12 '>
                          <div style={styles.text2}>
                            {/* {formateDate(item.createdAt)} */}
                            {moment(item.createdAt).format('MM/DD/YYYY')}
                          </div>
                        </div>
                        <div className='w-2/12'>
                          <div style={styles.text2}>{item.amount.toFixed(2)}</div>
                        </div>
                      </div>
                      <div className='w-full bg-gray-200 h-0.5 rounded mt-2'></div>
                    </button>
                  </>
                )) : (
                  <div>
                    No calls
                  </div>
                )}
              </div>
          }
        </div>

      </div>

      <div className='w-full'>
        <Drawer
          anchor="right"
          open={open}
          onClose={() => setOpen("")}
          BackdropProps={{ style: { background: 'transparent' } }}
        >
          <div className='mr-5' style={{ width: "25vw", alignItems: 'center', padding: 20, marginTop: 20 }}>
            <div className='w-full flex flex-col mt-8'>
              <div style={{ fontSize: 14, fontWeight: 300, color: '#00000098' }}>
                {formateDate(open.createdAt)}
              </div>
              <div style={{ fontSize: 18, fontWeight: 400, color: '#000000' }}>
                {open && open.caller.name}
              </div>
              <div className='w-full flex flex-row mt-5'>
                <div className='w-6/12'>
                  <div style={{ fontSize: 14, fontWeight: 300, color: '#00000080' }}>
                    Total Spent
                  </div>
                </div>
                <div className='w-6/12 flex-col'>
                  <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 300, color: '#000000' }}>
                    ${open && open.amount.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className='mt-5' style={{ fontSize: 18, fontWeight: 300, color: '#000000' }}>
                KYC
              </div>
              <div className='mt-5' style={{ fontSize: 14, fontWeight: 300, color: '#00000080' }}>
                Name
              </div>
              <div className='mt-3' style={{ fontSize: 14, fontWeight: 400, color: '#000000' }}>
                {open && open.caller.name}
              </div>
              <div className='mt-5' style={{ fontSize: 14, fontWeight: 300, color: '#00000080' }}>
                Age
              </div>
              <div className='mt-3' style={{ fontSize: 14, fontWeight: 400, color: '#000000' }}>
                23
              </div>
              <div className='mt-5' style={{ fontSize: 14, fontWeight: 300, color: '#00000080' }}>
                Favorite Quote
              </div>
              <div className='mt-3' style={{ fontSize: 14, fontWeight: 400, color: '#000000' }}>
                Lorem ipsum dolor sit amet consectetur. Volutpat sit condimentum purus lorem. Praesent odio morbi sit sem risus habitant vitae. Neque aliquam risus gravida vivamus non. Suscipit ut sed elementum ullamcorper varius integer. Sit penatibus posuere.
              </div>
              <div className='w-full flex flex-row items-center gap-2 mt-5'>
                <Image src='/assets/playIcon.png' alt='play'
                  height={32} width={32}
                />
                <div className='' style={{ fontSize: 14, fontWeight: 400, color: '#000000' }}>
                  Call recording 00102042024.mp4
                </div>
              </div>
              <div className='mt-5' style={{ fontSize: 14, fontWeight: 300, color: '#00000080' }}>
                Call log
              </div>
              {/* {
                callLogs.map((item) => (
                  <div className='w-full flex flex-col mt-5'>
                    <div key={item.id} className='w-full flex flex-row items-start gap-2'>
                      <Image src={"/assets/makeCallIcon.png"} alt='call' className='mt-2'
                        height={22} width={16}
                      />
                      <div className='flex flex-col'>
                        <div className='' style={{ fontSize: 14, fontWeight: 400, color: '#000000' }}>
                          {item.date}
                        </div>
                        <div className='' style={{ fontSize: 12, fontWeight: 400, color: '#000000' }}>
                          {item.talkTime}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              } */}
              <div className='w-full flex flex-col mt-2'>
                <div key={open.id} className='w-full flex flex-row items-start gap-2'>
                  <Image src={"/assets/makeCallIcon.png"} alt='call' className='mt-2'
                    height={22} width={16}
                  />
                  <div className='flex flex-col'>
                    <div className='' style={{ fontSize: 14, fontWeight: 400, color: '#000000' }}>
                      {moment(open.createdAt).format('MM/DD/YYYY')} {moment(open.createdAt).format('hh:mm:ss A')}
                    </div>
                    <div className='' style={{ fontSize: 12, fontWeight: 400, color: '#000000' }}>
                      {open?.durationString}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      </div>

    </div>
  );
};

export default Calls;
