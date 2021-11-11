import React from 'react';
import RegistrationForm from '../components/RegistrationForm';

const RegistrationPage = () => {

  const user = localStorage.getItem('user');
  return (
    <div>
      <h1>{user}</h1>
      <RegistrationForm />
    </div>
  )
}

export default RegistrationPage
