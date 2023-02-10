import React, {useState, useEffect}from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import axios from 'axios';

function HeroSection() {
  let navigate = useNavigate();
  const[gr, setGR] = useState(null);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});
  useEffect(() => {
    async function getGR() {
      axiosInstance.get(`/get/latestgr`).then((res) => { setGR(res.data.files) }).catch(err => console.log(err));
    }
    getGR();
  }, [])
  return (
    <div className='hero-container'>
      {/* <video src='/videos/video-2.mp4' autoPlay loop muted /> */}
      {/* <img src='/images/160.jpg' alt='47' /> */}
      <div className="element1"> <h1 className='homePage'>Maha TP Consultant</h1>
      <p>Maharashtra Town Planning Consultant</p></div>
     
     <div className="element2">
      <h1 >Latest GR</h1>
    </div>
     
      {/* <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          Read Book
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          WATCH TRAILER <i className='far fa-play-circle' />
        </Button>
      </div> */}
    </div>
  );
}

export default HeroSection;
