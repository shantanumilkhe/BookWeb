import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../css/Chapter.css'
import '../../css/bookIndex.css'

function romanize(num) {
    var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
    for ( i in lookup ) {
      while ( num >= lookup[i] ) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  }
  
const Chapters = () => {
    let navigate = useNavigate();
    const [chapters, setChapter] = useState([]);
    const [selected, setSelected] = useState(null);
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    });

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
        window.scrollTo(0, 0)
      }, [])

    useEffect(() => {
        async function getChapters() {
            await axiosInstance.get("/get/allChapterID").then((res) => { console.log(res.data.files); setChapter(res.data.files) }).catch(err => console.log(err));
        }
        getChapters();
    }, [])
    const sortedChapters = chapters.sort((a, b) => {
        return a.chapterNo - b.chapterNo;
      });


    return (
        <div className="container">
            <div className="wrapper">
                <div className="accordion ">
                    {sortedChapters.map((chp, idx) => {
                        return <div className="item">
                            <div className="title">

                                <h2 onClick={() => toogle(idx)}>{romanize(chp.chapterNo)}</h2>
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
    )
}

export default Chapters