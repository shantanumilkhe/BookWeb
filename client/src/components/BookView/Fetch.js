import React, { useEffect, useState,createRef } from "react";

const Fetch = (props) => {
  const [pdfFile, setPdfFile] = useState(null);
  
  const [urls,setURL] =useState(null);
  async function getFile(id) {
    try {
        const response = await fetch('http://localhost:5000/drive/'+id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/octet-stream'
            },
            responseType: 'blob'
        });
        setURL(response.url);
        setPdfFile(response.url)
        const fileBlob = await response.blob();
        return fileBlob;
    } catch (error) {
        console.error(error);
    }
  }
  useEffect(() => {
    getFile(props.id);
  }, [props.id])
  
  let url = urls+'#toolbar=0'
  return (
    <div>
      <iframe src={url} frameborder="0" width="100%" height="580px"></iframe> 
      {/* <iframe src={pdfFile} frameborder="0" width="100%" height="580px"></iframe> */}
    </div>
  );
}

export default Fetch