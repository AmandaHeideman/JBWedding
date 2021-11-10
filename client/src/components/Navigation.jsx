import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';

const Navigation = () => {

  const { isLoggedin } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-lg text-center">
      <a className="navbar-brand" href="/">Home</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/wishlist">Wishlist</a>
          </li>
          {!isLoggedin && 
          <li className="nav-item">
            <a className="nav-link" href="/login">Log in</a>
          </li>
          }
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
