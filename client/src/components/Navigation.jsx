import React from 'react';

const Navigation = () => {

  const user = localStorage.getItem('user');

  return (
    <nav className="navbar navbar-expand-md text-center">
      <a className="navbar-brand" href="/">Home</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/wishlist">Önskelista</a>
          </li>
          {!user && 
          <li className="nav-item">
            <a className="nav-link" href="/login">Logga in</a>
          </li>
          }

          {user &&
            <li className="nav-item">
              <a className="nav-link" href="/registration">Anmälan</a>
            </li>
          }
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
