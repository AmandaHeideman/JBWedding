import React, { useState, useEffect } from 'react';
import FetchUser from '../components/FetchUser';

const GuestListPage = () => {

  const [users, setUsers ] = useState();
  const [admin, setAdmin] = useState();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if(token){
    FetchUser.GetAllUsers()
    .then((res) => setUsers(res.data))

    FetchUser.GetAdmin()
    .then((res) => setAdmin(res.data))
    }
  }, [])

  return (
    <div>
      {admin === true ? 
      <>
      <h1>Gästlista</h1>
      {users ?
        users.map(value => {
          return (
            <>
          <h3>{value.fullName}</h3>
          <p>Kommer: 
          {value.attending==true ? 
          <span> Ja</span>
          :
          <span> Nej</span>
        }
        </p>
        </>
          )
        })
      :
      <p>Loading</p>
      }
      </>
      :
      <p>Not admin</p>
    }
    </div>
  )
}

export default GuestListPage
