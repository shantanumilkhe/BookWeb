import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const ServicesEdit = () => {
  let id= useParams();
  const [info, setInfo] = useState({ name: null, description: null, serviceNo: null })
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState(null);
  const handleFile = async (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  let name, value;

  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setInfo({ ...info, [name]: value })
  }

  const handleDelete = async () => {
    await axios.delete('/sr/deleteservice/' + id.id)
      .then((res) => setMessage('Success'))
      .catch((err) => (setMessage(err.message)));
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    var FormData = require('form-data');
    var formData = new FormData();

    formData.append("images", image);
    formData.append('serviceNo', info.serviceNo);
    formData.append("name", info.name);
    formData.append('description', info.description);
    console.log(formData)

    await fetch("/sr/updateservice/"+id.id, {
      method: 'PUT',
      body: formData,
    })
      .then((res) => setMessage('Success'))
      .catch((err) => (setMessage(err.message)));
  }
  useEffect(() => {
    async function getServiceInfo(){
      axios.get('/sr/serviceData/'+id.id).then(res=>
        setInfo({name:res.data.name,description:res.data.description,serviceNo:res.data.serviceNo})).catch(err=>console.log(err));
    }
    getServiceInfo();
  }, [])
  
  return (
    <div>
      {message == null ? null : <div class="alert alert-warning" role="alert">
        {message}
      </div>}
      <form className='react-form'>
        <h1>Add New Service</h1>

        <fieldset className='form-group'>
          <h4>Service number</h4>

          <input id='formName' className='form-input' name='serviceNo' type='number' defaultValue={info.serviceNo} required onChange={handleChange} />
        </fieldset>

        <fieldset className='form-group'>
          <h4>Service Name:</h4>

          <input id='formName' className='form-input' name='name' type='text' defaultValue={info.name} required onChange={handleChange} />
        </fieldset>

        <fieldset className='form-group'>
          <h4>Service Description:</h4>
          <textarea type="" id='formMessage' className='form-textarea' name='description' defaultValue={info.description} required onChange={handleChange} cols="30" rows="10"></textarea>
        </fieldset>

        <div>
          <input
            type="file"
            placeholder="insert image here"
            onChange={(e) => handleFile(e)}
          />
        </div>

        <div className='form-group row'>
          <input id='formButton' className='btn col' type='submit' placeholder='Send message' onClick={handleSubmit} />
          <input id='formButton' className='btn col' type='text' value={"Delete"} placeholder='Delete' onClick={handleDelete} />
        </div>
      </form>
    </div>
  )
}

export default ServicesEdit