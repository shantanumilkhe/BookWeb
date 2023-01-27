import React, { useEffect, useState,createRef } from "react";

const Viewer = () => {
  const [pdf,setFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const handleFile = async (e) => {
    const file = e.target.files[0];
    let url = URL.createObjectURL(file);
    setFile(file);
    setPdfFile(url);
  };

  const sendFile = async () => {
    var FormData = require('form-data');
    var formData = new FormData();

    formData.append("document",pdf);
    // await axios.post('http://localhost:5000/drive/upload', formData).then(res => { console.log(res) });
    console.log(formData.get("file"));
    await fetch("http://localhost:5000/drive/upload", {
        method: 'POST',
        body: formData,
        
    })
        .then((res) => console.log(res))
        .catch((err) => ("Error occured", err));
  }
  return (
    <div>
      <div>
        <input
          type="file"
          accept="application/pdf"
          placeholder="insert PDF here"
          onChange={(e) => handleFile(e)}
        />
        <button type='button' onClick={sendFile}>Upload</button>
        {pdfFile!=null?<div><iframe src={pdfFile} width='100%' height={window.innerHeight}></iframe></div>:null}
      </div>

    </div>
  );
}

export default Viewer