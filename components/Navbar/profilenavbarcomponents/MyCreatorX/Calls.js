'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Drawer from '@mui/material/Drawer';
import moment from 'moment';
import Apis from '@/components/apis/Apis';
// import { FormControl, MenuItem, Select } from '@mui/material';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Calls = () => {
  const [open, setOpen] = useState('');
  const [callsData, setCallsData] = useState({ calls: [] });

  const styles = {
    inputContainer: {
      // marginTop: 30,
      display: "flex",
      alignItems: "center",
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
      paddingLeft: '10px',
      color: '#000', // Ensure text is black
    },
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
  };

  const callDetails = [
    { id: 1, name: "Rayna Passaquindici Arcand", talkTime: '2mins 19sec', date: '21.12.2024 01:25', amount: '$1.0' },
    { id: 2, name: "Gretchen Workman", talkTime: '2mins 19sec', date: '21.12.2024 01:25', amount: '$1.0' },
    { id: 3, name: "Zain Baptista", talkTime: '2mins 19sec', date: '21.12.2024 01:25', amount: '$1.0' },
    { id: 4, name: "Jordyn Korsgaard", talkTime: '2mins 19sec', date: '21.12.2024 01:25', amount: '$1.0' },
    { id: 5, name: "Lincoln Stanton", talkTime: '2mins 19sec', date: '21.12.2024 01:25', amount: '$1.0' },
  ];

  const callLogs = [
    {
      id: 1,
      date: '21.12.2024 01:25pm',
      talkTime: '12mins 30sec'
    }, {
      id: 2,
      date: '21.12.2024 01:25pm',
      talkTime: '12mins 30sec'
    }, {
      id: 3,
      date: '21.12.2024 01:25pm',
      talkTime: '12mins 30sec'
    },
  ]

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
  }

  const formateDate = (date) => {
    let formatedDate = moment(date).format("DD.MM.YYYY hh:mmA").toLowerCase()
    return formatedDate
  }

  //open drawer
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const [productType, setProductType] = useState('none');

  const handleFilterDrawer = (status) => {
    setOpenFilterDrawer(status);
  };

  const handleProductType = (e) => {
    setProductType(e.target.value);
  }

  return (
    <div className='w-full flex flex-col pl-10 pt-10'
      style={{ height: '90vh', overflow: "auto", scrollbarWidth: "none", msOverflowStyle: 'none', }}>

      <div className='w-7/12 px-6 py-4 rounded-2xl' style={{ backgroundColor: "#ffffff40" }}>
        <div style={{ fontSize: 24, color: '#00000' }}>
          Cal Stat
        </div>

        <div className='w-full flex flex-row justify-between items-center mt-10'>
          <div className='w-4/12 pl-4'>
            <div style={styles.text}>Total calls</div>
            <div style={{ fontSize: 30, color: '#000000' }}>{callsData.totalCalls}</div>
          </div>
          <div className='w-4/12 '>
            <div style={{ fontSize: 12, color: '#00000090' }}>Total Talk Time</div>
            <div className='flex flex-row  items-center'>
              <div style={{ fontSize: 30, color: '#000000' }}>{callsData.totalMinutes}</div>
              <div style={{ fontSize: 15, color: '#00000095', fontWeight: 200 }}>Mins</div>
            </div>
          </div>
          <div className='w-4/12'>
            <div style={{ fontSize: 12, color: '#00000090' }}>Revenue</div>
            <div className='flex flex-row items-center'>
              <div style={{ fontSize: 30, color: '#000000' }}>${callsData.revenue}</div>
            </div>
          </div>
        </div>
      </div>

      <div className='w-7/12 mt-8 px-6 py-8 rounded-2xl' style={{ backgroundColor: "#ffffff40" }}>
        <div className='w-full flex flex-row items-center justify-center gap-4'>
          <div className='w-full rounded' style={styles.inputContainer}>
            <input
              className='w-8/12'
              style={styles.input}
              placeholder="Search caller"
            />
            <Image src={"/assets/searchIcon.png"} width={20} height={20} />
          </div>
          <button onClick={() => handleFilterDrawer(true)} className='text-purple' style={{ fontWeight: "400", fontFamily: "inter", fontSize: 15 }}>
            Filter
          </button>
          <Drawer open={openFilterDrawer} onClose={() => handleFilterDrawer(false)}
            anchor='right'
            sx={{ '& .MuiDrawer-paper': { width: '30%' } }}>
            <div className='pt-6 px-8' style={{ backgroundColor: "#ffffff70", height: "100%" }}>
              <div className='flex flex-row w-full justify-between items-center'>
                <div style={{ color: 'black', fontWeight: '400', fontSize: 15, fontFamily: 'inter' }}>
                  Filter
                </div>
                <div>
                  <button onClick={() => handleFilterDrawer(false)}>
                    <Image src="/assets/crossBtn2.png" alt='cross' height={15} width={15} />
                  </button>
                </div>
              </div>
              <div className='mt-6' style={{ fontWeight: '600', fontSize: 11, fontFamily: 'inter' }}>
                Range
              </div>

              <div className='mt-4 w-full'>
                <input className='w-full bg-gray-200' type='text' placeholder='Start Date' />
              </div>

              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="Basic date picker" />
                </DemoContainer>
              </LocalizationProvider> */}

              <div className='mt-4 w-full'>
                <input className='w-full bg-gray-200' type='text' placeholder='End Date' />
              </div>

              <div className='mt-6' style={{ fontWeight: '600', fontSize: 11, fontFamily: 'inter' }}>
                Produt
              </div>

              {/* Dropdown for products */}
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
              </div>

              <div className='w-full flex flex-row justify-center mt-12'>
                <button className='w-full py-3 w-10/12 bg-purple'
                  style={{ fontWeight: '400', fontSize: 15, fontFamily: 'inter', color: 'white', borderRadius: '50px' }}>
                  Apply Filter
                </button>
              </div>

            </div>
          </Drawer>
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

        {callsData && callsData.calls && callsData.calls.length > 0 ? callsData.calls.map((item) => (
          <>
            <button className='w-full' style={{}} onClick={() => { setOpen(item) }}>
              <div className='w-full flex flex-row justify-between mt-10' key={item.id}>
                <div className='w-3/12' style={{}}>
                  <div style={styles.text2}>{item.caller.name}</div>
                </div>
                <div className='w-3/12'>
                  <div style={styles.text2}>{item.talkTime}</div>
                </div>
                <div className='w-3/12 '>
                  <div style={styles.text2}>{formateDate(item.createdAt)}</div>
                </div>
                <div className='w-2/12'>
                  <div style={styles.text2}>{item.caller.earned}</div>
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
                    ${open && open.caller.earned}
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
                <Image src={'/assets/playBtn.png'} alt='play'
                  height={32} width={32}
                />
                <div className='' style={{ fontSize: 14, fontWeight: 400, color: '#000000' }}>
                  Call recording 00102042024.mp4
                </div>
              </div>
              <div className='mt-5' style={{ fontSize: 14, fontWeight: 300, color: '#00000080' }}>
                Call log
              </div>
              {
                callLogs.map((item) => (
                  <div className='w-full flex flex-col mt-5'>
                    <div key={item.id} className='w-full flex flex-row items-start gap-2'>
                      <Image src={"/assets/callIcon.png"} alt='call'
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
              }
            </div>
          </div>
        </Drawer>
      </div>

    </div>
  );
};

export default Calls;
