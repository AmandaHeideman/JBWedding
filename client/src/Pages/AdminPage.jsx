import React, { useEffect, useState } from 'react';
import FetchUser from '../components/FetchUser';

const AdminPage = () => {

  const [role, setRole] = useState();

  const adminRoles = ["superadmin", "bridalCouple", "mum", "toastmaster"];
  const admin = adminRoles.includes(role);

  useEffect(() => {
    FetchUser.GetUser()
    .then((res) => setRole(res.data.role))
  }, [])

  return (
    <div>
      {admin === true ? 
      <p>Admin page</p>
      :
      <p>Not admin</p>
      }
    </div>
  )
}

export default AdminPage
