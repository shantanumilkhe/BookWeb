import React, { useEffect,useState } from 'react'
import axios from "axios";
const Display = () => {
    const [chapters,setChapter] = useState([]);
    useEffect(() => {
        async function getChapters() {
            await axios.get("http://localhost:5000/get/allChapterID").then((res) => 
            {console.log(res.data.files);setChapter(res.data.files)}).catch(err => console.log(err));
        }
        getChapters();
    }, [])

    return (
        <div>
            {chapters.map((chp)=>{
                return <div>{chp.googleId}</div>
            })}
        </div>
    )
}

export default Display