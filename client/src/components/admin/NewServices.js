import React, { useState } from 'react'
const NewServices = () => {
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


  const handleSubmit = async (e) => {
    e.preventDefault()
    var FormData = require('form-data');
    var formData = new FormData();

    formData.append("images", image);
    formData.append('serviceNo', info.serviceNo);
    formData.append("name", info.name);
    formData.append('description', info.description);


    await fetch("/sr/addservice", {
      method: 'POST',
      body: formData,
    })
      .then((res) => setMessage('Success'))
      .catch((err) => (setMessage(err.message)));

  }
  return (
    <div>
      {message == null ? null : <div class="alert alert-warning" role="alert">
        {message}
      </div>}
      <form className='react-form'>
        <h1>Add New Service</h1>

        <fieldset className='form-group'>
          <h4>Service number</h4>

          <input id='formName' className='form-input' name='serviceNo' type='number' value={info.serviceNo} required onChange={handleChange} />
        </fieldset>

        <fieldset className='form-group'>
          <h4>Service Name:</h4>

          <input id='formName' className='form-input' name='name' type='text' value={info.name} required onChange={handleChange} />
        </fieldset>

        <fieldset className='form-group'>
          <h4>Service Description:</h4>
          <textarea type="" id='formMessage' className='form-textarea' name='description' value={info.description} required onChange={handleChange} cols="30" rows="10"></textarea>
        </fieldset>

        <div>
          <input
            type="file"
            placeholder="insert image here"
            onChange={(e) => handleFile(e)}
          />
        </div>

        <div className='form-group'>
          <input id='formButton' className='btn' type='submit' placeholder='Send message' onClick={handleSubmit} />
        </div>
      </form>
    </div>
  )
}

export default NewServices