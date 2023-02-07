import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import '../../css/serviceCards.css'

const Services = () => {
  let navigate = useNavigate();
  const [service, setService] = useState(null);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

  useEffect(() => {
    async function getServiceList() {
      axiosInstance.get('/sr/allservices').then(res => {setService(res.data.files)});
    }
    getServiceList();
  }, []);

  const listItems = service?service.map((post) => {return (
    <div className="c-card" onClick={()=>navigate('/admin/editservice/'+post.id)}>
        <img classname="cardImage" src={post.images} />
        <div className="c-card__content">
          <h1>{post.name}</h1>
          <p >{post.description}</p>
        
        </div>
      </div>
    )
  }):null
  return <div className="cards-container"> {listItems} </div>
};

export default Services;
