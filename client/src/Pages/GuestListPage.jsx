import React, { useState, useEffect } from 'react';
import FetchUser from '../components/FetchUser';

const GuestListPage = () => {

  const [users, setUsers ] = useState();
  const [role, setRole] = useState();

  const adminRoles = ["superadmin", "bridalCouple", "mum", "toastmaster"];
  const admin = adminRoles.includes(role);
  
  const token = localStorage.getItem('token');

  useEffect(() => {
    if(token){
    FetchUser.GetAllUsers()
    .then((res) => setUsers(res.data))

    FetchUser.GetUser()
    .then((res) => setRole(res.data.role))
    }
  }, [])


  return (
    <div>
      {admin === true ? 
      <>
      <h1 className="page-header">Gästlista</h1>
      {users ?
      <div className="styled-div">
        {users.map(value => {
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
        })}
        </div>
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
