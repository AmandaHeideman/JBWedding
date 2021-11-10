import React, { useState } from 'react';
import Axios from 'axios';

const LoginPage = () => {

  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ loginUsername, setLoginUsername ] = useState();
  const [ errorMsg, setErrorMsg ] = useState();
  
  const login= () => {
    Axios.post("http://localhost:5000/users/login", {
      username: username,
      password: password,
    }).then((res) => { 
      setLoginUsername(res.data.fullName);
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
          setUsername(e.target.value);
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
      {loginUsername ? 
        <p>Välkommen, {loginUsername}!</p>
      : <p>{errorMsg}</p>}
    </div>
  )
}

export default LoginPage
