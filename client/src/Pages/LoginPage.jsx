import React, { useState } from 'react';
import axios from 'axios';

const url = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

const LoginPage = () => {
  
  require('dotenv').config();
  const [ fullName, setFullName ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ errorMsg, setErrorMsg ] = useState();
  
  //let user = localStorage.getItem('user');
  const login = (e) => {
    e.preventDefault();
    url.post("/users/login", {
      fullName: fullName,
      password: password,
    })
    .then((res) => { 
      console.log("setting token")
      localStorage.setItem('token', res.data.token);
      window.location.assign('/');
    }).catch((err) => {
      console.log(err.message);
      setErrorMsg("Fel användarnamn eller lösenord");
    })
  };

  return (
    <div className="loginpage center">
      <h1 className="mt-4 page-header">Logga in</h1>
      <p>Med inbjudan har du fått inloggningsuppgifter</p>
    <form className="login styled-div">
      <div className="form-group p-3">

      <label for="name">Namn</label>
      <br />
      <input 
        id="name"
        type="text" 
        onChange={(e) =>{
          setFullName(e.target.value);
        }} 
        />
      </div>
      <div className="form-group p-3">

      <label for="password">Lösenord</label>
      <br />
      <input
        id="password"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        />
        </div>
      <button className="button m-3" onClick={login}>Logga in</button>
    </form>
    {errorMsg && <p>{errorMsg}</p> }
    <p className="p-3">Har du problem att logga in? <a href="mailto:heideman.amanda@gmail.com">Kontakta Amanda</a></p>
    </div>
  )
}

export default LoginPage
