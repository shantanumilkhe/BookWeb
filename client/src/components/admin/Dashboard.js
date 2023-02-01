import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../css/Cards.css';
import CardItem from '../../css/CardItem';

const Dashboard = () => {
    let navigate = useNavigate();
    return (
        // <div className='row'>
        //     <div className="card col" onClick={()=>navigate('/admin/book')}>
        //         <img className="card-img-top" src="..." alt="Card image cap"/>
        //             <div className="card-body">
        //                 <p className="card-text">Book</p>
        //             </div>
        //     </div>
        //     <div className="card col" onClick={()=>navigate('/admin/gr')}>
        //         <img className="card-img-top" src="..." alt="Card image cap"/>
        //             <div className="card-body">
        //                 <p className="card-text">GR</p>
        //             </div>
        //     </div>
        // </div>
        <div className='cards'>
      <h1>Admin DashBoard</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='/images/2.png'
              text='Update your Book with the latest changes'
              label='Book'
              path='/admin/book'
            />
            <CardItem
              src='/images/1.png'
              text='update your GR with the latest changes'
              label='GR'
              path='/admin/gr'
            />
            <CardItem
              src='/images/1.png'
              text='Services'
              label='SERVICES'
              path='/admin/services'
            />
          </ul>
        </div>
      </div>
    </div>
    )
}

export default Dashboard