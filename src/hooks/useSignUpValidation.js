import { useState } from "react";

export const useSignUpValidation = () => {
  const [errors, setErrors] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{8,}$/;

  const validate = (values) => {
    let newErrors = {};
    if (!values.firstname.trim()) {
      newErrors.firstname = "First name is required";
    }

    if (!values.lastname.trim()) {
      newErrors.lastname = "Last name is required";
    }

    if (!values.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(values.email.trim())) {
      newErrors.email = "Please Enter a valid email address";
    }

    if (!values.userName.trim()) {
      newErrors.userName = "Username is required";
    } else if (values.userName.trim().lenght < 5) {
      newErrors.userName = "Username must be minimum 5 characters";
    }

    if (!values.password.trim()) {
      newErrors.password = "Password is required";
    } else if (values.password.trim().length < 8) {
      newErrors.password = "Password must be minimum 8 characters";
    } else if (!passwordRegex.test(values.password.trim())) {
      newErrors.password =
        "Password must include uppercase and lowercase letters, number and special characters";
    } else if (values.password.trim() !== values.confirmPassword.trim()) {
      newErrors.password = "Passwords do not match";
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!values.confirmPassword.trim()) {
      newErrors.confirmPassword = "Password must be confirmed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return { validate, errors };
};
