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
    <div className="wishlist">
      {wishlist ? 
      <div className="row">
      <h1 className="page-header m-2 center col-6">Önskelista</h1>
      {user && checked ? 
      (<div className="styled-div col-6 mt-3 list-container">
        <div>
        {wishlist.map((value, key)=> {
          return (
          <div className="row gifts">
              <span className="col-1 center">⁘</span>
              <span className="col-9">{value.title}</span>
            {value.nonPurchasable !== true && 
              <>
              {(value.purchased == true && value.boughtBy != user._id) ? 
              <span className="col-1"> Köpt</span>
              :
              <input className="col-1 center m-2" type="checkbox" value={key} checked={checked[key]} onChange={onCheck}/>
              }
              </>
            }
          </div>
          )
        })}
        </div>
        <p className="d-flex align-self-end">Kryssa i checkboxen ifall du har köpt något från listan. Det visas sen som "köpt" för
          andra gäster så att inte fler köper samma sak. Du kan när som helst avchecka rutan, då står den inte längre
          som köpt hos andra, och de kan kryssa i den
        </p>
      </div>)
      :
      <div className="styled-div col-6 list-container pb-3">
      {wishlist.map((value)=> {
        return (
        
          <div className="row gifts">
            
            <span className="col-1 center">⁘</span>
            <span className="col-9">{value.title} </span>
          </div>
            )
      })}
      </div>
    }
    {user &&
    <div className="col-5 wishlist-other-gifts">
      <div className="styled-div">
        <h2>Har du köpt något annat?</h2>
        <form className="d-flex justify-content-between" onSubmit={submitGift}>
          <input type="text" onChange={handleGift} />
          <button type="submit" className="button"> Spara </button>
        </form>
      </div>
      <div className="styled-div">
        <h2>Andra har köpt</h2>
        {guestGifts ?
          guestGifts.map((value) => {
            return <span>{value.title}, </span>
          })
        :
        <p>Laddar...</p>  
        }
      </div>
    </div>
    }
    </div>
    :
    <h1>Laddar...</h1>
  }

    </div>
  )
}

export default WishlistPage
