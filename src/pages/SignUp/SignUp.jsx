import { useState } from "react";
import styles from "../SignUp/SignUp.module.css";

const SignUp = () => {
  const [signUpFormData, setSignUpFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  return <div>SignUp</div>;
};

export default SignUp;
