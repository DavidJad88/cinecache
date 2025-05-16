import { Link, NavLink } from "react-router-dom";
import styles from "../Navbar/Navbar.module.css";
import Button from "../Button/Button";
import { useState } from "react";

const Navbar = () => {
  const [isSignedin, setIsSignedin] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  //dynamic searcbar
  const handleSearchbarVisible = () => {
    setIsSearching(true);
  };

  const handleHideSearchbar = () => {
    if (searchTerm) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };
  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarTopRow}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <img src="/assets/icons/clapper.svg" alt="camera clapper icon" />
          </div>
          <div className={styles.siteLogoContainer}>
            <h1>CineCache</h1>
          </div>
        </div>
        <div className={styles.userToolsContainer}>
          <div className={styles.searchContainer}>
            <label
              htmlFor="search"
              className={styles.searchIcon}
              onClick={handleSearchbarVisible}
            >
              <img src="/assets/icons/search.svg" alt="Search Icon" />
            </label>
            {isSearching && (
              <input
                type="search"
                name="search"
                id="search"
                className={styles.searchInput}
                onBlur={handleHideSearchbar}
                onChange={handleInputChange}
                value={searchTerm}
              />
            )}
          </div>
          {isSignedin ? (
            <div className={styles.userTools}>
              <div className={styles.userIcon}>
                <img src="/assets/icons/user.svg" alt="user profile icon" />
              </div>
              <Button className={styles.signOutButton}>Sign Out</Button>
            </div>
          ) : (
            <div className={styles.signInContainer}>
              <Link to={"/sign-in"}>
                <Button className={styles.signInButton}>Sign In</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className={styles.navbarBottomRow}>
        <div className={styles.linksContainer}>
          <NavLink
            to={"/"}
            className={({ isActive }) => (isActive ? styles.activeLink : "")}
          >
            Home
          </NavLink>
          <NavLink
            to={"/movie-list"}
            className={({ isActive }) => (isActive ? styles.activeLink : "")}
          >
            Browse Movies
          </NavLink>
          <NavLink
            to={"/contact"}
            className={({ isActive }) => (isActive ? styles.activeLink : "")}
          >
            Contact Us
          </NavLink>
          {isSignedin && <NavLink to={"/profile"}>My Cache</NavLink>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
