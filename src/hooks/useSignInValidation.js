import { useState } from "react";

const useSignInValidation = () => {
  const [signInErrors, setSignInErrors] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateSignIn = (values) => {
    let newErrors = {};
    if (!values.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(values.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!values.password.trim()) {
      newErrors.password = "Password is required for sign-in";
    } else if (values.password.trim().length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setSignInErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  return { validateSignIn, signInErrors };
};

export default useSignInValidation;
