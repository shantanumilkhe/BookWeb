import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../../css/uploader.css'

const GREdit = () => {
    let id = useParams();
  const [info, setInfo] = useState({ name: null, number: null })
  const [pdf,setPDF] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [message,setMessage] = useState(null);
  const [gid, setgid] = useState(null);
  const handleFile = async (e) => {
    const file = e.target.files[0];
    let url = URL.createObjectURL(file);
    setPDF(file);
    setPdfFile(url);
  };

  let name, value;

  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setInfo({ ...info, [name]: value })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    var FormData = require('form-data');
    var formData = new FormData();

    formData.append("document", pdf);
    formData.append('chapterNO',info.number);
    formData.append("title", info.name);


    await fetch('/'+id.id, {
      method: 'POST',
      body: formData,
    })
    .then((res) => setMessage('Success'))
    .catch((err) => (setMessage(err.message)));

  }

  const handleDelete = async ()=>{
    await axios.delete('/gr/deletegr/'+id.id)
    .then((res) => setMessage('Success'))
    .catch((err) => (setMessage(err.message)));
  }

  useEffect(() => {
    async function getDetails(){
        await axios.get('/gr/getGRData/'+id.id).then(res=>{
          console.log(res.data)
          setInfo({name:res.data.name,number:res.data.number});
          setgid(res.data.googleId);
        }).catch(err=>console.log(err))
    }
    getDetails();
  }, [])
  
  return (
    <div>
      {message == null ? null : <div class="alert alert-warning" role="alert">
        {message}
      </div>}
    <form className='react-form'>
      <h1>Upload GR File</h1>

      <fieldset className='form-group'>
        <h4>GR number</h4>

        <input id='formName' className='form-input' name='number' type='number' defaultValue={info.number} required onChange={handleChange} />
      </fieldset>

      <fieldset className='form-group'>
        <h4>GR Name:</h4>

        <input id='formName' className='form-input' name='name' type='text' defaultValue={info.name} required onChange={handleChange} />
      </fieldset>

      <div>
        <input
          type="file"
          accept="application/pdf"
          placeholder="insert PDF here"
          onChange={(e) => handleFile(e)}
        />
        {pdfFile != null ? <div><iframe src={pdfFile} width='100%' height={window.innerHeight}></iframe></div> : null}
      </div>

      <div className='form-group row'>
        <input id='formButton' className='btn col' type='submit' placeholder='Send message' onClick={handleSubmit} />
        <input id='formButton' className='btn col' type='delete' placeholder='Delete' onClick={handleDelete} />
      </div>
    </form>
    </div>
  )

}

export default GREdit;