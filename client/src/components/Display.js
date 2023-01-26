import React,{useState} from 'react'
import Chapters from './BookView/Chapters'
import Viewer from './BookView/Fetch'
const Display = () => {
    const [val,setVal] = useState(null);

    const handleID = (ID) => {
        setVal(ID);
    }

    return (
        <div>
            <Chapters onID={handleID}/>
            <div class="row align-items-start">
                <div class="col-3">
                    
                </div>
                <div class="col">
                    {/* <Viewer id={val}/> */}
                </div>
            </div>
        </div>
    )
}

export default Display