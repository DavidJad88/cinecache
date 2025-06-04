import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import { useEffect, useState } from "react";
import { getAuthContext } from "../../context/authContext";
import { auth, database } from "../../../firebaseConfig";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useSearch } from "../../context/searchContext";
const Navbar = () => {
  const { searchTerm, setSearchTerm, isSearching, setIsSearching } =
    useSearch();
  const [userData, setUserData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // context
  const { user } = getAuthContext();

  //getting user data
  useEffect(() => {
    const fetcUserData = async () => {
      if (!user) return;
      try {
        const userDocRef = doc(database, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.log("User Not Found");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetcUserData();
  }, [user]);

  const navigate = useNavigate();

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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
      console.log("user was successfully signed out");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbarTopRow}>
          <Link to={"/"}>
            <div className={styles.logoContainer}>
              <div className={styles.logo}>
                <img
                  src="/assets/icons/clapper.svg"
                  alt="camera clapper icon"
                />
              </div>
              <div className={styles.siteLogoContainer}>
                <h1>CineCache</h1>
              </div>
            </div>
          </Link>
          <div className={styles.userToolsContainer}>
            {user ? (
              <div className={styles.userTools}>
                <div className={styles.userIcon}>
                  <Link to={"/profile"}>
                    {userData?.profilePicture ? (
                      <img
                        src={userData?.profilePicture}
                        alt="user profile picure"
                        className={styles.userIcon}
                      />
                    ) : (
                      <img
                        src="/assets/icons/user.svg"
                        alt="user profile icon"
                        className={styles.userIcon}
                      />
                    )}
                  </Link>
                </div>
                <Button
                  className={styles.signOutButton}
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
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
          {!isSearching && (
            <div className={styles.hamburgerMenuContainer}>
              <img
                src="/assets/icons/menu.svg"
                alt="links menu button"
                onClick={() => setIsMobile(true)}
              />
            </div>
          )}

          {!isSearching && (
            <div className={styles.linksContainerDesktop}>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive ? styles.activeLink : ""
                }
                onClick={() => setIsMobile(false)}
              >
                Home
              </NavLink>
              <NavLink
                to={"/movie-list"}
                className={({ isActive }) =>
                  isActive ? styles.activeLink : ""
                }
                onClick={() => setIsMobile(false)}
              >
                Browse Movies
              </NavLink>
              <NavLink
                to={"/contact"}
                className={({ isActive }) =>
                  isActive ? styles.activeLink : ""
                }
                onClick={() => setIsMobile(false)}
              >
                Contact Us
              </NavLink>
              {user && (
                <NavLink
                  to={"/movie-library"}
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : ""
                  }
                  onClick={() => setIsMobile(false)}
                >
                  Library
                </NavLink>
              )}
            </div>
          )}

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
        </div>
      </nav>
      {isMobile && (
        <Modal containerClassName={styles.linksContainerMobile}>
          <Button
            className={styles.closeLinksModalButton}
            onClick={() => setIsMobile(false)}
          >
            X
          </Button>
          <NavLink
            to={"/"}
            className={({ isActive }) => (isActive ? styles.activeLink : "")}
            onClick={() => setIsMobile(false)}
          >
            Home
          </NavLink>
          <NavLink
            to={"/movie-list"}
            className={({ isActive }) => (isActive ? styles.activeLink : "")}
            onClick={() => setIsMobile(false)}
          >
            Browse Movies
          </NavLink>
          <NavLink
            to={"/contact"}
            className={({ isActive }) => (isActive ? styles.activeLink : "")}
            onClick={() => setIsMobile(false)}
          >
            Contact Us
          </NavLink>
          {user && (
            <NavLink
              to={"/movie-library"}
              className={({ isActive }) => (isActive ? styles.activeLink : "")}
              onClick={() => setIsMobile(false)}
            >
              Library
            </NavLink>
          )}
        </Modal>
      )}
    </>
  );
};

export default Navbar;
