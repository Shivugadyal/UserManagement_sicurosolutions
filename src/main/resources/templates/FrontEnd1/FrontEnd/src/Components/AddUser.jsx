import React, { useState } from 'react';
import axios from 'axios';

import './AddUser.css';

const AddUser = () => {
  const[userName,setUserName]=useState('')
  const[firstName,setFirstName]=useState('')
  const[lastName,setLastName]=useState('')
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')

  const [errors] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [success, setSuccess] = useState(''); 
  const [serverError, setServerError] = useState('');

  const handleClick = async (e) => {
    e.preventDefault();

    const user = {
      userName,
      firstName,
      lastName,
      email,
      password
    };

    const Username = "shivumg";
    const Password = "Shivu@1973";

    // Configure axios with base settings
    const axiosConfig = {
     
      headers: {
        'Authorization': 'Basic ' + btoa(Username + ":" + Password),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 5000 // 5 second timeout 
    };

    

    try {
      const response = await axios.post('http://localhost:1234/api/users', user, axiosConfig);
      
      console.log("User added successfully:", response.data);
      setSuccess("User added successfully!");
      
      // Clear form fields
      setUserName('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setServerError('');

      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      let errorMessage = error.response.data.reason;
      console.log(error.response.data.reason)
      console.error(error)
      setServerError(errorMessage);
      setSuccess('');
      setTimeout(() => setServerError(''), 9000); 
    }
  };

    return(
        <div className="container">
        
          <h1>FORM</h1>
          <form>
            <div className="form-group">
              <label htmlFor="userName">Username</label>
              <input type="text" placeholder="UserName" value={userName} onChange={(e) => { setUserName(e.target.value) }}></input>
              {errors.userName && <div className="error-message">{errors.userName}</div>}
              {serverError && <div className="error-message">{serverError[3]}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input type="text" placeholder="First Name" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}></input>
              {errors.firstName && <div className="error-message">{errors.firstName}</div>}
              {serverError && <div className="error-message">{serverError[1]}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" placeholder="Last Name" value={lastName} onChange={(e)=>{setLastName(e.target.value)}}></input>
              {errors.lastName && <div className="error-message">{errors.lastName}</div>}
              {serverError && <div className="error-message">{serverError[0]}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
              {errors.email && <div className="error-message">{errors.email}</div>}
               {serverError && <div className="error-message">{serverError[2]}</div>} 
            </div>
          
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
              {errors.password && <div className="error-message">{errors.password}</div>}
              {serverError && <div className="error-message">{serverError[4]}</div>}
            </div>

            <button type="submit" onClick={handleClick}>Submit</button>
          </form>

         
          {success && <div className="success-message">{success}</div>}

        </div>
    );
};
export default AddUser;

