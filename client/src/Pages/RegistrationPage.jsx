import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm';
import axios from 'axios';

const RegistrationPage = () => {

  const token = localStorage.getItem('token');
  const [registration, setRegistraion] = useState();
  const [fullName, setFullName] = useState();
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
      setFullName(user.fullName);
      setRegistraion(user);

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
      {fullName && 
      <><h1>{fullName}</h1> 
      {attending !== undefined ? 
        <>
          <p>Kommer du på bröllopet? Svar: {attending}</p>
          <p>Vill du ha alkoholfri eller alkoholhaltig dryck? Svar: {alcohol}</p>
          <p>Har du några allergier/matpreferenser? Svar: {diet}</p>
          <p>Vill du göra något uppträdande eller hålla tal under middagen? Svar: {performing}</p>
          <Link to={{
            pathname: "/registration/edit",
            state: {registration}
            }}
          >Uppdatera din anmälan</Link>
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
