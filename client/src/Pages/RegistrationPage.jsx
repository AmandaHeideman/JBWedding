import React, { useState, useEffect } from 'react';
import RegistrationForm from '../components/RegistrationForm';
import axios from 'axios';

const RegistrationPage = () => {

  const token = localStorage.getItem('token');
  const [registration, setRegistration] = useState();
  const [attending, setAttending] = useState();
  const [alcohol, setAlcohol] = useState();
  const [diet, setDiet] = useState();
  const [performing, setPerforming] = useState();

  async function getRegistration() {
    await axios.get("http://localhost:5000/users/registration", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }).then((res) => { 
      let user = res.data.user;
      setRegistration(user);

      if(user.attending !== undefined){
        if(user.attending){
          setAttending("Ja");
        } else{
          setAttending("Nej");
        }
      }

      if(user.alcohol !== undefined){
        if(user.alcohol){
          setAlcohol("Alkoholhaltig dryck");
        } else{
          setAlcohol("Alkoholfri dryck");
        }
      }

      if(user.diet !== undefined){
        setDiet(user.diet);
        
      }

      if(user.performing !== performing){
        if(user.performing){
          setPerforming("Ja");
        } else{
          setPerforming("Nej");
        }
      }


    }).catch((err) => {
      console.log(err.message);
    })
  }

  useEffect(() => {
    getRegistration()
  }, []);
 
  

  return (
    <div>
      {registration && 
      <><h1>{registration.fullName}</h1> 
      {registration.attending !== undefined ? 
        <>
          <p>Kommer du på bröllopet? Svar: {attending}</p>
          <p>Vill du ha alkoholfri eller alkoholhaltig dryck? Svar: {alcohol}</p>
          <p>Har du några allergier/matpreferenser? Svar: {diet}</p>
          <p>Vill du göra något uppträdande eller hålla tal under middagen? Svar: {performing}</p>
        </>
      :
        <RegistrationForm />
      }
      </>
}
    </div>
  )
}

export default RegistrationPage
