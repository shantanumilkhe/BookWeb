import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'


const blog = () => {
    // let id = useParams();
    // const [blog, setBlog] = useState(null);
    // useEffect(() => {
    //     async function getBlogList() {
    //         axios.get('/sr/serviceData/' + id).then(res => { setBlog(res.data.files) });
    //     }
    //     getBlogList();
    // }, []);

    return (
        <div>
            <div class="header">
                <div class="sides">
                  
                </div>
                <div class="sides"> <a href="#" class="menu"> </a></div>
                <div class="info">
                  
                    <h1>KEN BURNS HEADERS ARE THE BEST</h1>
                   
                </div>
            </div>
            <section class="content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisl turpis, porttitor et finibus id, viverra a metus. Praesent non ante sed orci posuere varius quis sit amet dui. Cras molestie magna orci, id gravida dolor molestie in. Duis sollicitudin turpis quis tortor egestas, ut ultrices nisl elementum. Vestibulum sed ipsum eget nulla laoreet cursus in ac sem. Integer a suscipit justo, quis aliquam sapien. Maecenas et tellus nibh. Vivamus tincidunt eros id commodo pellentesque.</p>
                
            </section>
        </div>

    )

}

export default blog;