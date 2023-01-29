import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../css/Chapter.css'
import '../../css/bookIndex.css'
const GR = () => {
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
        let path = '/admin/editgr/' + id;
        navigate(path)
    }

    useEffect(() => {
        async function getChapters() {
            await axios.get("/get/allChapterID").then((res) => { console.log(res.data.files); setChapter(res.data.files) }).catch(err => console.log(err));
        }
        getChapters();
    }, [])

  return (
    <div>
        <div className='row'>
            <div className="card col" onClick={()=>navigate('/admin/newgr')}>
                <img className="card-img-top" src="..." alt="Card image cap"/>
                    <div className="card-body">
                        <p className="card-text">New GR</p>
                    </div>
            </div>
        </div>
        <div className="container">
            <div className="wrapper">
                <div className="accordion ">
                    {chapters.map((chp, idx) => {
                        return <div className="item">

                            <div className="title">

                                <h2 onClick={() => toogle(idx)}>{chp.chapterNo}</h2>
                                <h2 onClick={() => toogle(idx)}>{chp.name}</h2>
                                <span onClick={() => toogle(idx)}>{selected == idx ? "-" : "+"}</span>
                            </div>
                            <div className={selected == idx ? 'content show' : "content"}><button className="seeMore" onClick={() => pageOpen(chp.id)}>Read</button>
                            {chp.chapterIndex.map((chpIdx, idx) => {
                                return <div>
                                    {chpIdx}
                                </div>
                            })}
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default GR