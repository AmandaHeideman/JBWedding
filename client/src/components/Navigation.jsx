import React, { useState, useEffect } from "react";
import FetchUser from "./FetchUser";

const Navigation = () => {
  const [role, setRole] = useState();

  const adminRoles = ["superadmin", "bridalCouple", "mum", "toastmaster"];
  const admin = adminRoles.includes(role);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      FetchUser.GetUser()
        .then((res) => setRole(res.data.role))
        .catch((err) => console.log(err.message));
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.assign("/");
  }

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
          <li className="nav-item">
            <a className="nav-link" href="/weddingday">
              Bröllopsdagen
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/directions">
              Hitta hit
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/hotels">
              Hotelltips
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
            <>
            <li className="nav-item">
              <a className="nav-link" href="/registration">
                Anmälan
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link curser-pointer" onClick={logout} href="/">
                Logga ut
              </a>
            </li>
            </>
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
