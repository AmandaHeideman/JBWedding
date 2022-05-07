import React, { useState, useEffect } from "react";
import FetchUser from "./FetchUser";

const Navigation = () => {
  const [role, setRole] = useState();
  const [isNavExpanded, setIsNavExpanded] = useState(false);

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
    <div className="nav text-center p-2 fixed-top">
      <a className="nav-home p-2" href="/">
        Hem
      </a>
    <button 
      className="fa fa-bars" 
      onClick={() => {
          setIsNavExpanded(!isNavExpanded);
      }}>
    </button>
    <div className="nav-menu">

        <ul className={isNavExpanded && "expanded"}>
          <li>
            <a href="/wishlist">
              Önskelista
            </a>
          </li>
          <li>
            <a href="/weddingday">
              Bröllopsdagen
            </a>
          </li>
          <li>
            <a href="/directions">
              Hitta hit
            </a>
          </li>
          <li>
            <a href="/hotels">
              Hotelltips
            </a>
          </li>
          {!token && (
            <li>
              <a href="/login">
                Logga in
              </a>
            </li>
          )}

          {token && (
            <>
            <li>
              <a href="/registration">
                Anmälan
              </a>
            </li>

            <li>
              <a onClick={logout} href="/">
                Logga ut
              </a>
            </li>
            </>
          )}

          {admin === true && (
            <li className="dropdown">
            <a className="dropdown-toggle" href="/admin" data-bs-toggle="dropdown"  aria-expanded="false">
              Admin
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a className="dropdown-item" href="/admin/guestlist">Gästlista</a>
            </div>
          </li>
          
          )}
        </ul>
          </div>
    </div>
  );
};

export default Navigation;
