import React, { useState } from 'react';
import Axios from 'axios';

const LoginPage = () => {

  const [ fullName, setFullName ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ errorMsg, setErrorMsg ] = useState();

  let user = localStorage.getItem('user');

  const login = () => {
    Axios.post("http://localhost:5000/users/login", {
      fullName: fullName,
      password: password,
    }).then((res) => { 
      localStorage.setItem('user', `${res.data.fullName}`);
      window.location.reload();
    }).catch((err) => {
      console.log(err.message);
      setErrorMsg("Fel användarnamn eller lösenord");
    })
  };

  return (
    <div>
      <label>Namn</label>
      <input 
        type="text" 
        onChange={(e) =>{
          setFullName(e.target.value);
        }} 
      />
      <label>Lösenord</label>
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={login}>Logga in</button>
      {user ? 
        <p>Välkommen, {user}!</p>
      : <p>{errorMsg}</p>}
    </div>
  )
}

export default LoginPage
