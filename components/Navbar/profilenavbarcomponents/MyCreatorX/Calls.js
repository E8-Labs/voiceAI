'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Drawer from '@mui/material/Drawer';
import moment from 'moment';
import Apis from '@/components/apis/Apis';

const Calls = () => {
  const [open, setOpen] = useState('');
  const [callsData, setCallsData] = useState({ calls: [] }); // Initialize with an empty array

  const styles = {
    inputContainer: {
      marginTop: 30,
      display: "flex",
      alignItems: "center",
      backgroundColor: "#EDEDED40", /* Light grey background */
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

  return (
    <div className='w-full flex flex-col pl-10 pt-10'
      style={{ height: '90vh', overflow: "auto", scrollbarWidth: "none", msOverflowStyle: 'none', }}>
      <div style={{ fontSize: 24, color: '#00000' }}>My Calls</div>
      <div className='w-full flex flex-col'>
        <div className='w-full flex flex-row justify-between items-center mt-10'>
          <div className='w-4/12 pl-8'>
            <div style={styles.text}>Total calls</div>
            <div style={{ fontSize: 30, color: '#000000' }}>{callsData.totalCalls}</div>
          </div>
          <div className='w-4/12 '>
            <div style={{ fontSize: 12, color: '#00000090' }}>Total Talk Time</div>
            <div className='flex flex-row  items-center'>
              <div style={{ fontSize: 30, color: '#000000' }}>{callsData.totalMinutes}</div>
              <div style={{ fontSize: 24, color: '#00000095', fontWeight: 200 }}>Mins</div>
            </div>
          </div>
          <div className='w-4/12'>
            <div style={{ fontSize: 12, color: '#00000090' }}>Revenue</div>
            <div className='flex flex-row items-center'>
              <div style={{ fontSize: 30, color: '#000000' }}>${callsData.revenue}</div>
            </div>
          </div>
        </div>

        <div className='w-6/12 flex flex-col items-center'>
          <div className='w-full rounded' style={styles.inputContainer}>
            <input
              className='w-8/12'
              style={styles.input}
              placeholder="Search caller"
            />
            <Image src={"/assets/searchIcon.png"} width={20} height={20} />
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
    </div>
  );
};

export default Calls;
