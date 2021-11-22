import React, { useState, useEffect } from 'react';
import axios from 'axios';

const url = axios.create({
  baseURL: process.env.API_KEY || 'http://localhost:5000'
});


const WishlistPage = () => {

  const [wishlist, setWishlist] = useState([]);
  const [checked, setChecked] = useState();

  function getAllGifts() {
    url.get('/wishlist')
      .then(response => {
        setWishlist(response.data)
      })
      .then((res => {
        setChecked(new Array(wishlist.length).fill(false));
      }))
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    getAllGifts()
  }, []);
  
  const onCheck = (e) => {
    const updatedCheckedState = checked.map((bool, index) =>
      index == e.target.value ? !bool : bool
    );
    console.log(updatedCheckedState);
    setChecked(updatedCheckedState);
  }

  const onSave = () => {
    axios.post(
      "http://localhost:5000/wishlist",
      {
        purchased: checked
      }
    ).then(console.log("updated"))
  };
  

  return (
    <div>
      Wishlist
      {wishlist.map((value, key)=> {
        return (
        <>
          <p>{value.title}
          <input type="checkbox" value={key} checked={checked[key]} onChange={onCheck}/>
          </p>
        </>
        )
      })}
      <button className="btn btn-primary" onClick={onSave}>
        Spara
      </button>
    </div>
  )
}

export default WishlistPage
