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
      localStorage.setItem('token', res.data.token);
      window.location.assign('/');
    }).catch((err) => {
      console.log(err.message);
      setErrorMsg("Fel användarnamn eller lösenord");
    })
  };

  return (
    <div className="loginpage">
      <h1 className="mt-4">Logga in</h1>
    <form className="login p-3">
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
    </div>
  )
}

export default LoginPage
