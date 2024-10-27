import React, { useState } from 'react'
import CommunicaionInstruction from './CommunicaionInstruction';
import Demeanor from './Demeanor';
import ImpersonalSkills from './ImpersonalSkills';
import CommunicationStyle from './CommunicationStyle';

const CommunicationSetting = ({ recallApi, aiData }) => {

    const [selectedMenu, setSelectedMenu] = useState(1);

    const menuItems = [
        {
            id: 1,
            menuItem: 'Communication Instruction'
        },
        {
            id: 2,
            menuItem: 'Demeanor'
        },
        {
            id: 3,
            menuItem: 'Interpersonal Skills'
        },
        {
            id: 4,
            menuItem: 'Communication Style'
        },
    ];

    return (
        <div className='w-full flex flex-row'>
            <div className='w-3/12'>
                {
                    menuItems.map((item) => (
                        <div key={item.id} className='mt-6' style={{
                            fontWeight: "500", fontSize: 15, fontFamily: "inter",
                            color: selectedMenu === item.id ? "#552AFF" : "#000000"
                        }}>
                            <button style={{ textAlign: "start" }} onClick={() => { setSelectedMenu(item.id) }}>
                                {item.menuItem}
                            </button>
                        </div>
                    ))
                }
            </div>
            <div className='w-8/12'>
                {
                    selectedMenu === 1 ? (
                        <CommunicaionInstruction recallApi={recallApi} aiData={aiData} />
                    ) : selectedMenu === 2 ? (
                        <Demeanor recallApi={recallApi} aiData={aiData} />
                    ) : selectedMenu === 3 ? (
                        <ImpersonalSkills recallApi={recallApi} aiData={aiData} />
                    ) : selectedMenu === 4 ? (
                        <CommunicationStyle recallApi={recallApi} aiData={aiData} />
                    ) : ""
                }
            </div>
        </div>
    )
}

export default CommunicationSetting