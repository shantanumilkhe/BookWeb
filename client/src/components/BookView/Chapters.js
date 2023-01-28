import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../css/Chapter.css'
import '../../css/bookIndex.css'
const Chapters = () => {
    let navigate = useNavigate();
    const [chapters, setChapter] = useState([]);
    const [selected, setSelected] = useState(null);

    const toogle = (id) => {
        if (selected === id) {
            return setSelected(null);
        }
        setSelected(id);
    }
    const pageOpen = (id) => {
        let path = '/viewer/' + id;
        navigate(path)
    }

    useEffect(() => {
        async function getChapters() {
            await axios.get("http://localhost:5000/get/allChapterID").then((res) => { console.log(res.data.files); setChapter(res.data.files) }).catch(err => console.log(err));
        }
        getChapters();
    }, [])



    return (
        // <div className="container">
        //     {chapters.map((chp, idx) => {
        //         // return <div>
        //         //     <div className="card text-white bg-info mb-3" onClick={()=>props.onID(chp.googleId)}>
        //         //         <div className="card-header">Chapter {idx + 1}</div>
        //         //         <div className="card-body">
        //         //             <h5 className="card-title">{chp.name}</h5>
        //         //         </div>
        //         //     </div>
        //         // </div>
        //         return (

        //             // <div className="card_item">
        //             //     <div className="card_inner">
        //             //         <div className="userName">Chapter {idx + 1}</div>
        //             //         <div className="userUrl">{chp.name}</div>
        //             //         <div className="detail-box">

        //             //         </div>
        //             //         <button className="seeMore" onClick={()=>pageOpen(chp.googleId)}>See More</button>
        //             //     </div>
        //             // </div>


        //         )
        //     })}
        // </div>
        <div className="container">
            <div className="wrapper">
                <div className="accordion">
                    {chapters.map((chp, idx) => {
                        return <div className="item">

                            <div className="title">

                                <h2 onClick={() => toogle(idx)}>Chapter-{idx + 1}</h2>
                                <h2 onClick={() => toogle(idx)}>ADMINISTRATION</h2>
                                {/* <button className="seeMore" onClick={() => pageOpen(chp.googleId)}>See More</button> */}
                                <span onClick={() => toogle(idx)}>{selected == idx ? "-" : "+"}</span>
                            </div>
                            <div className={selected == idx ? 'content show' : "content"}><button className="seeMore" onClick={()=>pageOpen(chp.googleId)}>Read</button>
                                1.0
Short Title, Extent and Commencement
<br />
1.1 
Extent and Jurisdiction
<br />
1.2
Commencement of Regulations
<br />
1.3 
Definitions
<br />
1.4
Applicability of Regulations
<br />
1.5 
Saving
<br />
1.6
Applicability of Other Regulations
<br />
1.7 *
Power to Prescribe the Proformas
<br />
1.8
Power to Decide Charges
<br />
1.9
Meanings as in Acts, Rules & Interpretations
<br />
1.10
Removal of Difficulties
</div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Chapters