import React, { useState, useEffect } from 'react';
import axios from 'axios';

const url = axios.create({
  baseURL: process.env.API_KEY || 'http://localhost:5000'
});


const WishlistPage = () => {

  const [wishlist, setWishlist] = useState([]);

  function getAllGifts() {
    url.get('/wishlist')
      .then(response => {
        setWishlist(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }


  useEffect(() => {
    getAllGifts()
  }, []);

  return (
    <div>
      Wishlist
      {wishlist.map((value)=> {
        return <p>{value.title}</p>
      })}
    </div>
  )
}

export default WishlistPage
