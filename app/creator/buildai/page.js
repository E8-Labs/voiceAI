'use client'
import { useState } from "react";

export default function Home() {

    const [currentIndex, setCurrentIndex] = useState(null);

    const handleCurrentIndex = (id) => {
        setCurrentIndex(id);
    }

    return (
        <div className='w-full' style={{ height: "100vh", display: 'flex', alignItems: "center", width: "", overflow: "hidden" }}>
            {/* <div>hello</div> */}
        </div>
    );
}
