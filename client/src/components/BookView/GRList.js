import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const GRList = () => {
  let navigate = useNavigate();
  const [chapters, setChapter] = useState([]);

  const pageOpen = (id) => {
    let path = '/viewer/' + id;
    navigate(path)
  }

  useEffect(() => {
    async function getChapters() {
      await axios.get("/gr/allgrID").then((res) => {console.log(res.data); setChapter(res.data.files) }).catch(err => console.log(err));
    }
    getChapters();
  }, [])
  return (
    <div>
      <div className="container">
        <div className="wrapper">
          <div className="accordion ">
            {chapters==null?null:
            <div>
            {chapters.map((chp, idx) => {
              return <div className="item" onClick={() => pageOpen(chp.googleId)}>

                <div className="title">
                  <h2>{chp.name}</h2>
                </div>
              </div>
            })}
            </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GRList