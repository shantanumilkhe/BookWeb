import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import '../css/services.css';

const ServicesList = () => {
  let navigate = useNavigate();
  const [service, setService] = useState(null);

  useEffect(() => {
    async function getServiceList() {
      axios.get('/sr/allservices').then(res => {setService(res.data.files)});
    }
    getServiceList();
  }, []);

  return (
    <>
      <div>
        <div className='blogList-wrap'>
        {service?service.map((sub) => <div className='blog-wrap'>
          <header>
            <h1>{sub.name}</h1>
          </header>
          <img src='/assets/images/designer-1.jpg' alt='cover' />
          <p className='blog-desc'>{sub.description}</p>
        </div>):null}
        </div>
      </div>
    </>
  );
};

export default ServicesList;
