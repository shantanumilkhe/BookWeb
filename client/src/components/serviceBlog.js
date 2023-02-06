import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import '../css/blog.css'


const ServiceView = () => {
    let id = useParams();
    const [blog, setBlog] = useState(null);
    useEffect(() => {
        async function getBlogList() {
            await axios.get('/sr/serviceData/' + id.id).then(res => { console.log(res.data); setBlog(res.data) });
        }
        getBlogList();
    }, []);

    return (
        <div>
            {blog ?
                <div className='blogs-container'>

                    <h1 className='blogh1'>{blog.name}</h1>
                    <img className='slide-content' src={blog.images.url} />
                    <p className='para'>{blog.description}</p>

                </div> : null}
        </div>

    )

}

export default ServiceView;