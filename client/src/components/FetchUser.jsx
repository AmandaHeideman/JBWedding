import axios from 'axios';

class FetchUser {
  static GetUser() {
    const token = localStorage.getItem('token');

    if(token){
      return (axios.get("http://localhost:5000/users/", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }))
    } else {
      return "Not logged in"
    }
  }

  static GetAdmin() {
    const token = localStorage.getItem('token');

    if(token){
      return (axios.get("http://localhost:5000/admin/", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }))
    } else {
      return "Not logged in"
    }
  }
}

export default FetchUser
