import React from 'react'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
    let navigate = useNavigate();
    return (
        <div className='row'>
            <div className="card col" onClick={()=>navigate('/admin/book')}>
                <img className="card-img-top" src="..." alt="Card image cap"/>
                    <div className="card-body">
                        <p className="card-text">Book</p>
                    </div>
            </div>
            <div className="card col" onClick={()=>navigate('/admin/gr')}>
                <img className="card-img-top" src="..." alt="Card image cap"/>
                    <div className="card-body">
                        <p className="card-text">GR</p>
                    </div>
            </div>
        </div>
    )
}

export default Dashboard