import axios from 'axios';

const url = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

class FetchUser {
  static GetUser() {
    const token = localStorage.getItem('token');

    if(token){
      return (url.get("/users/", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }))
    } else {
      return "Not logged in"
    }
  }

  static GetAllUsers() {
    return (url.get("/users/guests"))
  }

  static GetAdmin() {
    const token = localStorage.getItem('token');

    if(token){
      return (url.get("/admin/", {
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
