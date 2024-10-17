import React, { useState } from 'react'
import ValuesandBeliefs from './ValuesandBeliefs';
import PersonalityTraits from './PersonalityTraits';
import Philosophy from './Philosophy';

const AiCharacteristicSeeting = ({ recallApi, aiData }) => {

    const [selectedMenu, setSelectedMenu] = useState(1)

    const advancedSeetings = [
        {
            id: 1,
            title: "Personal Background"
        },
        {
            id: 2,
            title: "Values & Beliefs"
        },
        {
            id: 3,
            title: "Personality Traits"
        },
        {
            id: 4,
            title: "Philosophies & Views"
        },
    ];

    return (
        <div className='w-full flex flex-row'>
            <div className='w-3/12'>
                {
                    advancedSeetings.map((item, index) => (
                        <div className='mt-6' style={{ fontWeight: "500", fontSize: 15, fontFamily: "inter", color: selectedMenu === item.id ? "#552AFF" : "#000000" }}>
                            <button onClick={() => { setSelectedMenu(item.id) }}>
                                {item.title}
                            </button>
                        </div>
                    ))
                }
            </div>
            <div className='w-8/12'>
                {
                    selectedMenu === 1 ? (
                        "Personal bg"
                    ) : selectedMenu === 2 ? (
                        <ValuesandBeliefs recallApi={recallApi} aiData={aiData} />
                    ) : selectedMenu === 3 ? (
                        <PersonalityTraits recallApi={recallApi} aiData={aiData} />
                    ) : selectedMenu === 4 ? (
                        <Philosophy recallApi={recallApi} aiData={aiData} />
                    ) : ""
                }
            </div>
        </div>
    )
}

export default AiCharacteristicSeeting
