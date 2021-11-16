import React, { useState, useEffect } from 'react';
import RegistrationForm from '../components/RegistrationForm';
import axios from 'axios';

const RegistrationPage = () => {

  const token = localStorage.getItem('token');
  const [registration, setRegistration] = useState();

  async function getRegistration() {
    await axios.get("http://localhost:5000/users/registration", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }).then((res) => { 
      setRegistration(res.data.fullName);
      console.log(res.data.fullName)
    }).catch((err) => {
      console.log(err.message);
    })
  }

  useEffect(() => {
    getRegistration()
  }, []);

  return (
    <div>
      <h1>{registration}</h1>
      <RegistrationForm />
    </div>
  )
}

export default RegistrationPage
