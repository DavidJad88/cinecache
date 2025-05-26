import { useEffect, useState } from "react";
import styles from "./VerifyEmail.module.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebaseConfig";
import { sendEmailVerification } from "firebase/auth";
import Button from "../../components/Button/Button";
const VerifyEmail = () => {
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkVerificationStatus = async () => {
      await auth.currentUser.reload();
      setEmailVerified(auth.currentUser.emailVerified);

      if (auth.currentUser.emailVerified) {
        navigate("/movie-list");
      }
    };
    const interval = setInterval(checkVerificationStatus, 5000);
    return () => clearInterval(interval);
  }, []);
  console.log(emailVerified);

  const handleResendVerification = async () => {
    setError(null);
    try {
      await sendEmailVerification(auth.currentUser);
      setEmailSent(true);
    } catch (error) {
      setError("Error re-sending verification email. Please try again later");
    }
  };
  return (
    <div className={styles.verifyWrapper}>
      {emailVerified ? (
        <h1>Email verified 🎉 Redirecting you to the genres section ...</h1>
      ) : (
        <div className={styles.verificationContainer}>
          <h2>
            Check your inbox and verify your email. After verifying your email
            you will be automatically redirected to the genres section.
          </h2>
          <p>
            If you haven't received the email, click on the link below to
            request another verification email
          </p>
          <Button
            className={styles.resendButton}
            onClick={handleResendVerification}
          >
            Resend verification email
          </Button>
          {emailSent && (
            <p className={styles.successMessage}>
              A new verification email has been sent. Please check your inbox
            </p>
          )}
          {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
