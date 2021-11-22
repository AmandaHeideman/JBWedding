import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FetchUser from '../components/FetchUser';

const url = axios.create({
  baseURL: process.env.API_KEY || 'http://localhost:5000'
});


const WishlistPage = () => {

  const token = localStorage.getItem('token');

  const [wishlist, setWishlist] = useState([]);
  const [checked, setChecked] = useState();
  const [newGift, setNewGift] = useState();
  const [guestGifts, setGuestGifts] = useState();

  const [ user, setUser ] = useState();

 

  function getAllGifts() {
    url.get('/wishlist')
      .then(response => {
        setWishlist(response.data)
        let purchasedArray = [];
        for(let i=0; i<response.data.length; i++) {
          purchasedArray.push(response.data[i].purchased)
        }
        setChecked(purchasedArray)
      })
      /* .then((res => {
        setChecked(new Array(wishlist.length).fill(false));
      })) */
      .catch((error) => {
        console.log(error);
      })
  }

  function getGuestGifts(){
    axios.get('http://localhost:5000/wishlist/guestgifts')
    .then((res) => setGuestGifts(res.data))
  }

  useEffect(() => {
    getAllGifts()
    getGuestGifts()
    if(token){
      FetchUser.GetUser()
      .then((res) => setUser(res.data))
    }
  }, []);

  const onCheck = (e) => {
    const updatedCheckedState = checked.map((bool, index) =>
      index == e.target.value ? !bool : bool
    );
    setChecked(updatedCheckedState);

    const updatedItem = wishlist[e.target.value].title;
    const purchased = e.target.checked
    axios.post(
      "http://localhost:5000/wishlist",
      {
        title: updatedItem,
        purchased: purchased
      },
      {
        headers: {
          Authorization: token
        }
      }
    ).then(console.log("updated"))
  }

  const handleGift = (e) => {
    setNewGift(e.target.value)
  }
  
  const submitGift = (e) => {
    e.preventDefault();
    axios.post(
      "http://localhost:5000/wishlist/add",
      {
        title: newGift
      }
    ).then(() => {

      console.log("new gift added");
      window.location.reload();
    }
    )
  };
  

  return (
    <div>
      <h1>Wishlist</h1>
      {wishlist ? 
      <div>
      {user && checked ? 
      (<div>
        {wishlist.map((value, key)=> {
          return (
          <>
            <p>{value.title}
            {value.nonPurchasable !== true && 
              <>
              {(value.purchased == true && value.boughtBy != user._id) ? 
              <h6> Köpt</h6>
              :
              <input type="checkbox" value={key} checked={checked[key]} onChange={onCheck}/>
              }
              </>
            }
            </p>
          </>
          )
        })}
      </div>)
      :
      wishlist.map((value)=> {
        return (<p>{value.title} </p>)
      })
    }
    {user &&
      <div>
        <h2>Har du köpt något annat?</h2>
        <form onSubmit={submitGift}>
          <input type="text" onChange={handleGift} />
          <button type="submit" className="btn btn-primary"> Submit </button>
        </form>
        <h2>Andra har köpt</h2>
        {guestGifts ?
          guestGifts.map((value) => {
            return <span>{value.title}, </span>
          })
        :
        <p>Loading</p>  
        }
      </div>
    }
    </div>
    :
    <h1>Loading</h1>
  }

    </div>
  )
}

export default WishlistPage
