import styles from "./SignUp.module.css";

import Button from "../../components/Button/Button";
import { useState, useRef } from "react";
import { useSignUpValidation } from "../../hooks/useSignUpValidation";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { database } from "../../../firebaseConfig";

const SignUp = () => {
  // declaring state variables and refs
  const [signUpFormData, setSignUpFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    userName: "",
    profilePicture: null,
    previewUrl: "",
  });

  const fileInputRef = useRef(null);

  //validation function from custom hook

  const { validate, errors } = useSignUpValidation();

  //user Sign up function from custom hook
  const { signUp, signUpError, user } = useAuth();

  //redirecting
  const navigate = useNavigate();

  // retrieve input values

  const handleInputChange = (e) => {
    if (e.target.type === "file") return;
    const { name, value } = e.target;
    setSignUpFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  //retrieve the image file and create temporary url

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setSignUpFormData((prevDetails) => ({
        ...prevDetails,
        profilePicture: file,
        previewUrl: previewUrl,
      }));
      console.log("Selected File:", file);
    } else {
      setSignUpFormData((prevDetails) => ({
        ...prevDetails,
        profilePicture: null,
        previewUrl: "",
      }));
    }
  };

  //remove selected image
  const handleRemoveImage = () => {
    setSignUpFormData((prevDetails) => ({
      ...prevDetails,
      profilePicture: null,
      previewUrl: "",
    }));
    fileInputRef.current.value = "";
  };

  //uploading image to cloudinary storage
  const uploadImage = async () => {
    if (!signUpFormData.profilePicture) {
      console.log("No picture selected");
      return null;
    }
    const formData = new FormData();
    formData.append("file", signUpFormData.profilePicture);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/upload`,
        { method: "POST", body: formData }
      );
      const data = await response.json();
      console.log("Cloudinary response:", data);
      console.log("image URL", data.secure_url);
      console.log("Public ID", data.public_id);

      setSignUpFormData((prevDetails) => ({
        ...prevDetails,
        previewUrl: data.secure_url,
      }));
      setError(null);

      return data.secure_url;
    } catch (error) {
      setError("Failed to upload the image");
      console.log(error.message);
      return null;
    }
  };
  // handle form submit

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validate(signUpFormData)) {
      console.log("form submission failed");
      return;
    }
    try {
      const userCredentials = await signUp(
        signUpFormData.email,
        signUpFormData.password
      );
      const user = userCredentials.user;
      console.log("User created successfully", userCredentials.user);

      let profilePictureUrl = null;
      if (signUpFormData.profilePicture) {
        profilePictureUrl = await uploadImage();
      }

      await setDoc(doc(database, "users", user.uid), {
        uid: user.uid,
        firstname: signUpFormData.firstname,
        lastname: signUpFormData.lastname,
        email: user.email,
        dateOfBirth: signUpFormData.dateOfBirth || "",
        userName: signUpFormData.userName,
        profilePicture: profilePictureUrl,
        createdAt: serverTimestamp(),
      });
      console.log("User added to firestore DB");
      navigate("/verify-email");
      setSignUpFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: "",
        userName: "",
        profilePicture: null,
        previewUrl: "",
      });
      fileInputRef.current.value = "";
    } catch (error) {
      console.log("error signing user up", error.message);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <form
        className={styles.signUpForm}
        noValidate
        onSubmit={handleFormSubmit}
      >
        <h2>Sign-Up Form</h2>
        <fieldset className={styles.formGroup}>
          <legend className={styles.formGroupTitle}>
            Personal Information
          </legend>
          {/* .................. */}
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter your first name"
            className={styles.formInput}
            maxLength={50}
            onChange={handleInputChange}
            value={signUpFormData.firstname}
          />
          {errors && <p className={styles.errorMessage}>{errors.firstname}</p>}
          {/* .................. */}
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter your last name"
            className={styles.formInput}
            maxLength={50}
            onChange={handleInputChange}
            value={signUpFormData.lastname}
          />
          {errors && <p className={styles.errorMessage}>{errors.lastname}</p>}
          {/* .................. */}
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            className={styles.formInput}
            onChange={handleInputChange}
            value={signUpFormData.dateOfBirth}
          />
          {errors && (
            <p className={styles.errorMessage}>{errors.dateOfBirth}</p>
          )}{" "}
        </fieldset>
        {/* .................. */}
        <fieldset className={styles.formGroup}>
          <legend className={styles.formGroupTitle}>User details</legend>
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="Enter your user-name "
            className={styles.formInput}
            maxLength={25}
            onChange={handleInputChange}
            value={signUpFormData.userName}
          />
          {errors && <p className={styles.errorMessage}>{errors.userName}</p>}
          {/* .................. */}
          <label htmlFor="profilePicture">Profile Picture</label>
          <input
            type="file"
            name="profilePicture"
            id="profilePicture"
            className={styles.formInput}
            accept=".jpg, .jpeg, .png"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          {signUpFormData.previewUrl && (
            <div className={styles.imagePreviewContainer}>
              <img
                src={signUpFormData.previewUrl}
                alt="profile picture preview"
                className={styles.imagePreview}
              />
              <Button
                className={styles.removeImageButton}
                type={"button"}
                onClick={handleRemoveImage}
              >
                Change Image
              </Button>
            </div>
          )}
        </fieldset>

        {/* -------------------------- */}
        <fieldset className={styles.formGroup}>
          <legend className={styles.formGroupTitle}>Account Details</legend>

          {/* .................. */}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className={styles.formInput}
            maxLength={50}
            onChange={handleInputChange}
            value={signUpFormData.email}
          />
          {errors && <p className={styles.errorMessage}>{errors.email}</p>}

          {/* .................. */}
          <label htmlFor="password">Passsword</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className={styles.formInput}
            maxLength={50}
            onChange={handleInputChange}
            value={signUpFormData.password}
          />
          {errors && <p className={styles.errorMessage}>{errors.password}</p>}
          {/* .................. */}
          <label htmlFor="confirmPassword">Confirm your Passsword</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Re-enter your assword"
            className={styles.formInput}
            maxLength={50}
            onChange={handleInputChange}
            value={signUpFormData.confirmPassword}
          />
          {errors && (
            <p className={styles.errorMessage}>{errors.confirmPassword}</p>
          )}
        </fieldset>
        <Button className={styles.createAccountButton}>Create Account</Button>
        {signUpError && <p>{signUpError}</p>}
      </form>
    </div>
  );
};

export default SignUp;
