import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import '../../css/serviceCards.scss'

const Services = () => {
  let navigate = useNavigate();
  const [service, setService] = useState(null);

  useEffect(() => {
    async function getServiceList() {
      axios.get('/sr/allservices').then(res => { setService(res.data.files) });
    }
    getServiceList();
  }, []);


  return (
  <div>
    <div className='container'>
      <div className="btn" onClick={() => navigate('/admin/newservice')}>
        <p className="card-text">Add a new service</p>
      </div>
      <div className="cards-container">
        {service ? service.map((post) => {
          return (
            <div className="c-card" onClick={() => navigate('/admin/editservice/' + post.id)}>
              <img classname="cardImage" src={post.images} />
              <div className="c-card__content">
                <h1>{post.name}</h1>
                <p >{post.description}</p>

              </div>
            </div>
          )
        }) : null}
      </div>
    </div>
    </div>
  )
}

    export default Services;
