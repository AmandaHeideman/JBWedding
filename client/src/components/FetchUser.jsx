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
    }
  }
}

export default FetchUser
