import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FetchUser from '../components/FetchUser';

const url = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});


const WishlistPage = () => {

  const token = localStorage.getItem('token');

  const [wishlist, setWishlist] = useState([]);
  const [checked, setChecked] = useState();
  const [newGift, setNewGift] = useState();
  const [guestGifts, setGuestGifts] = useState();
  const [newWishlistItem, setNewWishlistItem] = useState();
  const [newLink, setNewLink] = useState();
  const [purchasable, setPurchasable] = useState();
  const [user, setUser] = useState();
  const [role, setRole] = useState();

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
      .catch((error) => {
        console.log(error);
      })
  }

  function getGuestGifts(){
    url.get('/wishlist/guestgifts')
    .then((res) => setGuestGifts(res.data))
  }

  useEffect(() => {
    getAllGifts()
    getGuestGifts()
    if(token){
      FetchUser.GetUser()
      .then((res) => {setUser(res.data)
      setRole(res.data.role)})
    }
  }, [token]);

  const onCheck = (e) => {
    const updatedCheckedState = checked.map((bool, index) =>
      index === e.target.value ? !bool : bool
    );
    setChecked(updatedCheckedState);

    const updatedItem = wishlist[e.target.value].title;
    const purchased = e.target.checked
    url.post(
      "/wishlist",
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
    url.post(
      "/wishlist/add",
      {
        title: newGift
      }
    ).then(() => {

      console.log("new gift added");
      window.location.reload();
    }
    )
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    setNewWishlistItem(e.target.value)
  }

  const handleLink = (e) => {
    e.preventDefault();
    setNewLink(e.target.value)
  }

  const handlePurchasable = (e) => {
    e.preventDefault();
    setPurchasable(e.target.value);
  }
  
  const addToWishlist = (e) => {
    e.preventDefault();
    url.post(
      "/wishlist/new",
      {
        title: newWishlistItem,
        nonPurchasable: purchasable,
        link: newLink
      }
    ).then(() => {
      window.location.reload();
    }
    )
  };
  

  return (
    <div className="wishlist">
      <h1 className="page-header m-2 center">??nskelista</h1>
      {wishlist ? 
      <div className="d-grid-60-40">
      {(user && checked && (role !== "bridalCouple")) ? 
      (<div className="styled-div mt-3 list-container">
        <div>
        {wishlist.map((value, key)=> {
          console.log(value.link);
          return (
          <div key={key} className="row gifts">
            <div className="row-1">

              <span className="center">???</span>
              <span>{value.title}</span>
            </div>
              {value.title === "Bidrag till br??llopsresa" && <span>Swish: 070-1436088</span>}
            <div className="row-2">
              {value.link ? <span><a href={value.link}>L??nk</a></span> : <span className="col-1"></span>}
            {value.nonPurchasable !== true ? 
              <>
              {(value.purchased === true && value.boughtBy !== user._id) ? 
              <span className="col-1"> K??pt</span>
              :
              <input className="center m-2" type="checkbox" value={key} checked={checked[key]} onChange={onCheck}/>
            }
              </>
              :
              <span className="col-1"></span>
            }
            </div>
          </div>
          )
        })}
        </div>
        <p className="d-flex align-self-end">Kryssa i checkboxen ifall du har k??pt n??got fr??n listan. Det visas sen som "k??pt" f??r
          andra g??ster s?? att inte fler k??per samma sak. Du kan n??r som helst avchecka rutan, d?? st??r den inte l??ngre
          som k??pt hos andra, och de kan kryssa i den
        </p>
      </div>)
      :
      <div className="styled-div list-container pb-3">
      <p>F??r att kryssa i saker du k??pt och se om n??got redan ??r k??pt, <a href="/login">logga in</a></p>
      {wishlist.map((value, key)=> {
        return (
          <>
          <div key={key} className="row gifts">
            <div className="row-1">
            <span className="center">???</span>
            <span>{value.title} </span>
          </div>
          <div className="row-2">
            {value.link ? <span className="col-1"><a href={value.link}>L??nk</a></span> : <span className="col-1"></span>}
            </div>
          </div>
          </>
            )
      })}
      </div>
      
    }
    {user && 
    <>
      {role !== "bridalCouple" &&
    <div className="wishlist-other-gifts">
      <div className="styled-div">
        <h2>Har du k??pt n??got annat?</h2>
        <form className="d-flex justify-content-between" onSubmit={submitGift}>
          <input type="text" onChange={handleGift} />
          <button type="submit" className="button"> Spara </button>
        </form>
      </div>
      <div className="styled-div">
        <h2>Andra har k??pt</h2>
        {guestGifts ?
          guestGifts.map((value, key) => {
            return <span key={key}>{value.title}, </span>
          })
        :
        <p>Laddar...</p>  
        }
      </div>
    </div>
      }
      </>
    }
    {role === "bridalCouple" && 
      <div className="styled-div">
        <h2>L??gg till i ??nskelistan</h2>
        <form className="d-flex justify-content-between flex-column" onSubmit={addToWishlist}>

          <div className="form-group m-2">
              <textarea
                className="form-control"
                rows="1"
                onChange={handleWishlist}
              ></textarea>
            </div>

          <div className="form-group m-2">
            <label>Eventuell l??nk</label>
              <textarea
                className="form-control"
                rows="1"
                onChange={handleLink}
              ></textarea>
            </div>

          <div className="form-group m-2">
          <label>??r det n??nting ni bara vill ha en av?</label>
          <div className=" radio">
            <input
              className="form-check-input"
              name="purchasable"
              type="radio"
              value={false}
              onChange={handlePurchasable}
            />
            <label className="form-check-label">Ja</label>
          </div>
          <div className="radio">
            <input
              className="form-check-input"
              name="purchasable"
              type="radio"
              value={true}
              onChange={handlePurchasable}
            />
            <label className="form-check-label">Nej</label>
          </div>
        </div>
        <button type="submit" className="button m-2">
          Spara
        </button>
        </form>
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
