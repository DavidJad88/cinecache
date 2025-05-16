import { useState } from "react";
import styles from "../SignIn/SignIn.module.css";
import useSignInValidation from "../../hooks/useSignInValidation";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";

const SignIn = () => {
  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });

  const [resetEmail, setResetEmail] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  const { validateSignIn, signInErrors } = useSignInValidation();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignInFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  //handle signing in
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateSignIn(signInFormData)) {
      console.log("Form is not valid");
      return;
    }

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        signInFormData.email,
        signInFormData.password
      );
      const user = userCredentials.user;
      console.log("successfully signed in", user);
      navigate("/movie-list");
      setSignInFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // reset password

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!resetEmail.trim()) {
      setResetMessage("Email is required to reset your password");
      return;
    } else if (!emailRegex.test(resetEmail.trim())) {
      setResetMessage("Please enter a valid email address");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage(
        "Password reset email has been sent. Please check your inbox"
      );
      setResetEmail("");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className={styles.formWrapper}>
      <h2>Sign-in Form</h2>
      <form className={styles.signInForm} noValidate onSubmit={handleSignIn}>
        <fieldset className={styles.formGroup}>
          <legend className={styles.formGroupTitle}>Account Details</legend>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email address"
            className={styles.formInput}
            onChange={handleInputChange}
            value={signInFormData.email}
          />
          {signInErrors && (
            <p className={styles.errorMessage}>{signInErrors.email}</p>
          )}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className={styles.formInput}
            onChange={handleInputChange}
            value={signInFormData.password}
          />
          {signInErrors && (
            <p className={styles.errorMessage}>{signInErrors.password}</p>
          )}
        </fieldset>
        {/* ------------------ */}
        <p>
          Don´t have an account? Create one <Link to={"/sign-up"}>here</Link>
        </p>

        <p>
          Forgot your password? Reset it{" "}
          <Button
            className={styles.forgotPasswordButton}
            type="button"
            onClick={() => setShowForgotPasswordModal(true)}
          >
            here
          </Button>
        </p>
        <Button className={styles.signInButton}>Sign In</Button>
      </form>
      {/* --------------------- */}
      {showForgotPasswordModal && (
        <Modal>
          <form className={styles.resetFormContainer}>
            <p>
              Please enter your email address and press "reset". You will
              receive an email with instruction on how to reset your password.
              Follow the link in the email to set a new password.
            </p>
            <label htmlFor="resetEmail">Email</label>
            <input
              type="email"
              name="resetEmail"
              id="resetEmail"
              placeholder="Enter your email address"
              className={styles.formInput}
              onChange={(e) => setResetEmail(e.target.value)}
              value={resetEmail}
            />
            <div className={styles.resetButtonsContainer}>
              <Button
                className={styles.resetPasswordButton}
                onClick={handlePasswordReset}
              >
                Reset Password
              </Button>
              <Button
                className={styles.closeButton}
                type={"button"}
                onClick={() => {
                  setShowForgotPasswordModal(false);
                  setResetMessage("");
                  setResetEmail("");
                }}
              >
                Close
              </Button>
            </div>
            {resetMessage && (
              <p className={styles.errorMessage}>{resetMessage}</p>
            )}
          </form>
        </Modal>
      )}
    </div>
  );
};

export default SignIn;
