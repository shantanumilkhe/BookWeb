import React,{useState,useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'
import '../../css/Chapter.css'
const Chapters = () => {
    let navigate = useNavigate();
    const [chapters, setChapter] = useState([]);

    const pageOpen=(id)=>{
        let path = '/viewer/'+id;
        navigate(path)
    }

    useEffect(() => {
        async function getChapters() {
            await axios.get("http://localhost:5000/get/allChapterID").then((res) => { console.log(res.data.files); setChapter(res.data.files) }).catch(err => console.log(err));
        }
        getChapters();
    }, [])

    return (
        <div className="container">
            {chapters.map((chp, idx) => {
                // return <div>
                //     <div className="card text-white bg-info mb-3" onClick={()=>props.onID(chp.googleId)}>
                //         <div className="card-header">Chapter {idx + 1}</div>
                //         <div className="card-body">
                //             <h5 className="card-title">{chp.name}</h5>
                //         </div>
                //     </div>
                // </div>
                return (

                    <div className="card_item">
                        <div className="card_inner">
                            <div className="userName">Chapter {idx + 1}</div>
                            <div className="userUrl">{chp.name}</div>
                            <div className="detail-box">

                            </div>
                            <button className="seeMore" onClick={()=>pageOpen(chp.googleId)}>See More</button>
                        </div>

                    </div>
                )
            })}
        </div>
    )
}

export default Chapters