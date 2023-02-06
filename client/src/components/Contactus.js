import React,{useState} from 'react'
import axios from 'axios';
const Contactus = () => {

    const [info, setInfo] = useState({ name: null,email:null, description: null })
    const [message,setMessage] = useState(null);
  
    let name, value;
  
    const handleChange = (e) => {
      name = e.target.name;
      value = e.target.value;
      setInfo({ ...info, [name]: value })
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
        console.log(info);
    //   await axios.post("/", info)
    //   .then((res) => setMessage('Success'))
    //   .catch((err) => (setMessage(err.message)));
    }

    return (
        <div>
          {message == null ? null : <div class="alert alert-warning" role="alert">
            {message}
          </div>}
        <form className='react-form'>
          <h1>Contact Us</h1>
    
          <fieldset className='form-group'>
            <h4>Name</h4>
    
            <input id='formName' className='form-input' name='name' type='text' value={info.name} required onChange={handleChange} />
          </fieldset>
    
          <fieldset className='form-group'>
            <h4>Email:</h4>
    
            <input id='formName' className='form-input' name='email' type='text' value={info.email} required onChange={handleChange} />
          </fieldset>
    
          <fieldset className='form-group'>
            <h4>What you would like to say?</h4>
              <textarea type="" id='formMessage' className='form-textarea' name='description' value={info.description} required onChange={handleChange} cols="30" rows="10"></textarea>
          </fieldset>
    
          <div className='form-group'>
            <input id='formButton' className='btn' type='submit' placeholder='Send message' onClick={handleSubmit} />
          </div>
        </form>
        </div>
      )
}

export default Contactus