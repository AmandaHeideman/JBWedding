import React, { useState, useEffect } from "react";
import FetchUser from "./FetchUser";

const Navigation = () => {
  const [admin, setAdmin] = useState();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      FetchUser.GetAdmin()
        .then((res) => setAdmin(res.data))
        .catch((err) => console.log(err.message));
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-md text-center p-2 fixed-top">
      <a className="navbar-brand" href="/">
        Home
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/wishlist">
              Önskelista
            </a>
          </li>
          {!token && (
            <li className="nav-item">
              <a className="nav-link" href="/login">
                Logga in
              </a>
            </li>
          )}

          {token && (
            <li className="nav-item">
              <a className="nav-link" href="/registration">
                Anmälan
              </a>
            </li>
          )}

          {admin === true && (
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/admin" data-bs-toggle="dropdown"  aria-expanded="false">
              Admin
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a className="dropdown-item" href="/admin/guestlist">Gästlista</a>
            </div>
          </li>
          
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
