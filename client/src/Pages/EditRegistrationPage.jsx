import React, { useState, useEffect } from 'react';
import RegistrationForm from '../components/RegistrationForm';
import FetchUser from '../components/FetchUser';

const EditRegistrationPage = () => {

  const [ user, setUser ] = useState();

  useEffect(() => {
    FetchUser.GetUser()
    .then((res) => setUser(res.data))
  }, [])

  return (
    <div>
      {user && 
        <>
          <RegistrationForm {... user}/>
        </>
      }
    </div>
  )
}

export default EditRegistrationPage
