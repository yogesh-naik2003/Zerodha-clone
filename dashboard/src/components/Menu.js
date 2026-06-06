import React, { useEffect, useRef, useState } from "react";

import { NavLink } from "react-router-dom";

const Menu = ({ user, onLogout }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);
  const username = user?.username || "USERID";
  const email = user?.email || "user@example.com";
  const avatarText = username.slice(0, 2).toUpperCase();

  const handleProfileClick = () => {
    setIsProfileDropdownOpen((current) => !current);
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const getMenuClass = ({ isActive }) => (isActive ? "menu selected" : "menu");

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} alt="Zerodha" />
      <div className="menus">
        <ul>
          <li>
            <NavLink
              style={{ textDecoration: "none" }}
              to="/"
              end
              className={getMenuClass}
            >
              <p>Dashboard</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              style={{ textDecoration: "none" }}
              to="/orders"
              className={getMenuClass}
            >
              <p>Orders</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              style={{ textDecoration: "none" }}
              to="/holdings"
              className={getMenuClass}
            >
              <p>Holdings</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              style={{ textDecoration: "none" }}
              to="/positions"
              className={getMenuClass}
            >
              <p>Positions</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              style={{ textDecoration: "none" }}
              to="/funds"
              className={getMenuClass}
            >
              <p>Funds</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              style={{ textDecoration: "none" }}
              to="/apps"
              className={getMenuClass}
            >
              <p>Apps</p>
            </NavLink>
          </li>
        </ul>
        <hr />
        <div className="profile-wrapper" ref={profileRef}>
          <button
            className="profile"
            type="button"
            onClick={handleProfileClick}
            aria-expanded={isProfileDropdownOpen}
            aria-haspopup="menu"
          >
            <div className="avatar">{avatarText}</div>
            <p className="username">{username}</p>
          </button>

          {isProfileDropdownOpen && (
            <div className="profile-dropdown" role="menu">
              <div className="profile-dropdown-header">
                <div className="avatar">{avatarText}</div>
                <div>
                  <p className="profile-name">{username}</p>
                  <p className="profile-email">{email}</p>
                </div>
              </div>
              <button type="button" role="menuitem">
                My profile
              </button>
              <button type="button" role="menuitem">
                Console
              </button>
              <button type="button" role="menuitem" onClick={onLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
