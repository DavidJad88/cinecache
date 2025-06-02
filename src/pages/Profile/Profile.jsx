import styles from "./Profile.module.css";

import { useEffect, useState } from "react";

import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { auth, database } from "../../../firebaseConfig";
import { getAuthContext } from "../../context/authContext";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  const { user } = getAuthContext();

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

  //Prettifying renders

  const formattedRegisteredDate = userData?.createdAt
    ? userData.createdAt.toDate().toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    : "";

  const formattedBirthDate = userData?.dateOfBirth
    ? new Date(userData.dateOfBirth).toLocaleDateString("en-Us", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    : "Birth date not registered";

  const capitalizeFirstLetter = (string) => {
    if (!string) return "Not available";
    return string?.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className={styles.profile}>
      <div className={styles.profileInfoWrapper}>
        <div className={styles.profileCard}>
          <img
            src={userData?.profilePicture || "/assets/icons/user.svg"}
            alt="profile"
            className={styles.avatar}
          />
          <div className={styles.basicInfo}>
            <h2>{userData?.userName}</h2>
            <p className={styles.email}>{userData?.email}</p>
            <p className={styles.joined}>Joined: {formattedRegisteredDate}</p>
          </div>
        </div>

        {/* Personal Info */}
        <div className={styles.infoGrid}>
          <div>
            <h4>First Name</h4>
            <p>{capitalizeFirstLetter(userData?.firstname)}</p>
          </div>
          <div>
            <h4>Last Name</h4>
            <p>{capitalizeFirstLetter(userData?.lastname)}</p>
          </div>
          <div>
            <h4>Date of Birth</h4>
            <p>{formattedBirthDate}</p>
          </div>
        </div>

        {/* User Library (Can be expanded with cards) */}
        {/* <div className={styles.librarySection}>
          <h3>Your Movie Library</h3>
          <p>Coming soon: a list of movies you've watched or rated.</p>
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
