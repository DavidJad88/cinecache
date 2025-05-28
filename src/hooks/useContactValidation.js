import { useState } from "react";

const useContactValidation = () => {
  const [contactErrors, setContactErrors] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateContactForm = (values) => {
    let newErrors = {};

    if (!values.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!values.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!values.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!values.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    if (!values.message.trim()) {
      newErrors.message = "Message is required";
    }
    setContactErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const validateMessageLength = (value, maxLength) => {
    setContactErrors((prevErrors) => ({
      ...prevErrors,
      message:
        value.trim().length >= maxLength
          ? `Maximum characters allowed is ${maxLength}`
          : "",
    }));
  };

  return {
    contactErrors,
    validateContactForm,
    validateMessageLength,
  };
};

export default useContactValidation;
