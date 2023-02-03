import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'


const ServiceView = () => {
    let id = useParams();
    const [blog, setBlog] = useState(null);
    useEffect(() => {
        async function getBlogList() {
            await axios.get('/sr/serviceData/' + id.id).then(res => { console.log(res.data);setBlog(res.data) });
        }
        getBlogList();
    }, []);

    return (
        <div>
            {blog?
            <div>
            <div class="header">
                <div class="sides">
                  
                </div>
                <div class="sides"> <a href="#" class="menu"> </a></div>
                <div class="info">
                    <h1>{blog.name}</h1>
                </div>
            </div>
            <img src={blog.images.url} alt='Service Image'/>
            <div>
                <p>{blog.description}</p>
            </div>
            </div>:null}
        </div>

    )

}

export default ServiceView;