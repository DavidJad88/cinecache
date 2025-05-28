import styles from "./Contact.module.css";

import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";

import { getAuthContext } from "../../context/authContext";
import { database } from "../../../firebaseConfig";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import useContactValidation from "../../hooks/useContactValidation";

const Contact = () => {
  const [currentUserData, setCurrentUserData] = useState({});
  const [showContactModal, setShowContactModal] = useState(true);

  const [contactFormData, setContactFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const { user } = getAuthContext();

  const { validateContactForm, validateMessageLength, contactErrors } =
    useContactValidation();

  useEffect(() => {
    if (!user) {
      setContactFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    }

    const fetchCurrentUser = async () => {
      try {
        const userDocRef = doc(database, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setCurrentUserData(userDoc.data());
        } else {
          setCurrentUserData({});
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCurrentUser();
  }, [user]);

  useEffect(() => {
    if (!currentUserData) {
      return;
    } else {
      setContactFormData((prevData) => ({
        ...prevData,
        firstName: currentUserData.firstname || "",
        lastName: currentUserData.lastname || "",
        email: currentUserData.email || "",
      }));
    }
  }, [currentUserData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "message") {
      validateMessageLength(value, 400);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateContactForm(contactFormData)) {
      console.log("Form Is not Valid");
      return;
    }
    try {
      const docRef = await addDoc(collection(database, "contactMessages"), {
        ...contactFormData,
        submittedAt: serverTimestamp(),
      });
      setShowContactModal(true);
      console.log("Document added with the id", docRef.id);
      setContactFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className={styles.contact}>
        <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
          {user ? (
            <section className={styles.userContactSection}>
              <div>
                <h1>Hello {currentUserData.userName}!</h1>
                <p>Need to get in touch?</p>
                <p>
                  We will get back to you at your registered e-mail:{" "}
                  {currentUserData.email}, as soon as we can!
                </p>
              </div>
            </section>
          ) : (
            <section className={styles.unknownContactSection}>
              <fieldset>
                <legend>Please fill out your contact information</legend>
                <div className={styles.contactFormGroup}>
                  <label htmlFor="firstName">First name</label>
                  <input
                    type="text"
                    name="firstName"
                    id="contactFomrFirstName"
                    value={contactFormData.firstName}
                    onChange={handleChange}
                  />
                  <p>{contactErrors.firstName}</p>
                </div>
                <div className={styles.contactFormGroup}>
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    id="contactFormLastName"
                    value={contactFormData.lastName}
                    onChange={handleChange}
                  />
                  <p>{contactErrors.lastName}</p>
                </div>
                <div className={styles.contactFormGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="contactFormEmail"
                    value={contactFormData.email}
                    onChange={handleChange}
                  />
                  <p>{contactErrors.email}</p>
                </div>
              </fieldset>
            </section>
          )}
          <section className={styles.messageSection}>
            <fieldset>
              <legend>Your message:</legend>

              <div className={styles.contactFormGroup}>
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  name="subject"
                  id="contactFormSubject"
                  value={contactFormData.subject}
                  onChange={handleChange}
                />
                <p>{contactErrors.subject}</p>
              </div>
              <div className={styles.contactFormGroup}>
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="contactFormMessage"
                  value={contactFormData.message}
                  cols={15}
                  rows={8}
                  onChange={handleChange}
                  className={styles.contactFormMessage}
                ></textarea>
                <span>
                  {contactFormData.message ? contactFormData.message.length : 0}
                  /400
                </span>
                <p>{contactErrors.message}</p>
              </div>
            </fieldset>
          </section>
          <div className={styles.contactFormToolsContainer}>
            <Button className={styles.contactFormSubmit}>Send</Button>
          </div>
        </form>
      </div>
      {showContactModal && (
        <Modal>
          <div className={styles.contactModalContent}>
            <h2>Your message has been delivered</h2>
            <p>
              Thank you for reaching out! We’ve received your message and will
              get back to you as soon as possible.
            </p>
            <p>
              We appreciate your patience and look forward to assisting you.
            </p>
            <Button
              className={styles.closeModalButton}
              onClick={() => setShowContactModal(false)}
            >
              Close
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Contact;
