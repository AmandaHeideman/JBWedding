import React, { useEffect, useState } from 'react';
import FetchUser from '../components/FetchUser';

const AdminPage = () => {

  const [admin, setAdmin] = useState();

  useEffect(() => {
    FetchUser.GetAdmin()
    .then((res) => setAdmin(res.data))
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
